# Colaboración

## Flujo

1. Crear rama desde `main`: `feature/descripcion` o `fix/descripcion`.
2. Mantener cambios pequeños y temáticos.
3. Ejecutar `npm run verify` antes de solicitar revisión.
4. Adjuntar capturas si cambia layout, tipografía o movimiento.
5. No modificar `public/media/` sin documentar procedencia y autorización.

## Convención de commits

Usar Conventional Commits:

- `feat:` capacidad nueva.
- `fix:` corrección.
- `docs:` documentación.
- `style:` cambio visual sin lógica.
- `test:` cobertura.
- `chore:` mantenimiento.

## Reglas de diseño

- Leer `docs/brand-guidelines.md` antes de tocar estilos.
- Usar tokens; no introducir colores arbitrarios en componentes.
- Mantener targets táctiles de al menos 44 × 44 px.
- Toda imagen significativa requiere `alt`.
- Toda animación nueva debe funcionar con `prefers-reduced-motion`.
- No crear un segundo scroll horizontal en móvil.

## Contenido

No publicar afirmaciones biográficas ni datos de obra sin aprobación. Los placeholders deben estar documentados en `docs/content-inventory.md`.
