import prisma from "@/lib/prisma";
import FlowEditor from "@/components/features/architecture/FlowEditor";
import Link from "next/link";
import { ArrowLeft, Settings2 } from "lucide-react";

export default async function ArchitectureEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ projectId?: string; viewName?: string }>;
}) {
  const resolvedParams = await searchParams;
  const projectId = resolvedParams.projectId;
  const viewName = resolvedParams.viewName || "frontend";

  // 1. Obtener todos los proyectos para llenar el selector
  const projects = await prisma.project.findMany({
    select: { id: true, name: true, cloudProvider: true }
  });

  // 2. Si el usuario ya seleccionó un proyecto, buscar su diagrama existente
  let activeProject = null;
  let existingDiagram = null;

  if (projectId) {
    activeProject = projects.find(p => p.id === projectId);
    if (activeProject) {
      existingDiagram = await prisma.diagramState.findFirst({
        where: {
          projectId: projectId,
          viewName: viewName
        }
      });
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Link href="/admin-gestion" className="inline-flex items-center text-sm text-slate-500 hover:text-purple-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Panel
      </Link>

      <div>
        <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <Settings2 className="w-8 h-8 text-purple-600" />
          Gestor de Arquitectura
        </h2>
        <p className="text-slate-500 mt-2">
          Diseña los diagramas de nube arrastrando componentes. Los cambios se reflejarán en vivo en la plataforma pública.
        </p>
      </div>

      {/* Barra de Controles (Selectores usando un formulario nativo GET) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <form method="GET" className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full space-y-2">
            <label className="text-sm font-bold text-slate-700">Proyecto</label>
            <select 
              name="projectId" 
              defaultValue={projectId || ""} 
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            >
              <option value="" disabled>Selecciona el proyecto...</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.cloudProvider})</option>
              ))}
            </select>
          </div>

          <div className="w-full space-y-2">
            <label className="text-sm font-bold text-slate-700">Capa a Editar</label>
            <select 
              name="viewName" 
              defaultValue={viewName} 
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="infra">DevSecOps / Infraestructura</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full md:w-auto bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-purple-600 transition-colors h-[50px] shrink-0"
          >
            Cargar Lienzo
          </button>
        </form>
      </div>

      {/* Área del Editor de React Flow */}
      {activeProject ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <FlowEditor 
            projectId={activeProject.id}
            projectName={activeProject.name}
            cloudProvider={activeProject.cloudProvider}
            viewName={viewName}
            // Si hay un diagrama guardado, lo inyectamos. Si no, le pasamos arrays vacíos.
            initialNodes={existingDiagram ? (existingDiagram.nodes as any) : []}
            initialEdges={existingDiagram ? (existingDiagram.edges as any) : []}
          />
        </div>
      ) : (
        <div className="h-[400px] w-full bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-10 text-center">
          <Settings2 className="w-16 h-16 text-slate-300 mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-slate-500">Lienzo en Espera</h3>
          <p className="text-slate-400 max-w-sm mt-2">Selecciona un proyecto y una capa en el menú superior para comenzar a diseñar.</p>
        </div>
      )}
    </div>
  );
}