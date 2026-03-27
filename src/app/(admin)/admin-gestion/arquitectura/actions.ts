"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function saveDiagramState(data: {
  projectId: string;
  viewName: string; // 'frontend', 'backend', 'infra', 'as-is', o 'to-be'
  nodes: unknown[]; 
  edges: unknown[]; 
}) {
  try {
    const existingDiagram = await prisma.diagramState.findFirst({
      where: {
        projectId: data.projectId,
        viewName: data.viewName
      }
    });

    if (existingDiagram) {
      await prisma.diagramState.update({
        where: { id: existingDiagram.id },
        data: { 
          nodes: data.nodes as Prisma.InputJsonValue, 
          edges: data.edges as Prisma.InputJsonValue 
        }
      });
    } else {
      await prisma.diagramState.create({
        data: {
          projectId: data.projectId,
          viewName: data.viewName,
          nodes: data.nodes as Prisma.InputJsonValue,
          edges: data.edges as Prisma.InputJsonValue
        }
      });
    }

    revalidatePath(`/proyecto/[slug]/arquitectura`, 'page');
    
    return { success: true };
  } catch (error) {
    console.error("Error guardando el diagrama:", error);
    return { success: false, error: "Fallo al guardar la arquitectura." };
  }
}