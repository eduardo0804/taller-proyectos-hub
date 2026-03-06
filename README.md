# 🎓 Taller de Proyectos HUB - Ecosistema Digital USMP

Plataforma Full-Stack de alta disponibilidad diseñada para la difusión, gestión y visualización arquitectónica de los proyectos de vanguardia desarrollados en la Escuela de Ingeniería de Computación y Sistemas (USMP). Actualmente albergando los ecosistemas: **Legado Fia** (Azure) y **NANUTECH** (AWS).

## 🚀 Características Principales

Esta plataforma está dividida en dos grandes módulos, aplicando el patrón de diseño de separación de responsabilidades (Route Groups):

### 🌍 1. Zona Pública (Frontend de Difusión)

* **Server-Side Rendering (SSR):** Consumo de datos ultrarrápido desde la base de datos para SEO técnico y rendimiento óptimo.
* **Diagramas Interactivos (Fase 3):** Visor de arquitectura de software renderizado con React Flow, permitiendo explorar las capas de Frontend, Backend e Infraestructura.
* **Timeline de Sprints:** Visualización dinámica de los avances semanales bajo metodología Scrum, calculando el progreso general y por áreas (Liderazgo, Desarrollo, Infraestructura, QA).
* **UI/UX Moderna:** Animaciones fluidas con Framer Motion y diseño responsivo construido con Tailwind CSS.

### 🔒 2. Gestor Administrativo (CMS Oculto)

* **Seguridad perimetral:** Ruta /admin-gestion protegida mediante Middleware de Next.js y Basic Authentication.
* **Editor Visual Drag & Drop:** Lienzo interactivo donde el administrador puede diseñar, arrastrar y conectar nodos de arquitectura, sincronizando las coordenadas (JSON) directamente a la base de datos.
* **Súper Formularios Dinámicos:** Gestor de reportes de avances construido con react-hook-form (useFieldArray) y validación estricta de esquemas con Zod.
* **Server Actions (Next.js 15):** Mutaciones de datos y revalidación de caché (revalidatePath) sin necesidad de crear APIs tradicionales.

---

## 🛠️ Stack Tecnológico

* **Core Framework:** [Next.js 15](https://nextjs.org/) (App Router) + React 19
* **Lenguaje:** TypeScript (Strict Mode)
* **Base de Datos:** PostgreSQL alojado en [Supabase](https://supabase.com/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Estilos y UI:** Tailwind CSS + Lucide React
* **Diagramas:** @xyflow/react (React Flow)
* **Formularios y Validación:** React Hook Form + Zod
* **Despliegue y Cron Jobs:** Vercel

---

## 🗄️ Esquema de Base de Datos (Modelo Relacional)

La base de datos Serverless está diseñada para soportar escalabilidad:

* **Project:** Almacena la información core (Legado Fia, NANUTECH) y el Cloud Provider.
* **TeamMember:** Gestión del equipo, roles y líderes globales.
* **AdvanceReport:** Registro complejo de los Sprints (Semana, estado, fechas, arrays de logros y un JSONB dinámico para el progreso por áreas).
* **DiagramState:** Almacena las coordenadas (X, Y) y las conexiones (Edges) del lienzo de arquitectura por cada capa (Frontend, Backend, Infra).

---

## ⚙️ Instalación y Desarrollo Local

Si deseas clonar y correr este proyecto en tu entorno local, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/taller-proyectos-hub.git
cd taller-proyectos-hub
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y solicita las credenciales de Supabase al administrador del repositorio:
```env
# Conexión a Supabase (PostgreSQL)
DATABASE_URL="postgres://[usuario]:[password]@[host]:[puerto]/[db]?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgres://[usuario]:[password]@[host]:[puerto]/[db]"
```

### 4. Sincronizar Prisma ORM
```bash
npx prisma generate
npx prisma db push
```

### 5. Iniciar el servidor de desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la plataforma. Para acceder al CMS, navega a `/admin-gestion`.

---

## 🤖 Operaciones Automatizadas (DevOps)

* **Cron Job Anti-Inactividad:** Configurado en `vercel.json` apuntando a `/api/cron` para ejecutar un ping diario a las 10:00 AM UTC, evitando la suspensión de la base de datos gratuita en Supabase.
* **SEO Dinámico:** Generación automática de `sitemap.xml` y `robots.txt` a través de las APIs nativas de metadatos de Next.js.

---

## 👨‍💻 Autor

* **Jesús Lázaro** - Gestión de Datos y Documentación (CMS)

Desarrollado con ❤️ para el curso de Taller de Proyectos - USMP 2026