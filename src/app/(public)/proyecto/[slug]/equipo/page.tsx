import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import TeamFilters from "@/components/features/TeamFilters";
import { Users } from "lucide-react";

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    select: { id: true, name: true }
  });

  if (!project) notFound();

  const allMembers = await prisma.teamMember.findMany({
    where: { OR: [{ isGlobalLeader: true }, { projectId: project.id }] },
    orderBy: { isGlobalLeader: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-16">
        <h2 className="text-primary text-sm font-bold tracking-[0.3em] uppercase mb-4">Capital Humano</h2>
        <h1 className="text-3xl md:text-5xl font-black text-secondary tracking-tight">Equipo {project.name}</h1>
        <div className="w-24 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
      </div>

      <TeamFilters members={allMembers} />

      <div className="mt-20 p-8 bg-secondary rounded-3xl text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Users className="w-32 h-32" />
        </div>
        <h4 className="text-xl font-bold mb-2">¿Falta algún integrante?</h4>
        <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed px-4">
          La lista se actualiza dinámicamente. Los roles pueden ser ajustados por el Líder de Proyecto según los requerimientos del Sprint.
        </p>
      </div>
    </div>
  );
}