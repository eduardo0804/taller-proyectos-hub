"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveDiagramState(data: {
  projectId: string;
  viewName: string; // 'frontend', 'backend', o 'infra'
  nodes: any;
  edges: any;
}) {
  try {
    // Usamos upsert: Si ya existe un diagrama para este proyecto y vista, lo actualiza. Si no, lo crea.
    // OJO: Asumiendo que tu schema de Prisma tiene un modelo DiagramState relacionado al Project.
    // Si la estructura varía, adaptaremos esto. Lo importante es guardar el JSON.
    
    // Como el ID único del diagrama suele ser autogenerado, primero buscamos si existe
    const existingDiagram = await prisma.diagramState.findFirst({
      where: {
        projectId: data.projectId,
        viewName: data.viewName
      }
    });

    if (existingDiagram) {
      await prisma.diagramState.update({
        where: { id: existingDiagram.id },
        data: { nodes: data.nodes, edges: data.edges }
      });
    } else {
      await prisma.diagramState.create({
        data: {
          projectId: data.projectId,
          viewName: data.viewName,
          nodes: data.nodes,
          edges: data.edges
        }
      });
    }

    // Actualizar la vista pública
    revalidatePath(`/proyecto/[slug]/arquitectura`, 'page');
    
    return { success: true };
  } catch (error) {
    console.error("Error guardando el diagrama:", error);
    return { success: false, error: "Fallo al guardar la arquitectura." };
  }
}