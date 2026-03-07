import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando carga masiva de 36 integrantes y actualizando info de proyectos...')

  // 1. Asegurar la existencia de los Proyectos
  const legado = await prisma.project.upsert({
    where: { slug: 'legado-fia' },
    update: {
      description: 'Sistema inteligente para la gestión y automatización de horarios académicos EPICS.'
    },
    create: {
      name: 'Legado Fia',
      slug: 'legado-fia',
      description: 'Sistema inteligente para la gestión y automatización de horarios académicos EPICS.',
      cloudProvider: 'Azure'
    }
  })

  const nanutech = await prisma.project.upsert({
    where: { slug: 'nanutech' },
    update: {
      description: 'Sistema integral de gestión de flota de camiones, contratos y monitoreo GPS.'
    },
    create: {
      name: 'NANUTECH',
      slug: 'nanutech',
      description: 'Sistema integral de gestión de flota de camiones, contratos y monitoreo GPS.',
      cloudProvider: 'AWS'
    }
  })

  // 2. Definición de todo el equipo (36 integrantes)
  const allMembers = [
    // LIDERAZGO GLOBAL (isGlobalLeader: true)
    { fullName: 'CHAMOCHUMBI SALINAS ALDO ANDRE', email: 'ALDO_CHAMOCHUMBI@USMP.PE', role: 'Líder Scrum', isGlobal: true },
    { fullName: 'CHOQUE VILLALTA WALTER SMITH', email: 'WALTER_CHOQUE1@USMP.PE', role: 'Líder UX', isGlobal: true },
    { fullName: 'CHUQUICAJA PALACIOS VERONICA SOFIA', email: 'VERONICA_CHUQUICAJA@USMP.PE', role: 'Líder QA', isGlobal: true },
    { fullName: 'PALOMINO ZARATE PEDRO ARMANDO EDUARDO', email: 'PEDRO_PALOMINO3@USMP.PE', role: 'Líder Ingeniero de nube', isGlobal: true },
    { fullName: 'RODRIGUEZ DE LA ROCA JULIO DANIEL', email: 'JULIO_RODRIGUEZ8@USMP.PE', role: 'Arquitecto', isGlobal: true },
    { fullName: 'VALDIVIA PILLACA BRYAN ARNOLD', email: 'BRYAN_VALDIVIA1@USMP.PE', role: 'Líde DevSecOps', isGlobal: true },
    { fullName: 'LAZARO BRAVO JESUS EDUARDO', email: 'JESUS_LAZARO@USMP.PE', role: 'Líde Gestor de Contenido', isGlobal: true },

    // EQUIPO ASIGNADO A PROYECTOS
    { fullName: 'ANGULO URIBE SEBASTIAN CESAR', email: 'SEBASTIAN_ANGULO@USMP.PE', role: 'Team DevSecOps', projectId: legado.id },
    { fullName: 'BARRIOS CACERES RODRIGO ANDRES', email: 'RODRIGO_BARRIOS@USMP.PE', role: 'Team QA', projectId: nanutech.id },
    { fullName: 'CAMPOS HUAMAN ANDREA ANGELINA', email: 'ANDREA_CAMPOS2@USMP.PE', role: 'FullStack - Back', projectId: legado.id },
    { fullName: 'ESCALANTE MAGUIÑA JAIR JOSUE', email: 'JAIR_ESCALANTE@USMP.PE', role: 'UX', projectId: legado.id },
    { fullName: 'ESTRADA BARRIENTOS JEAN CARLOS', email: 'JEAN_ESTRADA@USMP.PE', role: 'FullStack - Back', projectId: nanutech.id },
    { fullName: 'FEBRES DELGADO OSCAR ANDRE', email: 'OSCAR_FEBRES@USMP.PE', role: 'Team UX', projectId: nanutech.id },
    { fullName: 'HERNANDEZ RAMIREZ LUIS ALBERTO', email: 'LUIS_HERNANDEZ7@USMP.PE', role: 'Team QA', projectId: legado.id },
    { fullName: 'HUAMAN CARLOS ABRAHAM JEREMIAS', email: 'ABRAHAM_HUAMAN1@USMP.PE', role: 'FullStack - Front', projectId: nanutech.id },
    { fullName: 'JAUREGUI CACERES JOSMER', email: 'JOSMER_JAUREGUI@USMP.PE', role: 'FullStack - Back', projectId: legado.id },
    { fullName: 'LEZMA CHUCHÓN SAMANTHA ALEJANDRA', email: 'SAMANTHA_LEZMA@USMP.PE', role: 'FullStack - Back', projectId: nanutech.id },
    { fullName: 'LOPEZ BAZAN RENZO FABIAN', email: 'RENZO_LOPEZ4@USMP.PE', role: 'FullStack - Front', projectId: legado.id },
    { fullName: 'MENESES MORENO HUGO FRANCISCO', email: '', role: 'Team DevSecOps', projectId: nanutech.id },
    { fullName: 'MORALES FLORES OSKAR ANDRE', email: 'OSKAR_MORALES@USMP.PE', role: 'Team QA', projectId: legado.id },
    { fullName: 'NUÑEZ GONZALES MATHIAS ALONSO', email: 'MATHIAS_NUNEZ@USMP.PE', role: 'Team UX', projectId: nanutech.id },
    { fullName: 'PACO CUSI ENRIQUE MIGUEL', email: 'ENRIQUE_PACO@USMP.PE', role: 'Fullstack', projectId: legado.id },
    { fullName: 'PALOMINO FALCON ANGEL AARON ARTURO', email: 'ANGEL_PALOMINO1@USMP.PE', role: 'Fullstack', projectId: nanutech.id },
    { fullName: 'QUEZADA PICHIHUA RONALD NICOLAS', email: 'RONALD_QUEZADA@USMP.PE', role: 'FullStack - Back', projectId: legado.id },
    { fullName: 'QUISPE MENDIVIL JORGE LUIS', email: '', role: 'Fullstack', projectId: nanutech.id },
    { fullName: 'RIOS MACHACA GIOVANY ALDAIR', email: 'GIOVANY_RIOS@USMP.PE', role: 'Fullstack', projectId: legado.id },
    { fullName: 'RODRIGUEZ VASQUEZ JIMENA ARELLY', email: 'JIMENA_RODRIGUEZ5@USMP.PE', role: 'FullStack - Back', projectId: nanutech.id },
    { fullName: 'SALAZAR CHUPURGO CRISTIAN JOSIMAR EDU', email: 'CRISTIAN_SALAZAR1@USMP.PE', role: 'Fullstack', projectId: legado.id },
    { fullName: 'SALVATIERRA TORRES ABEL DAVID', email: 'ABEL_SALVATIERRA@USMP.PE', role: 'FullStack - Front', projectId: nanutech.id },
    { fullName: 'SANTA CRUZ VARGAS AYLIN ANTHUANETTE', email: 'AYLIN_SANTACRUZ@USMP.PE', role: 'FullStack - Back', projectId: legado.id },
    { fullName: 'SUAREZ RAMOS LUIS ANTONIO', email: 'LUIS_SUAREZ5@USMP.PE', role: 'FullStack - Back', projectId: nanutech.id },
    { fullName: 'TAFUR TRUJILLO VICTOR MANUEL', email: 'VICTOR_TAFUR@USMP.PE', role: 'FullStack - Back', projectId: legado.id },
    { fullName: 'TOVAR SALAZAR JUNIOR JESUS ALEJANDRO', email: 'JUNIOR_TOVAR@USMP.PE', role: 'FullStack - Front', projectId: nanutech.id },
    { fullName: 'VILCA VARGAS IRWIN EDISON', email: 'IRWIN_VILCA@USMP.PE', role: 'UX', projectId: legado.id },
    { fullName: 'VILLEGAS MAMANI JOSE LUIS', email: 'JOSE_VILLEGAS1@USMP.PE', role: 'FullStack - Front', projectId: nanutech.id },
    { fullName: 'SAM ANTONY ESPINOZA LOPEZ', email: 'SAM_ESPINOZA@USMP.PE', role: 'Team QA', projectId: legado.id }
  ]

  // 3. Ejecutar carga masiva con lógica manual (findFirst -> update o create)
  for (const m of allMembers) {
    // Buscamos si el integrante ya existe por su nombre completo
    const existingMember = await prisma.teamMember.findFirst({
      where: { fullName: m.fullName }
    });

    if (existingMember) {
      // Si existe, lo actualizamos usando su ID único
      await prisma.teamMember.update({
        where: { id: existingMember.id },
        data: {
          role: m.role,
          projectId: m.projectId || null,
          isGlobalLeader: m.isGlobal || false,
          email: m.email
        }
      });
    } else {
      // Si no existe, lo creamos
      await prisma.teamMember.create({
        data: {
          fullName: m.fullName,
          email: m.email,
          role: m.role,
          isGlobalLeader: m.isGlobal || false,
          projectId: m.projectId || null
        }
      });
    }
  }

  console.log('✅ Base de datos poblada y actualizada con la información real de los proyectos.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })