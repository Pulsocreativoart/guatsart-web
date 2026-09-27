# Dirección UX/UI

## Objetivo de experiencia

La navegación debe sentirse como entrar en una sala: primero orientación, después escala, luego detalle y finalmente conversación. La web evita el “scroll-jacking”; combina scroll vertical nativo con un único capítulo horizontal claramente señalado.

## Flujo narrativo

| Momento | Intención | Recurso |
|---|---|---|
| Umbral | Crear presencia | Video de sala + marca a escala arquitectónica |
| Contexto | Explicar sin biografía ficticia | Declaración breve de “una no galería” |
| Exploración | Comparar piezas | Rail horizontal con botones, snap y teclado |
| Profundidad | Mirar materia | Lightbox y acercamiento tripartito |
| Posición | Definir postura | Manifiesto en naranja |
| Conversión | Abrir conversación | Formulario por intención y correo directo |

## Responsive

### Móvil, 375–767 px

- Prioridad: marca, obra y acción.
- Menú de pantalla completa con cuatro destinos.
- Titulares de 44–70 px.
- Cards de obra a 86vw para mostrar continuidad lateral.
- Controles visibles de 48 px.
- Formulario de una columna.
- Tríptico conserva tres fragmentos, con menor separación.

### Tablet, 768–1023 px

- Header compacto y menú móvil.
- Obra a 78vw.
- Secciones editoriales en una columna amplia.
- La lectura curatorial pasa bajo la imagen principal.

### Escritorio, 1024 px+

- Navegación visible.
- Hero con composición asimétrica.
- Obra a máximo 920 px y adelanto de la siguiente pieza.
- Textos curatoriales en dos columnas.
- Contacto dividido entre mensaje y formulario.

## Estados de interacción

- **Links:** subrayado animado o cambio de dirección del icono.
- **Botones de rail:** inversión carbón/hueso.
- **Obras:** escala de 1.025, scrim y llamada “Ver obra”.
- **Focus:** anillo cian de 3 px con offset 4 px.
- **Formulario:** borde naranja al foco; mensaje contextual con `aria-live`.
- **Lightbox:** apertura con escala/opacidad, cierre visible y Escape.
- **Disabled:** opacidad y cursor semánticos sin cambio de geometría.

## Movimiento

- Hero: parallax máximo de 100 px y escala de 1.08.
- Revelados: 24 px / 650 ms, una vez por capítulo.
- Rail: scroll nativo `smooth` solo al pulsar botones.
- Marquee: 24 s, decorativo, se detiene con reduced motion.
- Video: se pausa y vuelve al fotograma inicial con reduced motion.

## Accesibilidad

- Orden DOM igual al orden visual.
- Un solo H1; capítulos con H2; piezas y notas con H3.
- Skip link al contenido.
- Touch targets mínimos de 44 × 44 px.
- Contraste AA/AAA documentado en la guía de marca.
- Descripción alternativa específica por obra.
- Ninguna función depende solo de gesto, color o hover.
- Lightbox restaura foco al control que lo abrió.

## Modelo de contenido

Las obras viven en `src/data/content.ts`. Cada registro exige:

```ts
type Artwork = {
  id: string;
  title: string;
  series: string;
  medium: string;
  year: string;
  dimensions?: string;
  image: string;
  alt: string;
  accent: string;
};
```

Este contrato es la futura interfaz entre el frontend y un CMS/editor IA. No debe acoplarse la composición a un proveedor específico.

## Métricas recomendadas

- Interacción con obra ampliada.
- Profundidad de scroll por capítulo.
- Uso de controles del rail frente a gesto.
- Conversión de contacto por interés.
- Click en correo directo.
- Web Vitals: LCP, INP y CLS por dispositivo.

No se instala analítica en el prototipo hasta definir consentimiento y proveedor.
