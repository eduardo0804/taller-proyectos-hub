import { Metadata } from "next";
import prisma from "@/lib/prisma";

// 1. Next.js ejecuta esto ANTES de renderizar la página para inyectar las etiquetas <head>
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Buscamos el proyecto en la base de datos
  const project = await prisma.project.findUnique({
    where: { slug }
  });

  if (!project) {
    return { title: "Proyecto no encontrado | USMP" };
  }

  return {
    title: `${project.name} | Taller de Proyectos USMP`,
    description: project.description || `Ecosistema digital y arquitectura cloud del proyecto ${project.name}.`,
    openGraph: {
      title: `${project.name} | Innovación Académica USMP`,
      description: project.description || `Explora la arquitectura técnica y los avances de este proyecto.`,
      siteName: "Taller de Proyectos - Hub",
      // Si tienes una imagen general del proyecto, iría aquí. Por ahora usa la de Next.js por defecto.
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | USMP`,
      description: project.description || "Arquitectura de Software USMP",
    }
  };
}

// 2. El Layout envuelve a las páginas (Avances, Equipo, Arquitectura, Dashboard)
export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}