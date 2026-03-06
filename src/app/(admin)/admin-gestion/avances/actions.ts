"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Actualizamos la interfaz para recibir todos los datos complejos
export async function createAdvanceReport(data: {
  projectId: string;
  weekNumber: string;
  title: string;
  description: string;
  status: string;
  dateRange: string;
  progress: number;
  objectives: string[];
  achievements: string[];
  nextSteps: string[];
  areasProgress: any[]; // Recibe el JSON de áreas
}) {
  try {
    const weekNum = parseInt(data.weekNumber);

    // Utilizamos UPSERT: Actualiza si ya existe la semana, Crea si es nueva
    await prisma.advanceReport.upsert({
      where: {
        projectId_weekNumber: {
          projectId: data.projectId,
          weekNumber: weekNum,
        },
      },
      update: {
        title: data.title,
        description: data.description,
        status: data.status,
        dateRange: data.dateRange,
        progress: data.progress,
        objectives: data.objectives,
        achievements: data.achievements,
        nextSteps: data.nextSteps,
        areasProgress: data.areasProgress,
      },
      create: {
        projectId: data.projectId,
        weekNumber: weekNum,
        title: data.title,
        description: data.description,
        status: data.status,
        dateRange: data.dateRange,
        progress: data.progress,
        objectives: data.objectives,
        achievements: data.achievements,
        nextSteps: data.nextSteps,
        areasProgress: data.areasProgress,
      }
    });

    // MAGIA NEXT.JS: Invalida la caché para que el frontend público se actualice al instante
    revalidatePath('/', 'layout');

    return { success: true };
  } catch (error) {
    console.error("Error guardando el reporte:", error);
    return { success: false, error: "Fallo al guardar en la base de datos." };
  }
}