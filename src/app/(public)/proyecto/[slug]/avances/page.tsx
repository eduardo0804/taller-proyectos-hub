import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  CalendarDays,
  ChevronRight,
  Target,
  Trophy,
  ArrowRight,
  Users,
  Calendar
} from "lucide-react";

// Definimos el tipo para la estructura del JSON que viene de Prisma
type AreaProgress = {
  area: string;
  progreso: number;
  actividades: string[];
  responsables: string[];
};

export default async function AdvancesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Obtener proyecto y sus reportes semanales
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      advances: {
        orderBy: { weekNumber: 'desc' }
      }
    }
  });

  if (!project) notFound();

  // 2. Cálculo de Progreso General
  const totalWeeks = 16;
  const completedWeeks = project.advances.filter(a => a.status === "Completado").length;
  const progressPercentage = Math.round((completedWeeks / totalWeeks) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Header General */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-center">
        <div className="lg:col-span-2 text-center md:text-left">
          <h2 className="text-primary text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Seguimiento de Proyecto
          </h2>
          <h1 className="text-3xl md:text-5xl font-black text-secondary tracking-tight">
            Progreso de {project.name}
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto md:mx-0">
            Visualización detallada de los hitos alcanzados durante las 16 semanas de desarrollo bajo la metodología Scrum.
          </p>
        </div>

        {/* Card de Porcentaje Global */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border-b-4 border-primary text-center relative overflow-hidden">
          <TrendingUp className="absolute -top-4 -right-4 w-24 h-24 text-primary/5 rotate-12" />
          <div className="text-5xl font-black text-secondary mb-2">{progressPercentage}%</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sprints Completados</div>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-6 overflow-hidden">
             <div 
               className="bg-primary h-full transition-all duration-1000" 
               style={{ width: `${progressPercentage}%` }}
             ></div>
          </div>
        </div>
      </div>

      {/* Timeline de Semanas (Súper Detallado) */}
      <div className="space-y-12">
        {project.advances.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No se han registrado reportes aún para este proyecto.</p>
          </div>
        ) : (
          project.advances.map((advance) => {
            const areas = (advance.areasProgress || []) as unknown as AreaProgress[];

            return (
              <div key={advance.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col group">
                
                {/* Cabecera Roja de la Semana */}
                <div className="bg-[#a4101a] text-white p-6 md:p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                  
                  <div className="z-10 relative">
                    <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                      Semana {advance.weekNumber}
                    </h2>
                    {advance.dateRange && (
                      <p className="text-white/80 text-sm flex items-center font-medium mb-3">
                        <Calendar className="w-4 h-4 mr-2" /> {advance.dateRange}
                      </p>
                    )}
                    <h3 className="text-xl font-bold text-white/90">{advance.title}</h3>
                  </div>

                  <div className="z-10 flex items-center gap-4 shrink-0 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                    <div className="flex flex-col items-center">
                       <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-2 ${
                         advance.status === "Completado" ? "bg-white text-green-700" :
                         advance.status === "En Progreso" ? "bg-white text-blue-700" : "bg-white text-amber-600"
                       }`}>
                         {advance.status}
                       </span>
                       <span className="text-2xl font-black">{advance.progress}%</span>
                       <span className="text-[10px] uppercase font-bold text-white/70 tracking-widest">Avance Real</span>
                    </div>
                  </div>
                </div>

                {/* Cuerpo del Reporte */}
                <div className="p-6 md:p-8 space-y-10">
                  
                  {/* Resumen */}
                  {advance.description && (
                    <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-gray-200 pl-4 italic">
                      {advance.description}
                    </p>
                  )}

                  {/* Objetivos y Logros */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {advance.objectives.length > 0 && (
                      <div>
                        <h4 className="flex items-center text-primary font-black mb-4 uppercase text-sm tracking-widest"><Target className="w-5 h-5 mr-2" /> Objetivos de la Semana</h4>
                        <ul className="space-y-3">
                          {advance.objectives.map((obj, i) => (
                            <li key={i} className="flex text-gray-700"><span className="text-primary font-black mr-3">•</span> <span className="leading-snug">{obj}</span></li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {advance.achievements.length > 0 && (
                      <div>
                        <h4 className="flex items-center text-green-600 font-black mb-4 uppercase text-sm tracking-widest"><Trophy className="w-5 h-5 mr-2" /> Logros Alcanzados</h4>
                        <ul className="space-y-3">
                          {advance.achievements.map((ach, i) => (
                            <li key={i} className="flex text-gray-700 bg-green-50 p-2.5 rounded-lg border border-green-100"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0" /> <span className="leading-snug font-medium">{ach}</span></li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Progreso por Áreas (El Grid Dinámico) */}
                  {areas.length > 0 && (
                    <div>
                      <h4 className="font-black text-secondary text-lg mb-6 border-b border-gray-100 pb-2">Progreso por Áreas</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {areas.map((area, i) => (
                          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center font-black mb-3 text-secondary text-lg">
                              <span className="flex items-center text-green-600"><CheckCircle2 className="w-5 h-5 mr-2"/> {area.area}</span>
                              <span className="text-gray-500 text-sm">{area.progreso}%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2.5 rounded-full mb-6">
                              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${area.progreso}%` }}></div>
                            </div>
                            
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Actividades realizadas:</p>
                            <ul className="text-sm text-gray-600 space-y-2 mb-6 min-h-[60px]">
                              {area.actividades.map((act, j) => (
                                <li key={j} className="flex items-start"><span className="text-primary font-bold mr-2">•</span> <span className="leading-tight">{act}</span></li>
                              ))}
                            </ul>
                            
                            <div className="pt-4 border-t border-gray-100">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center"><Users className="w-3 h-3 mr-1"/> Responsables</p>
                              <div className="flex flex-wrap gap-2">
                                {area.responsables.map((resp, j) => (
                                  <span key={j} className="bg-gray-50 border border-gray-200 text-gray-600 font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                                    {resp}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Próximos Pasos */}
                  {advance.nextSteps.length > 0 && (
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                      <h4 className="flex items-center text-blue-700 font-black mb-4 uppercase text-sm tracking-widest"><ArrowRight className="w-5 h-5 mr-2" /> Próximos Pasos</h4>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {advance.nextSteps.map((step, i) => (
                          <li key={i} className="flex text-blue-800 bg-white p-3 rounded-xl border border-blue-100 shadow-sm text-sm font-medium"><ArrowRight className="w-4 h-4 text-blue-400 mr-2 shrink-0" /> {step}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Info Metodológica Footnote */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center md:text-left">
        <div>
          <h4 className="text-xl font-bold text-secondary mb-4 flex items-center justify-center md:justify-start">
            <CalendarDays className="w-6 h-6 mr-3 text-primary" />
            Planificación del Ciclo
          </h4>
          <p className="text-gray-500 text-sm leading-relaxed">
            Cada reporte corresponde a un Sprint de la metodología Scrum. Los estados se actualizan automáticamente cada domingo a las 23:59 tras la revisión del Product Owner.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Link 
            href={`/proyecto/${project.slug}/arquitectura`}
            className="flex items-center text-primary font-bold hover:gap-4 transition-all gap-2 group bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm hover:border-primary hover:shadow-md"
          >
            Ver Arquitectura Técnica <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
}