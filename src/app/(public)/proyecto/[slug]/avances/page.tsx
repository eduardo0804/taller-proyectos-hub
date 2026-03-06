import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link"; // <--- Esta es la importación que faltaba
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  CalendarDays,
  ChevronRight
} from "lucide-react";

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

  // 2. Cálculo de Progreso General (Lógica de Ingeniería)
  const totalWeeks = 16;
  const completedWeeks = project.advances.filter(a => a.status === "Completado").length;
  const progressPercentage = Math.round((completedWeeks / totalWeeks) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Header de Avances */}
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

        {/* Card de Porcentaje */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border-b-4 border-primary text-center relative overflow-hidden">
          <TrendingUp className="absolute -top-4 -right-4 w-24 h-24 text-primary/5 rotate-12" />
          <div className="text-5xl font-black text-secondary mb-2">{progressPercentage}%</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Completado Total</div>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-6 overflow-hidden">
             <div 
               className="bg-primary h-full transition-all duration-1000" 
               style={{ width: `${progressPercentage}%` }}
             ></div>
          </div>
        </div>
      </div>

      {/* Timeline de Semanas */}
      <div className="space-y-6">
        {project.advances.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No se han registrado reportes aún para este proyecto.</p>
          </div>
        ) : (
          project.advances.map((advance) => (
            <div 
              key={advance.id} 
              className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Indicador de Semana */}
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4 min-w-[100px] border border-gray-100 group-hover:bg-primary/5 transition-colors">
                  <span className="text-[10px] font-black text-gray-400 uppercase">Semana</span>
                  <span className="text-3xl font-black text-secondary">{advance.weekNumber}</span>
                </div>

                {/* Contenido del Reporte */}
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                    {advance.status === "Completado" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : advance.status === "En Progreso" ? (
                      <Clock className="w-5 h-5 text-blue-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    )}
                    <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                      {advance.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {advance.description}
                  </p>
                </div>

                {/* Badge de Estado */}
                <div className="shrink-0 flex items-center justify-center md:justify-end">
                   <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                     advance.status === "Completado" ? "bg-green-100 text-green-700" :
                     advance.status === "En Progreso" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
                   }`}>
                     {advance.status}
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info Metodológica */}
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
            className="flex items-center text-primary font-bold hover:gap-4 transition-all gap-2 group"
          >
            Ver Arquitectura Técnica <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}