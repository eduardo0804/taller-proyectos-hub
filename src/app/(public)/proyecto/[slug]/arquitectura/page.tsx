import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import FlowViewer from "@/components/features/architecture/FlowViewer";
import Link from "next/link";
import { Info, Layout, Server, ShieldCheck } from "lucide-react";

export default async function ArchitecturePage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ tab?: string }> 
}) {
  const { slug } = await params;
  const { tab = "frontend" } = await searchParams; // Pestaña por defecto

  const project = await prisma.project.findUnique({
    where: { slug },
    include: { diagrams: true }
  });

  if (!project) notFound();

  // Hito 5: Buscar el diagrama específico de la pestaña en Supabase
  const activeDiagram = project.diagrams.find(d => d.viewName.toLowerCase() === tab.toLowerCase());

  // Datos de Fallback (los que te gustaron) por si la DB está vacía
  const defaultNodes = [
    { id: 'n1', type: 'techNode', position: { x: 250, y: 0 }, data: { label: 'Next.js Frontend' } },
    { id: 'n2', type: 'cloudNode', position: { x: 250, y: 150 }, data: { label: project.cloudProvider === 'Azure' ? 'Azure App Service' : 'AWS EC2', provider: project.cloudProvider } },
    { id: 'n3', type: 'cloudNode', position: { x: 250, y: 300 }, data: { label: project.cloudProvider === 'Azure' ? 'Azure SQL' : 'Amazon RDS', provider: project.cloudProvider } },
  ];

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: <Layout className="w-4 h-4" /> },
    { id: 'backend', label: 'Backend', icon: <Server className="w-4 h-4" /> },
    { id: 'infra', label: 'Infraestructura', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Tu Header con estilo premium */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-primary text-xs font-black tracking-[0.3em] uppercase mb-4 text-center md:text-left">
            Fase 3: Visualización Técnica
          </h2>
          <h1 className="text-3xl md:text-6xl font-black text-secondary tracking-tight text-center md:text-left">
            Planos de Arquitectura
          </h1>
        </div>
        <div className="flex items-center p-4 bg-primary/5 rounded-2xl border border-primary/10 max-w-sm">
          <Info className="w-5 h-5 text-primary mr-3 shrink-0" />
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Explora la infraestructura de <strong>{project.name}</strong> en {project.cloudProvider}. Selecciona una capa para ver el detalle.
          </p>
        </div>
      </div>

      {/* Hito 4: Tabs con navegación por Search Params */}
      <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`?tab=${cat.id}`}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
              tab === cat.id 
                ? 'bg-primary text-white shadow-xl scale-105' 
                : 'bg-white text-secondary border border-gray-100 hover:border-primary/20'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
          <FlowViewer 
            initialNodes={activeDiagram ? (activeDiagram.nodes as any) : defaultNodes} 
            initialEdges={activeDiagram ? (activeDiagram.edges as any) : []} 
            projectName={`${project.name} - ${tab.toUpperCase()}`} 
          />
        </div>

        <aside className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
           <h4 className="font-bold text-secondary mb-3 flex items-center italic">
             <Info className="w-4 h-4 mr-2 text-primary" /> Info de Capa
           </h4>
           <p className="text-xs text-gray-500 leading-relaxed">
             Estás visualizando la capa de <strong>{tab}</strong>. Los nodos animados indican el flujo de datos 
             en tiempo real a través de la red de {project.cloudProvider}.
           </p>
        </aside>
      </div>
    </div>
  );
}