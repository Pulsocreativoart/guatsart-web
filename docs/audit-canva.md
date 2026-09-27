# Auditoría UX, visual y de contenido

## GÜATSART — sitio de referencia en Canva

Fecha de revisión: 27 de septiembre de 2026  
Fuente autorizada por el cliente: `https://platypus-62xpvk.my.canva.site/`

## Resumen ejecutivo

La referencia comunica con claridad un territorio underground: hero oscuro en video, obra urbana y alternancia entre fondos negros y blancos. Su valor principal está en la materia visual. Sin embargo, funciona como una plantilla lineal, no como una experiencia curatorial completa. Carece de navegación, fichas consistentes, jerarquía editorial, estados interactivos, datos reales, accesibilidad y una estrategia de contacto operativa.

La propuesta implementada conserva el video y las seis imágenes autorizadas, corrige la arquitectura y convierte el contenido en un sistema editorial responsive. El resultado no copia la plantilla: construye una identidad propia para GÜATSART y deja una base técnica mantenible.

## 1. Inventario de la referencia

### Estructura observada

1. Hero en video con “GÜATSART / UNA NO GALERÍA / By NOUBODY”.
2. Presentación de NOUBODY con biografía de plantilla.
3. “Featured Works” con tres obras.
4. “Exhibiciones” con tres obras.
5. “Men's Fashion” con un tríptico recortado.
6. Contacto con teléfono y correo genéricos.
7. Enlaces sociales sin contexto editorial.

### Activos recuperados con autorización

- 1 video MP4 y su poster.
- 6 reproducciones de obra.
- Títulos legibles dentro de las reproducciones: *Underground*, *Milagrito concedido*, *La Búsqueda y El Sistema*, *El encargo y la evidencia*, *Surrender* y *Retumba el OM*.

## 2. Fortalezas

| Área | Hallazgo | Valor |
|---|---|---|
| Dirección visual | Contraste negro/blanco y gran escala | Sitúa la obra como protagonista |
| Hero | Video de sala con silueta humana | Introduce espacio, escala y contemplación |
| Material | Obras con lenguaje cromático reconocible | Base auténtica para extraer acentos |
| Ritmo | Alternancia de capítulos claros y oscuros | Permite construir una narrativa |
| Nombre | “Una no galería” | Territorio verbal diferenciador |

## 3. Problemas críticos

### Contenido y confianza

- La biografía contiene texto placeholder y datos potencialmente ficticios: nombre universitario, trayectoria y descripción genérica.
- Teléfono `123-456-7890` y correo `hello@reallygreatsite.com` son marcadores de plantilla.
- Las etiquetas “Jeffries & Madison”, “Tully & Drive”, “Anissa & Tam Co.” y similares parecen provenir de una plantilla de moda y no guardan relación verificable con las obras.
- La mezcla de inglés y español no responde a una estrategia bilingüe.

**Decisión:** no trasladar afirmaciones biográficas no verificadas. Sustituirlas por un texto curatorial que describe únicamente lo observable y marcar correo/redes como pendientes de confirmación.

### Arquitectura de información

- No existe navegación principal.
- Todas las secciones compiten en el mismo nivel.
- No hay fichas individuales, filtros, estados ni rutas compartibles.
- “Exhibiciones” no contiene fechas, sede, estatus ni texto curatorial.
- Contacto no tiene formulario ni expectativa de respuesta.

**Decisión:** índice persistente con cuatro destinos: Obra, Exhibiciones, Manifiesto y Contacto.

### UX e interacción

- La experiencia es una secuencia vertical sin mecanismos de exploración.
- Las imágenes no se amplían.
- No hay affordance para profundizar en la obra.
- El tríptico es visualmente atractivo, pero no se declara como recorte o detalle.
- No hay feedback, foco o estados de teclado visibles.

**Decisión:** galería horizontal con scroll nativo, botones, snap y lightbox; acercamiento inmersivo identificado; foco visible y escape por teclado.

### Responsive

- La composición original depende de coordenadas y escalado de Canva.
- En pantallas pequeñas, la tipografía y los recortes pueden perder jerarquía.
- El contenido no prioriza información por contexto móvil.
- No existe menú adaptativo.

**Decisión:** breakpoints funcionales en 375/768/1024/1440; gutters fluidos; menú móvil completo; obra con 86vw y scroll horizontal controlado.

### Accesibilidad

- Imágenes sin texto alternativo descriptivo.
- Falta de landmarks y jerarquía semántica verificable.
- Controles de Canva y contenido no forman una navegación de sitio.
- No existe ruta para omitir navegación.
- El video no declara alternativa para reducción de movimiento.

