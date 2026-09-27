# GÜATSART

Experiencia web curatorial para **GÜATSART — Una no galería**, por NOUBODY.

## Estado

Prototipo funcional responsive con identidad, navegación, galería horizontal, vista ampliada de obra, manifiesto, formulario SMTP y documentación de despliegue.

## Stack

- Next.js App Router + React + TypeScript.
- Tailwind CSS disponible para evolución del sistema; composición principal en CSS tokenizado.
- Motion para continuidad, revelados y reduced motion.
- `next/image` y medios locales autorizados.
- Nodemailer + Zod para el formulario SMTP.
- Playwright + axe para escritorio, tablet, móvil y accesibilidad automatizada.

## Inicio rápido

Requiere Node.js 22 o superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

En Windows PowerShell, usar `Copy-Item .env.example .env.local` si se necesita crear el archivo de entorno.

Abrir `http://localhost:3000`.

## Comandos

```bash
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run start        # servidor de producción
npm run lint         # reglas estáticas
npm run typecheck    # TypeScript estricto
npm run test:e2e     # Playwright: desktop/tablet/móvil + axe
npm run capture      # capturas, requiere servidor en puerto 3000
npm run verify       # lint + tipos + build + pruebas
```

Instalar navegadores de prueba una vez:

```bash
npx playwright install chromium webkit
```

## Edición de contenido

- Obras y notas curatoriales: `src/data/content.ts`.
- Copy y composición: `src/components/site/HomePage.tsx`.
- Tokens implementados: `src/app/globals.css`.
- Tokens portables: `assets/design-tokens.json`.
- Guía de marca: `docs/brand-guidelines.md`.

No incrustar secretos, correos SMTP ni tokens de despliegue en código.

## Variables de entorno

Copiar `.env.example`. Las variables SMTP son obligatorias únicamente para enviar formularios. Sin ellas, la interfaz permanece funcional y ofrece el correo directo, pero el endpoint responde en modo vista previa.

## Calidad

Breakpoints verificados:

- móvil: iPhone 13 / 390 px;
- tablet: iPad Pro 11 / 834 px;
- escritorio: Chromium / 1440 px.

La galería horizontal es una región con scroll nativo y botones; el resto del sitio conserva scroll vertical normal.

## Despliegue

Consultar `docs/deployment.md` para Vercel, cPanel con Node.js, DNS y SMTP.

## Contenido provisional

El correo, los perfiles sociales y algunos metadatos de obra siguen pendientes de confirmación. Ver `docs/content-inventory.md` antes de publicar como producción final.
