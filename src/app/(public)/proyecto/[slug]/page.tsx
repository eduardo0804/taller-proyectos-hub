import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { 
  Cloud, Cpu, Users, CheckCircle2, Server, LayoutDashboard, 
  ArrowLeft, Target, AlertTriangle, Zap, MapPin, Smartphone, 
  FileText, PieChart, Code, Shield, ListTodo, MessageSquare, RefreshCcw, Calendar
} from "lucide-react";
import Link from "next/link";

// 1. DICCIONARIO DE CONTENIDO DINÁMICO
const getProjectData = (slug: string) => {
  const data = {
    "nanutech": {
      problema: "La gestión actual se realiza mediante múltiples archivos Excel fragmentados (control de camiones, RRHH, monitoreo GPS). Esta desconexión genera inconsistencias, pérdida de tiempo operativo (más de 10 min por registro) y limita la toma de decisiones estratégicas.",
      solucion: "Un sistema integral Serverless que centraliza la flota, automatiza el registro de jornadas a menos de 10 segundos e integra datos GPS de múltiples proveedores para calcular la rentabilidad y productividad en tiempo real.",
      objetivos: [
        "Centralizar la gestión operativa de 12 camiones y sus conductores.",
        "Automatizar el registro de jornadas laborales desde una App móvil.",
        "Integrar datos GPS (gpscontrol.pe y globalgpsperu) automáticamente.",
        "Proveer un dashboard ejecutivo con métricas de margen operativo."
      ],
      modulos: [
        { title: "App Chofer (Registro)", desc: "Selección de contrato y botones de Inicio/Fin de turno con cálculo de duración en < 10s.", icon: Smartphone },
        { title: "Gestión de Contratos", desc: "CRUD de contratos comerciales con cálculo automático de tarifas por viaje, hora o tonelada.", icon: FileText },
        { title: "Integración GPS", desc: "Importación y normalización de datos de múltiples proveedores con detección de eventos.", icon: MapPin },
        { title: "Dashboard Ejecutivo", desc: "KPIs de productividad por camión, conductor y cálculo de rentabilidad neta.", icon: PieChart }
      ]
    },
    "legado-fia": {
      problema: "La gestión académica de la facultad sufre de procesos manuales, documentos desactualizados y múltiples fuentes de información aisladas, lo que provoca duplicidad de esfuerzos, choque de horarios y errores humanos.",
      solucion: "Un ecosistema digital nativo en la nube que actúa como una única fuente de verdad, automatizando la generación de documentos y sincronizando en tiempo real a directores, coordinadores y docentes.",
      objetivos: [
        "Automatizar la generación y actualización documental.",
        "Sincronizar actores y procesos según el ciclo académico.",
        "Centralizar operaciones desde una única fuente de verdad.",
        "Eliminar duplicidad y errores en la asignación de carga lectiva."
      ],
      modulos: [
        { title: "Core Engine", desc: "Motor de procesamiento distribuido de datos académicos en tiempo real.", icon: Cpu },
        { title: "Gestor de Horarios", desc: "Automatización y validación inteligente de carga lectiva sin cruces.", icon: Calendar },
        { title: "Sincronización de Actores", desc: "Integración de perfiles: docentes, aulas y cursos del ciclo.", icon: Users },
        { title: "API Gateway Segura", desc: "Seguridad, control de accesos y enrutamiento perimetral.", icon: Shield }
      ]
    }
  };
  return data[slug as keyof typeof data] || data["legado-fia"]; // Fallback por seguridad
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { members: true, _count: { select: { members: true, advances: true } } }
  });

  if (!project) notFound();

  // Variables de TEMA
  const isAzure = project.cloudProvider === "Azure";
  const theme = {
    color: isAzure ? "text-blue-600" : "text-orange-500",
    bg: isAzure ? "bg-blue-50" : "bg-orange-50",
    border: isAzure ? "border-blue-200" : "border-orange-200",
    gradient: isAzure ? "from-blue-600 to-blue-800" : "from-orange-500 to-orange-700",
    lightGradient: isAzure ? "from-blue-50 to-white" : "from-orange-50 to-white",
  };

  const content = getProjectData(project.slug);

  // Proceso Genérico de la Metodología (Aplica a ambos proyectos)
  const scrumProcess = [
    { title: "Sprint Planning", desc: "Definición del Sprint Backlog y estimación de historias de usuario.", icon: ListTodo },
    { title: "Daily Standup", desc: "Sincronización diaria del equipo para identificar bloqueos.", icon: MessageSquare },
    { title: "Desarrollo Iterativo", desc: "Construcción de código, pruebas QA y control de calidad continuo.", icon: Code },
    { title: "Sprint Review", desc: "Demostración de los incrementos de software al Product Owner.", icon: Target },
    { title: "Retrospectiva", desc: "Análisis del ciclo para aplicar mejora continua en el equipo.", icon: RefreshCcw }
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary selection:text-white pb-20">
      
      {/* 1. HERO SECTION */}
      <header className={`bg-gradient-to-br ${theme.lightGradient} border-b border-gray-200 pt-12 pb-20 relative overflow-hidden`}>
        <div className={`absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl ${isAzure ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/#proyectos" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-8 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Catálogo de Proyectos
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${theme.bg} ${theme.color} border ${theme.border} mb-6 shadow-sm`}>
                {isAzure ? <Cloud className="w-4 h-4 mr-2" /> : <Cpu className="w-4 h-4 mr-2" />}
                Cloud Provider: {project.cloudProvider}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-secondary tracking-tight mb-6">{project.name}</h1>
              <p className="text-gray-600 text-xl leading-relaxed font-medium">{project.description}</p>
            </div>
            
            {/* Tarjetas de Resumen */}
            <div className="flex gap-4 shrink-0">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 text-center min-w-[140px]">
                <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-3 ${theme.bg}`}>
                  <Users className={`w-6 h-6 ${theme.color}`} />
                </div>
                <div className="text-3xl font-black text-secondary">{project._count.members}</div>
                <div className="text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">Talentos</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 text-center min-w-[140px]">
                <div className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-3 bg-green-50">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-black text-secondary">{project._count.advances}</div>
                <div className="text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">Reportes</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* 2. CONTEXTO: PROBLEMA VS SOLUCIÓN */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50/50 border border-red-100 p-8 rounded-3xl">
            <h3 className="flex items-center text-red-800 font-black text-xl mb-4">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-500" /> El Desafío Actual
            </h3>
            <p className="text-red-900/80 leading-relaxed">{content.problema}</p>
          </div>
          <div className="bg-green-50/50 border border-green-100 p-8 rounded-3xl">
            <h3 className="flex items-center text-green-800 font-black text-xl mb-4">
              <Zap className="w-6 h-6 mr-3 text-green-500" /> Nuestra Solución
            </h3>
            <p className="text-green-900/80 leading-relaxed">{content.solucion}</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* COLUMNA PRINCIPAL (Izquierda) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* 3. OBJETIVOS */}
            <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-secondary mb-8 flex items-center">
                <Target className={`w-6 h-6 mr-3 ${theme.color}`} /> Objetivos del Proyecto
              </h2>
              <div className="grid gap-4">
                {content.objetivos.map((obj, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl border border-slate-100">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${theme.bg} ${theme.color}`}>
                      {i + 1}
                    </div>
                    <p className="font-medium text-slate-700 leading-snug mt-1">{obj}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. MÓDULOS MVP */}
            <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-secondary mb-8 flex items-center">
                <LayoutDashboard className={`w-6 h-6 mr-3 ${theme.color}`} /> Módulos Core (MVP)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.modulos.map((mod, i) => {
                  const Icon = mod.icon;
                  return (
                    <div key={i} className="p-6 border border-gray-100 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all group">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${theme.bg} group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 ${theme.color}`} />
                      </div>
                      <h4 className="font-black text-secondary text-lg mb-2">{mod.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{mod.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 5. ARQUITECTURA CLOUD */}
            <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-secondary mb-8 flex items-center">
                <Server className={`w-6 h-6 mr-3 ${theme.color}`} /> Arquitectura & Stack
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {isAzure ? (
                  <>
                    <TechCard title="App Service" cat="Compute" color="blue" />
                    <TechCard title="SQL Database" cat="Storage" color="blue" />
                    <TechCard title="Functions" cat="Serverless" color="blue" />
                    <TechCard title="Entra ID" cat="Identity" color="blue" />
                  </>
                ) : (
                  <>
                    <TechCard title="API Gateway" cat="API REST" color="orange" />
                    <TechCard title="AWS Lambda" cat="Compute" color="orange" />
                    <TechCard title="Amazon RDS" cat="Database" color="orange" />
                    <TechCard title="Cognito" cat="Auth" color="orange" />
                  </>
                )}
              </div>

              <div className="flex justify-center mt-8">
                 <Link 
                   href={`/proyecto/${project.slug}/arquitectura`}
                   className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-white shadow-lg shadow-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-r ${theme.gradient}`}
                 >
                   <Code className="w-5 h-5 mr-3" />
                   Ver Diagramas de Arquitectura
                 </Link>
              </div>
            </section>

          </div>

          {/* COLUMNA LATERAL (Derecha) - METODOLOGÍA */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-3xl p-8 sticky top-8 shadow-2xl">
              <h2 className="text-xl font-black text-white mb-8 flex items-center">
                <RefreshCcw className="w-5 h-5 mr-3 text-purple-400" /> Metodología de Trabajo
              </h2>
              
              <div className="space-y-8">
                {scrumProcess.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={i} className="relative">
                      {/* Línea conectora */}
                      {i < scrumProcess.length - 1 && (
                        <div className="absolute left-[15px] top-10 w-0.5 h-[calc(100%+10px)] bg-slate-800"></div>
                      )}
                      
                      <div className="flex gap-5">
                        {/* Icono del paso */}
                        <div className="relative z-10 shrink-0">
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                            <StepIcon className="w-4 h-4 text-slate-300" />
                          </div>
                        </div>
                        
                        <div className="pb-2">
                          <h4 className="font-bold mb-1 text-white text-sm">
                            {step.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800">
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  El desarrollo se organizará en <strong>16 Sprints</strong> semanales, registrando cada avance, bloqueo y logro en nuestra bitácora oficial.
                </p>
                <Link 
                  href={`/proyecto/${project.slug}/avances`}
                  className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-purple-400 transition-colors group bg-slate-800 px-5 py-3 rounded-xl hover:bg-slate-700"
                >
                  Ver Bitácora de Avances
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponente para las tarjetas tecnológicas
function TechCard({ title, cat, color }: { title: string, cat: string, color: 'blue' | 'orange' }) {
  const base = color === 'blue' 
    ? 'bg-blue-50/50 border-blue-100 text-blue-700 hover:border-blue-300' 
    : 'bg-orange-50/50 border-orange-100 text-orange-700 hover:border-orange-300';
    
  return (
    <div className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all hover:shadow-md ${base}`}>
      <div className="font-black text-sm md:text-base mb-1 text-center leading-tight">{title}</div>
      <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest opacity-70">{cat}</span>
    </div>
  );
}