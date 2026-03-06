import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Hacemos una consulta ultra ligera solo para que Supabase registre actividad
    await prisma.project.findFirst({ select: { id: true } });
    
    return NextResponse.json({ 
      status: 'ok', 
      message: 'Ping exitoso. Base de datos despierta 🚀',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error en el Cron Job:", error);
    return NextResponse.json({ error: 'Fallo al despertar la DB' }, { status: 500 });
  }
}