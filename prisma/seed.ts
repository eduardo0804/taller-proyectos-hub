import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando carga masiva: Sprints 0, 1 y 2 + Roles actualizados...')

  // ==========================================
  // PROYECTOS
  // ==========================================
  const legado = await prisma.project.upsert({
    where: { slug: 'legado-fia' },
    update: { description: 'Sistema inteligente para la gestión y automatización de horarios académicos EPICS.' },
    create: { name: 'Legado Fia', slug: 'legado-fia', description: 'Sistema inteligente para la gestión y automatización de horarios académicos EPICS.', cloudProvider: 'Azure' }
  })

  const nanutech = await prisma.project.upsert({
    where: { slug: 'nanutech' },
    update: { description: 'Sistema integral de gestión de flota de camiones, contratos y monitoreo GPS.' },
    create: { name: 'NANUTECH', slug: 'nanutech', description: 'Sistema integral de gestión de flota de camiones, contratos y monitoreo GPS.', cloudProvider: 'AWS' }
  })

  // ==========================================
  // SPRINTS
  // ==========================================
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
        "Iniciar Sprint 2 enfocando en despliegue y mejoras del sistema legado",
        "Refactorizar nombres de variables reportadas por QA"
      ],
      areasProgress: [
        { area: "Desarrollo FullStack", progreso: 100, actividades: ["Desarrollo de Endpoints (HU07, 13, 14)", "Implementación de generación PDF", "Login Institucional"], responsables: ["Equipo Backend", "Equipo Frontend"] },
        { area: "Quality Assurance (QA)", progreso: 100, actividades: ["Testeo de variables", "Validación de permisos por rol", "Ejecución de pruebas unitarias"], responsables: ["Equipo QA"] }
      ]
    },

    // ==========================================
    // LEGADO FIA - SPRINT 2 (Semanas 9 y 10)
    // ==========================================
    {
      projectId: legado.id, sprintNumber: 2,
      title: "Despliegue del Sistema Legado y Mejoras de Módulos Académicos",
      status: "Completado", progress: 100, dateRange: "Semanas 9 y 10",
      description: "Sprint enfocado en el despliegue completo del sistema legado del ciclo anterior y la validación, reparación y mejora de los módulos académicos. Se coordinó con los equipos de DevSecOps, Backend, Frontend y UX para alinear el estado real del proyecto, corregir inconsistencias y asegurar que las HUs definidas cumplieran con los criterios de aceptación establecidos. El equipo QA implementó Klaros-Testmanagement desplegado en Azure como herramienta central de gestión de pruebas.",
      objectives: [
        "HU2: Gestionar Perfil de Usuario (Docente)",
        "HU3: Asignar Docente Responsable a Sílabo de Curso",
        "HU4: Visualizar Mis Asignaciones con filtros por estado",
        "HU5: Configurar Alcance de Edición del Sílabo",
        "HU6: Enviar Correo de Habilitación al Docente",
        "HU18: Bandeja de Revisión Académica",
        "HU24: Generar PDF Oficial de Sílabo Aprobado",
        "HU27: Bandeja de Seguimiento de Sílabos",
        "Desplegar y estabilizar el proyecto Legado del ciclo anterior al 100%",
        "Implementar Klaros-Testmanagement en VM Azure como herramienta QA centralizada"
      ],
      achievements: [
        "Despliegue completo del sistema Legado coordinado por Giovany Ríos con soporte de líderes de Backend y Frontend",
        "Revisión y validación de HUs (HU2 al HU27) en conjunto con el Product Owner Jean Carlos Estrada",
        "Reunión de líderes convocada para alinear mejoras del Sprint 2 con participación de todos los roles",
        "Coordinación con DevSecOps para gestión de secrets y configuración del repositorio GitHub del ciclo anterior",
        "Klaros-Testmanagement desplegado en VM Azure (Standard B2s, IP 20.75.93.99:18080) con acceso para los 36 integrantes",
        "Plan de pruebas estructurado con casos de prueba en Jest, Vitest, Selenium, Postman, pgAdmin y k6",
        "Capacitaciones al equipo UX, FullStack y Backend sobre estándares de testing y formato APA de documentación",
        "HU4 y HU5 validadas con criterios de aceptación dado/cuando/entonces correctamente estructurados",
        "Pruebas unitarias y de integración con 100% de aprobación para todas las HUs asignadas"
      ],
      blockers: [
        "Gestión de secrets de Azure generó retrasos en el despliegue del proyecto Legado (resuelto con reunión DevSecOps)",
        "El proyecto del ciclo anterior fue entregado incompleto, requiriendo revisión detallada antes de continuar",
        "Inestabilidad inicial del servidor Apache Tomcat de Klaros durante la configuración en la VM"
      ],
      nextSteps: [
        "Iniciar Sprint 3 con nuevas HUs del backlog validadas por el Product Owner",
        "Mantener Klaros-Testmanagement activo para gestión de pruebas del Sprint 3"
      ],
      areasProgress: [
        {
          area: "Desarrollo FullStack (Legado)",
          progreso: 100,
          actividades: [
            "Giovany Ríos: Despliegue del proyecto legado y reparación de funciones (HU2 y HU27)",
            "Luis Suárez: Desarrollo Backend HU6, HU18 y HU24",
            "Cristhian Salazar: Desarrollo Backend HU3, HU4 y HU5",
            "Abel Salvatierra: Desarrollo Frontend HU6, HU18 y HU24",
            "Jorge Quispe: Desarrollo Frontend HU3, HU4 y HU5"
          ],
          responsables: ["Giovany Ríos", "Luis Suárez", "Cristhian Salazar", "Abel Salvatierra", "Jorge Quispe"]
        },
        {
          area: "Quality Assurance (QA)",
          progreso: 100,
          actividades: [
            "Sam Espinoza: Pruebas HU2, HU3, HU4 y HU5 con Jest, Vitest, Selenium, Postman, pgAdmin y k6",
            "Rodrigo Barrios: Pruebas HU6, HU18, HU24 y HU27 con el mismo stack de herramientas",
            "Revisión de HUs junto al Product Owner Jean Carlos Estrada",
            "Configuración y despliegue de Klaros-Testmanagement en Azure",
            "Capacitaciones a equipos UX y FullStack sobre estándares de documentación"
          ],
          responsables: ["Sam Espinoza", "Rodrigo Barrios", "Verónica Chuquicaja"]
        },
        {
          area: "DevSecOps y Nube",
          progreso: 100,
          actividades: [
            "Reunión con DevSecOps para resolver gestión de secrets del proyecto Legado",
            "Organización y publicación del repositorio GitHub del ciclo anterior",
            "Despliegue de VM en Azure para Klaros (Standard B2s, East US 2)",
            "Configuración de reglas de seguridad NSG y tarea programada para inicio automático de Klaros"
          ],
          responsables: ["Jair Escalante", "Sebastián Angulo", "Hugo Meneses", "Pedro Palomino"]
        },
        {
          area: "UX/UI",
          progreso: 100,
          actividades: [
            "Reunión de alineación de mejoras de Legado con Figma",
            "Validación de flujos de interfaz frente a HUs del Sprint 2",
            "Capacitación en estructura de documentos e informes Sprint 2"
          ],
          responsables: ["Walter Choque", "Oscar Febres"]
        }
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
        "Iniciar Sprint 2 enfocado en Módulo de Contratos, GPS y Dashboards",
        "Preparar ambiente para integración con APIs de GPS"
      ],
      areasProgress: [
        { area: "Desarrollo y DevSecOps", progreso: 100, actividades: ["Integración Cognito JWT", "Endpoints de Jornada", "Paso a producción (Cloud)"], responsables: ["Fullstack Back", "Ing. Nube"] },
        { area: "Quality Assurance (QA)", progreso: 100, actividades: ["Pruebas de integración (HU1+2, HU2+3)", "Validación de flujos de error (Cuentas bloqueadas)", "Testing Estructural (Jest/Pytest)"], responsables: ["Equipo QA"] }
      ]
    },

    // ==========================================
    // NANUTECH - SPRINT 2 (Semanas 9 y 10)
    // ==========================================
    {
      projectId: nanutech.id, sprintNumber: 2,
      title: "Módulo de Contratos, Monitoreo GPS y Gestión de Flota",
      status: "Completado", progress: 100, dateRange: "Semanas 9 y 10",
      description: "Desarrollo de los módulos de contratos comerciales, integración GPS, dashboards ejecutivos y panel de monitoreo de camiones. El equipo FullStack de 10 integrantes ejecutó 8 historias de usuario coordinadas con el Product Owner y los líderes técnicos. Como iniciativa destacada, Irwin Vilca desarrolló de forma adicional una aplicación móvil Android integrada con la infraestructura en nube, propuesta formalmente para el Sprint 3. El equipo QA utilizó Klaros-Testmanagement, desplegado en Azure, como herramienta central de gestión y trazabilidad de pruebas.",
      objectives: [
        "HU5: Seguimiento de Jornadas del Chofer en tiempo real",
        "HU6: Panel de Gestión de Contratos Comerciales",
        "HU7: Detalles y Configuración de Contrato",
        "HU8: Integración GPS con proveedores externos",
        "HU11: Panel de Monitoreo y Gestión de Camiones",
        "HU12: Dashboard Ejecutivo de Métricas y Estadísticas",
        "HU14: Registro de Nuevo Contrato y Reglas de Tarifa",
        "HU16: Dashboard Gerencial",
        "Levantar sistema legado en conjunto con líderes de Backend y UX",
        "Ejecutar plan de pruebas con Jest, Vitest, Selenium, Postman, pgAdmin y Klaros"
      ],
      achievements: [
        "HU5, HU6, HU7, HU8, HU11, HU12, HU14 y HU16 completadas con 100% de aprobación en pruebas unitarias y de integración",
        "Irwin Vilca desarrolló aplicación móvil Android adicional integrada con AWS, presentada ante líderes el 3 de mayo de 2026",
        "Entidades GPS (gps_proveedor_formatos, gps_registros) validadas en base de datos con columnas, tipos de dato y restricciones correctas",
        "Klaros-Testmanagement operativo en Azure con cuentas personalizadas para los 36 integrantes del equipo",
        "Reunión de líderes del 26 de abril definió cambio de enfoque: descarte de app móvil compleja para no recargar al equipo FullStack",
        "Capacitaciones realizadas a equipos UX, FullStack y Backend sobre uso de Klaros, APA y estándares de documentación",
        "Plan de pruebas estructurado para HU5, HU6, HU7, HU8, HU11, HU12, HU14 y HU16 gestionado en Klaros",
        "Aplicación móvil de Irwin conectada exitosamente a la infraestructura en nube coordinando con Pedro Palomino"
      ],
      blockers: [
        "Extensiones de horario al equipo FullStack hasta las 10:30 pm redujo significativamente la ventana de pruebas QA",
        "Cambios de última hora en nombres de carpetas y variables generaron riesgos en git pull y retrasaron la validación",
        "Solicitud de ampliación de plazo para QA fue denegada, limitando la ejecución completa de pruebas de integración",
        "Decisiones comunicadas sin pasar por QA generaron desalineación entre los equipos y afectaron los plazos de revisión"
      ],
      nextSteps: [
        "Incorporar oficialmente la aplicación móvil Android de Irwin Vilca como HU del Sprint 3",
        "Investigar herramientas de prueba para entornos Android (Espresso, Appium) para el Sprint 3",
        "Reforzar la gestión de entregas FullStack para garantizar tiempo suficiente de QA en el siguiente sprint"
      ],
      areasProgress: [
        {
          area: "Desarrollo FullStack (Nanutech)",
          progreso: 100,
          actividades: [
            "Irwin Vilca (Backend): HU11, HU8 y desarrollo de aplicación móvil Android para Sprint 3",
            "Josmer Jáuregui (Backend): HU5 y HU6",
            "Bryan Valdivia (Backend): HU7",
            "Andrea Campos (Backend): HU12",
            "Aylin Santa Cruz (Backend): HU14",
            "Enrique Paco (Backend): HU16",
            "Junior Tovar (Frontend): HU5 y HU8",
            "Jose Villegas (Frontend): HU6 y HU7",
            "Renzo López (Frontend): HU11 y HU14",
            "Ángel Palomino (Frontend): HU12 y HU16"
          ],
          responsables: ["Irwin Vilca", "Josmer Jáuregui", "Bryan Valdivia", "Andrea Campos", "Aylin Santa Cruz", "Enrique Paco", "Junior Tovar", "Jose Villegas", "Renzo López", "Ángel Palomino"]
        },
        {
          area: "Quality Assurance (QA)",
          progreso: 100,
          actividades: [
            "Luis Hernández: Pruebas HU5, HU6, HU7 y HU8 con Jest, Vitest, Selenium, Postman, pgAdmin y k6",
            "Oskar Morales: Pruebas HU11, HU12, HU14 y HU16 con el mismo stack de herramientas",
            "Elaboración y entrega del plan de pruebas del Sprint 2",
            "Gestión de casos de prueba en Klaros-Testmanagement",
            "Capacitación a Aylin Santa Cruz sobre uso de Klaros para trazabilidad de pruebas"
          ],
          responsables: ["Luis Hernández", "Oskar Morales", "Verónica Chuquicaja"]
        },
        {
          area: "Arquitectura y Nube",
          progreso: 100,
          actividades: [
            "Validación de estructura de base de datos (entidades GPS, contratos y jornadas)",
            "Soporte de infraestructura AWS para integración de la app móvil de Irwin Vilca",
            "Arquitectura C4 (Nivel 1, 2 y 3) y arquitectura operativa QA documentadas",
            "VM Azure para Klaros configurada con reglas NSG, tarea programada y acceso remoto RDP"
          ],
          responsables: ["Julio Rodríguez", "Samantha Lezma", "Pedro Palomino", "Ronald Quezada"]
        },
        {
          area: "Scrum y Gestión",
          progreso: 100,
          actividades: [
            "Ceremonias Scrum ejecutadas: Daily Scrum (27/04, 29/04, 01/05, 04/05, 06/05)",
            "Reunión de líderes del 26 de abril: decisión de no incorporar app móvil compleja al Sprint 2",
            "Reunión de líderes del 3 de mayo: presentación de la app Android de Irwin Vilca y aprobación para Sprint 3",
            "Acuerdos de extensiones de plazo comunicados en Daily del 4 de mayo (UX +1 día, QA y Nube +2 horas)"
          ],
          responsables: ["Aldo Chamochumbi", "Jimena Rodríguez", "Verónica Chuquicaja"]
        }
      ]
    }

  ]

  for (const sp of sprints) {
    await prisma.advanceReport.upsert({
      where: { projectId_sprintNumber: { projectId: sp.projectId, sprintNumber: sp.sprintNumber } },
      update: sp,
      create: sp
    })
  }

  console.log('✅ Sprints cargados correctamente.')

  // ==========================================
  // INTEGRANTES CON ROLES ACTUALIZADOS
  // ==========================================
  const allMembers = [
    // ---- LÍDERES GLOBALES (ambos proyectos) ----
    { fullName: 'CHAMOCHUMBI SALINAS ALDO ANDRE',          email: 'ALDO_CHAMOCHUMBI@USMP.PE',    role: 'Scrum Master',              isGlobal: true,  projectId: null },
    { fullName: 'CHUQUICAJA PALACIOS VERONICA SOFIA',      email: 'VERONICA_CHUQUICAJA@USMP.PE', role: 'Líder QA',                  isGlobal: true,  projectId: null },
    { fullName: 'ESCALANTE MAGUIÑA JAIR JOSUE',            email: 'JAIR_ESCALANTE@USMP.PE',      role: 'Líder DevSecOps',           isGlobal: true,  projectId: null },
    { fullName: 'HUAMAN CARLOS ABRAHAM JEREMIAS',          email: 'ABRAHAM_HUAMAN1@USMP.PE',     role: 'Líder Front-End',           isGlobal: true,  projectId: null },
    { fullName: 'LAZARO BRAVO JESUS EDUARDO',              email: 'JESUS_LAZARO@USMP.PE',        role: 'Líder Gestor de Contenido', isGlobal: true,  projectId: null },
    { fullName: 'LEZMA CHUCHÓN SAMANTHA ALEJANDRA',        email: 'SAMANTHA_LEZMA@USMP.PE',      role: 'Team Arquitectura',         isGlobal: true,  projectId: null },
    { fullName: 'PALOMINO ZARATE PEDRO ARMANDO EDUARDO',   email: 'PEDRO_PALOMINO3@USMP.PE',     role: 'Líder Ingeniero de nube',   isGlobal: true,  projectId: null },
    { fullName: 'QUEZADA PICHIHUA RONALD NICOLAS',         email: 'RONALD_QUEZADA@USMP.PE',      role: 'Team Ingeniero de Nube',    isGlobal: true,  projectId: null },
    { fullName: 'RODRIGUEZ DE LA ROCA JULIO DANIEL',       email: 'JULIO_RODRIGUEZ8@USMP.PE',    role: 'Arquitecto',                isGlobal: true,  projectId: null },

    // ---- EQUIPO LEGADO FIA ----
    { fullName: 'ANGULO URIBE SEBASTIAN CESAR',            email: 'SEBASTIAN_ANGULO@USMP.PE',    role: 'Team DevSecOps',            isGlobal: false, projectId: legado.id },
    { fullName: 'BARRIOS CACERES RODRIGO ANDRES',          email: 'RODRIGO_BARRIOS@USMP.PE',     role: 'Team QA',                   isGlobal: false, projectId: legado.id },
    { fullName: 'CHOQUE VILLALTA WALTER SMITH',            email: 'WALTER_CHOQUE1@USMP.PE',      role: 'Líder UX y Product Owner',  isGlobal: false, projectId: legado.id },
    { fullName: 'ESTRADA BARRIENTOS JEAN CARLOS',          email: 'JEAN_ESTRADA@USMP.PE',        role: 'Líder Back-End y Product Owner', isGlobal: false, projectId: legado.id },
    { fullName: 'MENESES MORENO HUGO FRANCISCO',           email: '',                            role: 'Team DevSecOps',            isGlobal: false, projectId: legado.id },
    { fullName: 'QUISPE MENDIVIL JORGE LUIS',              email: '',                            role: 'FullStack - Front',         isGlobal: false, projectId: legado.id },
    { fullName: 'RIOS MACHACA GIOVANY ALDAIR',             email: 'GIOVANY_RIOS@USMP.PE',        role: 'FullStack - Front',         isGlobal: false, projectId: legado.id },
    { fullName: 'SALAZAR CHUPURGO CRISTIAN JOSIMAR EDU',  email: 'CRISTIAN_SALAZAR1@USMP.PE',   role: 'FullStack - Back',          isGlobal: false, projectId: legado.id },
    { fullName: 'SALVATIERRA TORRES ABEL DAVID',           email: 'ABEL_SALVATIERRA@USMP.PE',    role: 'FullStack - Front',         isGlobal: false, projectId: legado.id },
    { fullName: 'SUAREZ RAMOS LUIS ANTONIO',               email: 'LUIS_SUAREZ5@USMP.PE',        role: 'FullStack - Back',          isGlobal: false, projectId: legado.id },
    { fullName: 'SAM ANTONY ESPINOZA LOPEZ',               email: 'SAM_ESPINOZA@USMP.PE',        role: 'Team QA',                   isGlobal: false, projectId: legado.id },

    // ---- EQUIPO NANUTECH ----
    { fullName: 'CAMPOS HUAMAN ANDREA ANGELINA',           email: 'ANDREA_CAMPOS2@USMP.PE',      role: 'FullStack - Back',          isGlobal: false, projectId: nanutech.id },
    { fullName: 'FEBRES DELGADO OSCAR ANDRE',              email: 'OSCAR_FEBRES@USMP.PE',        role: 'Team UX',                   isGlobal: false, projectId: nanutech.id },
    { fullName: 'HERNANDEZ RAMIREZ LUIS ALBERTO',          email: 'LUIS_HERNANDEZ7@USMP.PE',     role: 'Team QA',                   isGlobal: false, projectId: nanutech.id },
    { fullName: 'JAUREGUI CACERES JOSMER',                 email: 'JOSMER_JAUREGUI@USMP.PE',     role: 'FullStack - Back',          isGlobal: false, projectId: nanutech.id },
    { fullName: 'LOPEZ BAZAN RENZO FABIAN',                email: 'RENZO_LOPEZ4@USMP.PE',        role: 'FullStack - Front',         isGlobal: false, projectId: nanutech.id },
    { fullName: 'MORALES FLORES OSKAR ANDRE',              email: 'OSKAR_MORALES@USMP.PE',       role: 'Team QA',                   isGlobal: false, projectId: nanutech.id },
    { fullName: 'NUÑEZ GONZALES MATHIAS ALONSO',           email: 'MATHIAS_NUNEZ@USMP.PE',       role: 'Team UX',                   isGlobal: false, projectId: nanutech.id },
    { fullName: 'PACO CUSI ENRIQUE MIGUEL',                email: 'ENRIQUE_PACO@USMP.PE',        role: 'FullStack - Back',          isGlobal: false, projectId: nanutech.id },
    { fullName: 'PALOMINO FALCON ANGEL AARON ARTURO',      email: 'ANGEL_PALOMINO1@USMP.PE',     role: 'FullStack - Front',         isGlobal: false, projectId: nanutech.id },
    { fullName: 'RODRIGUEZ VASQUEZ JIMENA ARELLY',         email: 'JIMENA_RODRIGUEZ5@USMP.PE',   role: 'Product Owner',             isGlobal: false, projectId: nanutech.id },
    { fullName: 'SANTA CRUZ VARGAS AYLIN ANTHUANETTE',     email: 'AYLIN_SANTACRUZ@USMP.PE',     role: 'FullStack - Back',          isGlobal: false, projectId: nanutech.id },
    { fullName: 'TAFUR TRUJILLO VICTOR MANUEL',            email: 'VICTOR_TAFUR@USMP.PE',        role: 'Team DevSecOps',            isGlobal: false, projectId: nanutech.id },
    { fullName: 'TOVAR SALAZAR JUNIOR JESUS ALEJANDRO',    email: 'JUNIOR_TOVAR@USMP.PE',        role: 'FullStack - Front',         isGlobal: false, projectId: nanutech.id },
    { fullName: 'VALDIVIA PILLACA BRYAN ARNOLD',           email: 'BRYAN_VALDIVIA1@USMP.PE',     role: 'FullStack - Back',          isGlobal: false, projectId: nanutech.id },
    { fullName: 'VILCA VARGAS IRWIN EDISON',               email: 'IRWIN_VILCA@USMP.PE',         role: 'FullStack - Back',          isGlobal: false, projectId: nanutech.id },
    { fullName: 'VILLEGAS MAMANI JOSE LUIS',               email: 'JOSE_VILLEGAS1@USMP.PE',      role: 'FullStack - Front',         isGlobal: false, projectId: nanutech.id },
  ]

  for (const m of allMembers) {
    const existing = await prisma.teamMember.findFirst({
      where: { fullName: m.fullName }
    })

    if (existing) {
      await prisma.teamMember.update({
        where: { id: existing.id },
        data: {
          role: m.role,
          email: m.email,
          isGlobalLeader: m.isGlobal,
          projectId: m.projectId
        }
      })
    } else {
      await prisma.teamMember.create({
        data: {
          fullName: m.fullName,
          email: m.email,
          role: m.role,
          isGlobalLeader: m.isGlobal,
          projectId: m.projectId
        }
      })
    }
  }

  console.log('✅ Base de datos poblada y actualizada correctamente. Sprints 0, 1 y 2 cargados. Roles de 36 integrantes actualizados.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })