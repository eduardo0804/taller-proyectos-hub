import prisma from "@/lib/prisma";
import FlowViewer from "@/components/features/architecture/FlowViewer";
import { Info, Workflow } from "lucide-react";
import { type Node, type Edge } from "@xyflow/react";

export default async function ScrumProcessPage() {
  // Buscamos cualquier diagrama guardado con la capa "proceso-scrum", sin importar bajo qué proyecto esté.
  const diagram = await prisma.diagramState.findFirst({
    where: { viewName: "proceso-scrum" }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-primary text-xs font-black tracking-[0.3em] uppercase mb-4 text-center md:text-left flex items-center justify-center md:justify-start">
            <Workflow className="w-4 h-4 mr-2" /> Marco de Trabajo Ágil
          </h2>
          <h1 className="text-3xl md:text-6xl font-black text-secondary tracking-tight text-center md:text-left">
            Proceso Scrum
          </h1>
        </div>
        <div className="flex items-center p-4 bg-primary/5 rounded-2xl border border-primary/10 max-w-sm">
          <Info className="w-5 h-5 text-primary mr-3 shrink-0" />
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Este diagrama representa el flujo de trabajo global adoptado por los 36 integrantes para el desarrollo de <strong>Legado Fia</strong> y <strong>NANUTECH</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
          <FlowViewer 
            initialNodes={diagram ? (diagram.nodes as unknown as Node[]) : []} 
            initialEdges={diagram ? (diagram.edges as unknown as Edge[]) : []} 
            projectName="HUB Taller de Proyectos - Flujo de Trabajo" 
          />
        </div>

        <aside className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
           <h4 className="font-bold text-secondary mb-3 flex items-center italic">
             <Info className="w-4 h-4 mr-2 text-primary" /> Info de Capa
           </h4>
           <p className="text-xs text-gray-500 leading-relaxed">
             El proceso documentado aquí incluye nuestras ceremonias, integración DevSecOps y aprobación de QA.
           </p>
        </aside>
      </div>
    </div>
  );
}