"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createAdvanceReport } from "./actions";
import { Save, Loader2, CheckCircle2, Plus, Trash2, Calendar, Target, Trophy, ArrowRight, Layers, TriangleAlert } from "lucide-react";

const formSchema = z.object({
  projectId: z.string().min(1, "Obligatorio"),
  sprintNumber: z.string().min(1, "Obligatorio"),
  dateRange: z.string().min(1, "Ej. Semanas 5, 6 y 7"),
  title: z.string().min(5, "Título muy corto"),
  description: z.string().min(10, "Descripción muy corta"),
  status: z.string().min(1, "Obligatorio"),
  progress: z.coerce.number().min(0).max(100),
  
  objectives: z.array(z.object({ value: z.string().min(1, "") })),
  achievements: z.array(z.object({ value: z.string().min(1, "") })),
  blockers: z.array(z.object({ value: z.string().min(1, "") })), // NUEVO ARRAY ZOD
  nextSteps: z.array(z.object({ value: z.string().min(1, "") })),
  
  areasProgress: z.array(z.object({
    area: z.string().min(1, "Obligatorio"),
    progress: z.coerce.number().min(0).max(100),
    actividades: z.string().min(1, "Lista las actividades"),
    responsables: z.string().min(1, "Lista los responsables"),
  }))
});

type FormValues = z.infer<typeof formSchema>;

