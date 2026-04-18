import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando carga masiva hiper-detallada de Sprints 0 y 1...')

  const legado = await prisma.project.upsert({
    where: { slug: 'legado-fia' },
    update: { description: 'Sistema inteligente para la gestión y automatización de horarios académicos EPICS.' },
    create: { name: 'Legado Fia', slug: 'legado-fia', description: 'Sistema...', cloudProvider: 'Azure' }
  })

  const nanutech = await prisma.project.upsert({
    where: { slug: 'nanutech' },
    update: { description: 'Sistema integral de gestión de flota de camiones, contratos y monitoreo GPS.' },
    create: { name: 'NANUTECH', slug: 'nanutech', description: 'Sistema...', cloudProvider: 'AWS' }
  })

  // Sprints Hiper-Detallados
  const sprints = [
    // ==========================================
    // LEGADO FIA - SPRINT 0 (Semanas 1, 2, 3, 4)
    // ==========================================
    {
      projectId: legado.id, sprintNumber: 0,
      title: "Planificación Base, Arquitectura y Ceremonias Ágiles",
      status: "Completado", progress: 100, dateRange: "Semanas 1, 2, 3 y 4",
      description: "Fase de cimentación del proyecto. Se establecieron los marcos de trabajo, repositorios, metodologías de testing y diseño de la arquitectura base orientada a microfrontends en Azure.",
      objectives: [
        "Definición formal del Product Vision Board y el MVP del sistema",
        "Diseño de la arquitectura de alto nivel (C4 / ARC42) y ADRs",
        "Estructuración de repositorios en GitHub con GitFlow",
        "Diseño de interfaces en Figma (Bocetos y Prototipos UI/UX)",
        "Configuración del entorno de Azure DevOps (Boards, Epics, HUs)",
        "Elaboración del plan y estrategia de pruebas QA"
      ],
      achievements: [
        "Product Backlog priorizado y ceremonias Scrum definidas",
        "Entrevistas a stakeholders completadas (insights documentados)",
        "Modelo de datos inicial (ER) y diseño de APIs (Swagger) establecidos",
        "Definición de Definition of Ready (DoR) y Definition of Done (DoD) aprobada",
        "Presupuestos y recursos de Azure Functions/App Services costeados"
      ],
      blockers: [
        "Retrasos iniciales en UX por problemas en mapeo de procesos (requirió apoyo de Tester)",
        "Costo elevado en Azure Test Plans obligó a pivotar herramientas a Cypress/Postman"
      ],
      nextSteps: [
        "Iniciar desarrollo activo de HUs del Sprint 1",
        "Implementar el login con cuenta institucional"
      ],
      areasProgress: [
        { area: "Liderazgo y Producto", progreso: 100, actividades: ["Definición del marco Scrum", "Configuración Azure DevOps", "Priorización de Backlog"], responsables: ["Product Owner", "Scrum Master"] },
        { area: "Arquitectura y DevSecOps", progreso: 100, actividades: ["Diagramas C4 y ADR", "Configuración GitHub Actions", "Definición Stack (Azure)"], responsables: ["Arquitecto", "Líder DevSecOps"] },
        { area: "UX/UI", progreso: 100, actividades: ["Mapas de empatía", "Customer Journey", "Wireframes en Figma"], responsables: ["Líder UX"] }
      ]
    },
    // ==========================================
    // LEGADO FIA - SPRINT 1 (Semanas 5, 6, 7)
    // ==========================================
    {
      projectId: legado.id, sprintNumber: 1,
      title: "Módulo Core: Asignaciones, Sílabos y Autenticación",
      status: "Completado", progress: 100, dateRange: "Semanas 5, 6 y 7",
      description: "Desarrollo del motor principal del sistema. Se construyeron los flujos de visualización de asignaciones, gestión de contenido conceptual y la exportación de sílabos institucionales, integrando roles dinámicos.",
      objectives: [
        "HU07: Visualizar Asignaciones (Filtros, búsquedas y CRUD base)",
        "HU13: Programar Contenido Conceptual por semana validado",
        "HU14: Visualizar Asignaciones como Docente (Filtro por estado Aprobado)",
        "HU25: Exportar Sílabo a formato PDF seguro",
        "HU26: Importar Sílabos con firma en PDF y persistencia de metadatos"
      ],
      achievements: [
        "Integración exitosa de Login con cuenta institucional y validación de 3 roles",
        "Filtros de búsqueda por código de asignatura operando en tiempo real",
        "Endpoints estandarizados para descarga y vista previa de impresión (PDF)",
        "Restricciones de seguridad por rol implementadas (Ej. Solo el director cambia estados)",
        "Creación de pruebas unitarias y de integración para las 5 HUs"
      ],
      blockers: [
        "Retiro temporal de HU de departamento académico por reasignación de estimaciones",
        "Inactividad temporal de recursos Back/Front requirió redistribución de tareas",
        "Nomenclatura de algunas variables detectadas en QA requerirán refactorización menor"
      ],
      nextSteps: [
        "Iniciar Sprint 2 enfocando en herencia de sílabos",
        "Refactorizar nombres de variables reportadas por QA"
      ],
      areasProgress: [
        { area: "Desarrollo FullStack", progreso: 100, actividades: ["Desarrollo de Endpoints (HU07, 13, 14)", "Implementación de generación PDF", "Login Institucional"], responsables: ["Equipo Backend", "Equipo Frontend"] },
        { area: "Quality Assurance (QA)", progreso: 100, actividades: ["Testeo de variables", "Validación de permisos por rol", "Ejecución de pruebas unitarias"], responsables: ["Equipo QA"] }
      ]
    },
    // ==========================================
    // NANUTECH - SPRINT 0 (Semanas 1, 2, 3, 4)
    // ==========================================
    {
      projectId: nanutech.id, sprintNumber: 0,
      title: "Modelado Serverless, Presupuestos y Diseño de Producto",
      status: "Completado", progress: 100, dateRange: "Semanas 1, 2, 3 y 4",
      description: "Fase fundacional enfocada en estructurar el modelo Serverless en AWS, diseñar la base de datos relacional y prototipar la App de Choferes para registro rápido de jornadas.",
      objectives: [
        "Definición del MVP y alcance técnico del sistema de flota",
        "Modelado de base de datos RDS PostgreSQL (Entidades: Trucks, Contracts)",
        "Diseño de la arquitectura API-Driven y Serverless (Lambda + API Gateway)",
        "Prototipado en Figma de la App Móvil y Dashboard Web",
        "Estrategia de branching y CI/CD en GitHub Actions"
      ],
      achievements: [
        "Stack tecnológico validado (React Native + Node.js + RDS)",
        "Infraestructura base creada y roles IAM configurados en AWS",
        "Criterios de Aceptación (DoD) formalizados para el equipo técnico",
        "Presupuestos operativos cloud aprobados por stakeholders"
      ],
      blockers: [
        "Curva de aprendizaje inicial en servicios serverless (superada con capacitaciones)"
      ],
      nextSteps: [
        "Iniciar desarrollo del módulo de autenticación",
        "Desarrollar endpoints de App Chofer"
      ],
      areasProgress: [
        { area: "Ingeniería Cloud / DevSecOps", progreso: 100, actividades: ["Setup AWS Lambda y API Gateway", "Configuración IAM y Secretos", "Pipeline inicial CI/CD"], responsables: ["Arquitecto", "Ing. Nube", "DevSecOps"] },
        { area: "UX/UI", progreso: 100, actividades: ["Flujos de usuario (App Chofer)", "Wireframes del Dashboard"], responsables: ["Líder UX"] }
      ]
    },
    // ==========================================
    // NANUTECH - SPRINT 1 (Semanas 5, 6, 7)
    // ==========================================
    {
      projectId: nanutech.id, sprintNumber: 1,
      title: "Módulo Core: Autenticación Cognito y Jornada Logística",
      status: "Completado", progress: 100, dateRange: "Semanas 5, 6 y 7",
      description: "Construcción del sistema de accesos seguro y el flujo principal de operación del chofer en terreno. El código ha superado todas las barreras de DevSecOps y QA.",
      objectives: [
        "HU1: Sistema de recuperación de cuenta (Chofer y Administrador)",
        "HU2: Registro de nueva jornada por Administrador de Operaciones",
        "HU3: Marca de inicio y fin de turno (Asignada al Chofer de camión)"
      ],
      achievements: [
        "Validación E2E del flujo de Login usando AWS Cognito (Retorno de JWT Token)",
        "Más de 27 pruebas unitarias aprobadas (9+ pruebas específicas por cada HU)",
        "Bloqueo automático de cuenta por múltiples intentos fallidos implementado",
        "Pull Request aprobado por DevSecOps y desplegado exitosamente en AWS Cloud",
        "Validación de base de datos estructural y funcionalidad de botones"
      ],
      blockers: [
        "Cambio de versión en la HU3 previo al inicio por inclusión de ícono de observaciones",
        "Ajustes de dominio local requeridos durante pruebas de recuperación"
      ],
      nextSteps: [
        "Iniciar Sprint 2 enfocado en Módulo de Contratos y Tarifas",
        "Preparar ambiente para integración con APIs de GPS"
      ],
      areasProgress: [
        { area: "Desarrollo y DevSecOps", progreso: 100, actividades: ["Integración Cognito JWT", "Endpoints de Jornada", "Paso a producción (Cloud)"], responsables: ["Fullstack Back", "Ing. Nube"] },
        { area: "Quality Assurance (QA)", progreso: 100, actividades: ["Pruebas de integración (HU1+2, HU2+3)", "Validación de flujos de error (Cuentas bloqueadas)", "Testing Estructural (Jest/Pytest)"], responsables: ["Equipo QA"] }
      ]
    }
  ];

  for (const sp of sprints) {
    await prisma.advanceReport.upsert({
      where: { projectId_sprintNumber: { projectId: sp.projectId, sprintNumber: sp.sprintNumber } },
      update: sp,
      create: sp
    });
  }

  console.log('✅ Base de datos poblada exitosamente.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })