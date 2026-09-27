# ADR 0001 — Next.js en Vercel con servicios de cPanel

Estado: aceptado  
Fecha: 2026-09-27

## Contexto

El proyecto necesita una experiencia dinámica, animaciones, futuro editor de contenido, formulario SMTP y un flujo de colaboración GitHub. El cliente también utiliza cPanel.

## Decisión

Usar Next.js App Router en Vercel para aplicación y API. Usar cPanel para DNS, dominio y SMTP. Mantener compatibilidad con servidor Node en cPanel como segunda ruta, sujeta a capacidades reales del plan.

## Consecuencias

- Preview deployments y rollback inmediatos.
- API de contacto en el mismo repositorio.
- No se depende de un export estático para producción.
- El acceso de cPanel debe confirmar versión de Node y procesos persistentes.
- Si solo hay Apache/PHP, se diseñará un adaptador específico sin degradar el repositorio principal.