export default function AdvanceForm({ projects }: { projects: { id: string, name: string }[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      objectives: [{ value: "" }],
      achievements: [{ value: "" }],
      blockers: [], // Inicialmente vacío
      nextSteps: [{ value: "" }],
      areasProgress: []
    }
  });

  const { fields: objFields, append: appendObj, remove: removeObj } = useFieldArray({ control, name: "objectives" });
  const { fields: achFields, append: appendAch, remove: removeAch } = useFieldArray({ control, name: "achievements" });
  const { fields: blockerFields, append: appendBlocker, remove: removeBlocker } = useFieldArray({ control, name: "blockers" });
  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({ control, name: "nextSteps" });
  const { fields: areaFields, append: appendArea, remove: removeArea } = useFieldArray({ control, name: "areasProgress" });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    const formattedData = {
      projectId: data.projectId,
      sprintNumber: data.sprintNumber,
      title: data.title,
      description: data.description,
      status: data.status,
      dateRange: data.dateRange,
      progress: data.progress,
      objectives: data.objectives.map(o => o.value),
      achievements: data.achievements.map(a => a.value),
      blockers: data.blockers.map(b => b.value), // EXTRAEMOS STRINGS
      nextSteps: data.nextSteps.map(n => n.value),
      areasProgress: data.areasProgress.map(area => ({
        area: area.area,
        progreso: area.progress,
        actividades: area.actividades.split('\n').filter(a => a.trim() !== ''),
        responsables: area.responsables.split(',').map(r => r.trim()).filter(r => r !== '')
      }))
    };

    const result = await createAdvanceReport(formattedData);
    
    if (result.success) {
      setSuccess(true);
      reset(); 
      setTimeout(() => setSuccess(false), 5000);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3 border border-green-200 animate-in fade-in zoom-in">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <p className="font-bold text-sm">¡Reporte de Sprint Publicado!</p>
            <p className="text-xs">La bitácora se actualizó en la web pública.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        
        <section className="space-y-6">
          <h3 className="text-lg font-black text-slate-800 border-b pb-2">1. Información General</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Proyecto</label>
              <select {...register("projectId")} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">Selecciona...</option>
                {projects.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Número de Sprint</label>
              <select {...register("sprintNumber")} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">Selecciona...</option>
                <option value="0">Sprint 0</option>
                <option value="1">Sprint 1</option>
                <option value="2">Sprint 2</option>
                <option value="3">Sprint 3</option>
                <option value="4">Sprint 4</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Calendar className="w-4 h-4"/> Rango de Fechas / Semanas</label>
              <input type="text" placeholder="Ej. Semanas 5, 6 y 7" {...register("dateRange")} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Progreso Total (%)</label>
              <input type="number" placeholder="Ej. 100" {...register("progress")} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Título del Reporte</label>
            <input type="text" placeholder="Ej. Módulo de Accesos y Jornada" {...register("title")} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Estado</label>
            <select {...register("status")} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="Completado">🟢 Completado</option>
              <option value="En Progreso">🔵 En Progreso</option>
              <option value="Pendiente">🟠 Pendiente / Bloqueado</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Descripción Detallada</label>
            <textarea rows={4} placeholder="Resumen general profundo del trabajo realizado..." {...register("description")} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
          </div>
        </section>

        <section className="space-y-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-lg font-black text-slate-800">2. Detalles del Desarrollo</h3>
          
          {/* OBJETIVOS */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Target className="w-4 h-4 text-blue-600"/> Objetivos / HUs Tratadas</label>
              <button type="button" onClick={() => appendObj({ value: "" })} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold hover:bg-blue-200 flex items-center gap-1"><Plus className="w-3 h-3"/> Añadir</button>
            </div>
            <div className="space-y-2">
              {objFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input {...register(`objectives.${index}.value`)} className="w-full p-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-500" placeholder={`Objetivo ${index + 1}`} />
                  <button type="button" onClick={() => removeObj(index)} className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* LOGROS */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Trophy className="w-4 h-4 text-green-600"/> Logros y Entregables Alcanzados</label>
              <button type="button" onClick={() => appendAch({ value: "" })} className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold hover:bg-green-200 flex items-center gap-1"><Plus className="w-3 h-3"/> Añadir</button>
            </div>
            <div className="space-y-2">
              {achFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input {...register(`achievements.${index}.value`)} className="w-full p-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-green-500" placeholder={`Logro ${index + 1}`} />
                  <button type="button" onClick={() => removeAch(index)} className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCKERS E IMPEDIMENTOS (NUEVO - AMARILLO) */}
          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-amber-800 flex items-center gap-2"><TriangleAlert className="w-4 h-4 text-amber-600"/> Blockers e Impedimentos</label>
              <button type="button" onClick={() => appendBlocker({ value: "" })} className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold hover:bg-amber-200 flex items-center gap-1"><Plus className="w-3 h-3"/> Añadir</button>
            </div>
            <div className="space-y-2">
              {blockerFields.length === 0 && <p className="text-xs text-amber-600 italic">No hubo impedimentos registrados.</p>}
              {blockerFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input {...register(`blockers.${index}.value`)} className="w-full p-2.5 rounded-lg border border-amber-300 text-sm outline-none focus:border-amber-500 bg-white" placeholder={`Impedimento ${index + 1}`} />
                  <button type="button" onClick={() => removeBlocker(index)} className="p-2.5 bg-white border border-red-100 text-red-500 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* PRÓXIMOS PASOS */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-slate-600"/> Próximos Pasos</label>
              <button type="button" onClick={() => appendStep({ value: "" })} className="text-xs bg-slate-200 text-slate-700 px-3 py-1 rounded-full font-bold hover:bg-slate-300 flex items-center gap-1"><Plus className="w-3 h-3"/> Añadir</button>
            </div>
            <div className="space-y-2">
              {stepFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input {...register(`nextSteps.${index}.value`)} className="w-full p-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-slate-500" placeholder={`Paso ${index + 1}`} />
                  <button type="button" onClick={() => removeStep(index)} className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 3: PROGRESO POR ÁREAS (JSON Dinámico) --- */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><Layers className="w-5 h-5 text-purple-600"/> 3. Avance por Equipos</h3>
            <button 
              type="button" 
              onClick={() => appendArea({ area: "", progress: 100, actividades: "", responsables: "" })} 
              className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full font-bold text-xs hover:bg-purple-200 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4"/> Nuevo Equipo
            </button>
          </div>

          {areaFields.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-6 border-2 border-dashed rounded-xl">No hay áreas asignadas. Haz clic en Nuevo Equipo.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areaFields.map((field, index) => (
              <div key={field.id} className="bg-white border-2 border-slate-200 rounded-2xl p-5 relative group hover:border-purple-300 transition-colors shadow-sm">
                <button type="button" onClick={() => removeArea(index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                
                <div className="space-y-4 pr-6">
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Nombre del Área</label>
                      <input {...register(`areasProgress.${index}.area`)} placeholder="Ej. Calidad y UX" className="w-full p-2 border-b border-slate-300 focus:border-purple-500 outline-none font-bold text-slate-800 bg-transparent" />
                    </div>
                    <div className="w-24 space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">% Avance</label>
                      <input type="number" {...register(`areasProgress.${index}.progress`)} className="w-full p-2 border-b border-slate-300 focus:border-purple-500 outline-none text-center font-bold text-purple-600 bg-transparent" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Actividades (Una por línea)</label>
                    <textarea rows={3} {...register(`areasProgress.${index}.actividades`)} placeholder="- Definición de testing&#10;- Wireframes" className="w-full p-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-purple-500 resize-none bg-slate-50" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Responsables (Separados por coma)</label>
                    <input type="text" {...register(`areasProgress.${index}.responsables`)} placeholder="QA, Ingeniero UX" className="w-full p-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-slate-900 text-white font-black text-lg py-5 rounded-2xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-3 disabled:bg-slate-400 shadow-xl"
        >
          {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
          {isSubmitting ? "Procesando Reporte..." : "Publicar Reporte del Sprint"}
        </button>
      </form>
    </div>
  );
}