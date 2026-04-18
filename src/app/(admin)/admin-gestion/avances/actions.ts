"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function createAdvanceReport(data: {
  projectId: string;
  sprintNumber: string;
  title: string;
  description: string;
  status: string;
  dateRange: string;
  progress: number;
  objectives: string[];
  achievements: string[];
  blockers: string[]; // NUEVO
  nextSteps: string[];
  areasProgress: Prisma.InputJsonValue;
}) {
  try {
    const sprintNum = parseInt(data.sprintNumber);

    await prisma.advanceReport.upsert({
      where: { projectId_sprintNumber: { projectId: data.projectId, sprintNumber: sprintNum } },
      update: {
        title: data.title,
        description: data.description,
        status: data.status,
        dateRange: data.dateRange,
        progress: data.progress,
        objectives: data.objectives,
        achievements: data.achievements,
        blockers: data.blockers, // NUEVO
        nextSteps: data.nextSteps,
        areasProgress: data.areasProgress,
      },
      create: {
        projectId: data.projectId,
        sprintNumber: sprintNum,
        title: data.title,
        description: data.description,
        status: data.status,
        dateRange: data.dateRange,
        progress: data.progress,
        objectives: data.objectives,
        achievements: data.achievements,
        blockers: data.blockers, // NUEVO
        nextSteps: data.nextSteps,
        areasProgress: data.areasProgress,
      }
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error("Error guardando el reporte:", error);
    return { success: false, error: "Fallo al guardar en la base de datos." };
  }
}