**Decisión:** HTML semántico, skip link, alt text curatorial, controles de 44 px, `prefers-reduced-motion`, pausa de video, foco restaurado en lightbox y pruebas axe/Playwright.

### Performance y SEO

- Dependencia del runtime y estructura generada por Canva.
- Sin control editorial sobre metadata, datos estructurados o URLs.
- Fuentes y recursos provienen del host de la plantilla.
- No hay estrategia propia de caché, imágenes responsive o formulario.

**Decisión:** Next.js App Router, medios locales autorizados, `next/image`, fuentes versionadas, metadata Open Graph, JSON-LD ArtGallery y API SMTP.

## 4. Matriz priorizada

| Prioridad | Problema | Impacto | Respuesta implementada |
|---|---|---|---|
| P0 | Copy y datos ficticios | Credibilidad/legal | Eliminación de afirmaciones no verificadas |
| P0 | Sin navegación | Usabilidad | Header persistente y menú móvil |
| P0 | Sin accesibilidad mínima | Inclusión/conformidad | Semántica, foco, teclado, alt, reduced motion |
| P1 | Obra sin exploración | Conversión/curaduría | Rail horizontal y ampliación |
| P1 | Identidad genérica | Diferenciación | Logotipo, tokens y reglas propias |
| P1 | Contacto inoperante | Conversión | Formulario validado y SMTP preparado |
| P2 | SEO ausente | Descubrimiento | Metadata, OG y JSON-LD |
| P2 | Mantenimiento difícil | Operación | Datos desacoplados y documentación |

## 5. Arquitectura propuesta

```text
Inicio
├── Hero / declaración
├── Una no galería / contexto
├── Obra seleccionada
│   ├── rail horizontal
│   └── vista ampliada
├── Exhibiciones / lectura curatorial
├── Acercamiento / experiencia material
├── Manifiesto
└── Contacto
    ├── adquisiciones
    ├── exhibiciones
    └── prensa y colaboración
```

Evolución recomendada:

```text
/obra/[slug]
/exhibiciones/[slug]
/artista
/visita
/prensa
```

## 6. Audiencias y tareas

| Audiencia | Necesidad | Respuesta UX |
|---|---|---|
| Coleccionista | Ver obra, técnica y disponibilidad | Fichas, ampliación y contacto por interés |
| Curador/a | Comprender práctica y series | Texto curatorial, manifiesto, archivo futuro |
| Prensa | Identificar relato y obtener contacto | Mensaje claro, metadatos y categoría prensa |
| Público | Explorar sin conocimiento previo | Recorrido visual, copy breve y controles directos |
| Equipo | Actualizar contenido sin romper diseño | Modelo `Artwork`, tokens y documentación |

## 7. Principios de la solución

1. **La obra manda:** la interfaz baja el volumen frente a la imagen.
2. **Movimiento con propósito:** orientación, continuidad y detalle; nunca adorno continuo.
3. **Curaduría sin invención:** describir lo observable y señalar pendientes.
4. **Responsive real:** no reducir escritorio; recomponer cada capítulo.
5. **Acceso equivalente:** teclado, tacto, puntero y reduced motion reciben rutas completas.
6. **Preparado para crecer:** contenido desacoplado, API independiente y despliegue documentado.

## 8. Riesgos y pendientes del cliente

- Confirmar correo, teléfono, ciudad/sede y perfiles sociales.
- Entregar biografía factual y declaración de artista aprobada.
- Entregar masters de obra en alta resolución, sin tipografía incrustada cuando existan.
- Confirmar título, año, técnica, dimensiones, serie, estatus y crédito fotográfico de cada pieza.
- Definir si los precios son públicos, bajo consulta o privados.
- Proporcionar aviso de privacidad para el formulario.
- Confirmar dominio y remitente SMTP.

## 9. Criterios de aceptación

- Navegación funcional con puntero, teclado y táctil.
- Sin overflow horizontal accidental a 375, 768, 1024 y 1440 px.
- Interacciones no dependen exclusivamente de hover.
- Imágenes con dimensiones reservadas y alt descriptivo.
- Contraste AA para texto funcional.
- Movimiento no esencial desactivado con preferencia del sistema.
- Build de producción, lint, tipos, Playwright y axe sin fallos graves.
- Variables SMTP fuera del repositorio.

## Conclusión

El sitio de Canva es una referencia estética útil, pero no un producto web listo para producción. La nueva dirección traduce su energía a un sistema curatorial, accesible y técnicamente sostenible, manteniendo los activos autorizados y eliminando la dependencia de contenido genérico.
