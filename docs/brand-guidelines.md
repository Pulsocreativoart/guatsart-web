# GÜATSART — sistema de identidad

Versión 1.0 · 27 de septiembre de 2026

## 1. Idea rectora

**GÜATSART es un archivo vivo y una no galería.** La identidad se construye sobre una tensión deliberada: rigor editorial por fuera, gesto indócil por dentro. No intenta domesticar la obra ni imitar un museo institucional. Crea un marco firme para que la materia, la caligrafía y el conflicto visual respiren.

Conceptos centrales:

- **Fricción:** calle/sala, impulso/archivo, orden/ruptura.
- **Portal abierto:** la marca no encierra; introduce y deja salir.
- **Archivo vivo:** la colección puede cambiar sin perder coherencia.
- **Presencia material:** color, textura y escala nacen de la obra, no de una tendencia digital.

Tagline principal: **Una no galería.**

Firma: **Por NOUBODY.**

## 2. Logotipo

### Concepto

El símbolo parte de una **G abierta** atravesada por una diagonal. La apertura representa acceso y proceso; la diagonal, interferencia. Los dos puntos superiores transforman la diéresis de “GÜATSART” en un rasgo reconocible y propio.

### Versiones

| Versión | Archivo | Uso |
|---|---|---|
| Principal horizontal | `public/brand/guatsart-logo-dark.svg` | Fondos hueso o claros |
| Invertida horizontal | `public/brand/guatsart-logo-light.svg` | Fondos carbón, video o fotografía oscura |
| Símbolo | `public/brand/guatsart-symbol.svg` | Favicon, avatar y espacios menores a 120 px |

### Área de protección

Definir **x** como el diámetro de uno de los puntos de la diéresis. Mantener como mínimo **4x** libres alrededor de la firma completa y **3x** alrededor del símbolo.

### Tamaño mínimo

- Firma horizontal digital: **120 px** de ancho.
- Símbolo digital: **24 px**; recomendado **32 px** o más.
- Firma impresa: **35 mm** de ancho.
- Símbolo impreso: **10 mm**.

### Usos correctos

- Carbón sobre fondos claros.
- Hueso sobre fondos oscuros.
- Sobre fotografía únicamente cuando exista una zona estable con contraste mínimo AA.
- Mantener siempre proporciones y área de protección.

### Usos incorrectos

- No estirar, comprimir, rotar ni recortar.
- No reemplazar la diéresis por otro signo.
- No agregar sombras, biseles, degradados o contornos.
- No colocar sobre una zona de la obra que compita con su lectura.
- No usar naranja sobre hueso para texto: su contraste es insuficiente.

## 3. Paleta cromática

| Rol | Nombre | Hex | RGB | Uso |
|---|---|---:|---:|---|
| Base oscura | Carbón Archivo | `#0D0F0E` | 13, 15, 14 | Fondos inmersivos, texto principal |
| Superficie oscura | Negro Sala | `#111312` | 17, 19, 18 | Tarjetas, header, footer |
| Base clara | Hueso Papel | `#FAF9F5` | 250, 249, 245 | Fondos editoriales y texto invertido |
| Superficie clara | Cal | `#F1EFE8` | 241, 239, 232 | Capítulos y separaciones |
| Acento principal | Naranja Materia | `#ED6F38` | 237, 111, 56 | Manifiesto, llamadas gráficas |
| Acento digital | Cian Pulso | `#3BD8D3` | 59, 216, 211 | Foco, gesto lineal y accesibilidad |
| Acento secundario | Rosa Señal | `#EE3F91` | 238, 63, 145 | Intervenciones controladas |

### Contraste verificado

- Hueso / Carbón: **18.26:1**, AAA.
- Naranja / Carbón: **6.35:1**, AA para texto normal.
- Cian / Carbón: **10.94:1**, AAA.
- Rosa / Carbón: **5.27:1**, AA.
- Naranja / Hueso: **2.88:1**, solo decoración o texto muy grande; no usar en cuerpo.

Regla: el color funcional nunca comunica por sí solo. Los estados incluyen texto, forma o icono.

## 4. Tipografía

### Syne Variable — display

Uso: titulares, manifiestos, nombres de obra y logotipo digital. Su estructura irregular aporta vanguardia sin perder legibilidad.

- Pesos: 400–600.
- Tracking de titulares: `-0.055em` a `-0.025em`.
- Interlínea: 0.87–1.05.
- No usar en párrafos largos.

### Manrope Variable — lectura e interfaz

Uso: navegación, fichas, cuerpo, formularios y metadatos.

- Cuerpo: 16–19 px / 1.55–1.75.
- Metadatos: 11–13 px / 1.4, mayúsculas y tracking de 0.11–0.16 em.
- Peso mínimo en tamaños pequeños: 500.

### Serif editorial auxiliar

Georgia, únicamente en frases manifiesto o énfasis itálico. No es una tercera familia general.

## 5. Retícula y espacio

- Base espacial: múltiplos de 4 y 8 px.
- Gutters: móvil 20 px; tablet 32 px; escritorio 4vw con máximo práctico de 72 px.
- Separación de capítulos: 90–210 px, fluida por viewport.
- Ancho de lectura: 60–72 caracteres.
- Retícula escritorio: 12 columnas.
- Retícula tablet: 8 columnas.
- Retícula móvil: 4 columnas.

El espacio en blanco es una herramienta curatorial. No llenar huecos con decoración.

## 6. Imagen y obra

- La obra jamás recibe filtros cromáticos permanentes.
- Conservar la proporción original; `contain` para ficha, `cover` solo en acercamientos declarados.
- Fondos negros para reproducciones ya enmarcadas en negro.
- Todo acercamiento o recorte debe identificarse como detalle.
- Los textos alternativos describen composición y materia; no repetir el título.
- Mantener archivos maestros sin compresión destructiva para futuras ampliaciones.

## 7. Iconografía

- Sistema lineal de 1.5–1.7 px.
- Terminales redondeadas, geometría simple.
- Tamaños: 16, 20, 24 y 32 px.
- Área táctil mínima: 44 × 44 px.
- Lucide para interfaz; símbolo propio para redes cuando una marca no exista en Lucide.
- Nunca usar emoji como icono de navegación.

## 8. Movimiento

- Microinteracciones: 180–320 ms.
- Revelados editoriales: 450–650 ms.
- Easing principal: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Animar opacidad y transform; evitar width, height, top y left.
- Un máximo de dos focos de movimiento simultáneos.
- El desplazamiento horizontal siempre ofrece botones y scroll nativo.
- `prefers-reduced-motion` detiene video, marquee y transformaciones no esenciales.

## 9. Voz

La voz es directa, culta y material. Habla desde la obra sin explicar de más.

**Sí:** frases precisas, tensión, verbos activos, metáforas espaciales.

**No:** clichés de lujo, grandilocuencia institucional, biografías inventadas, jerga sin contenido.

Ejemplo correcto: “La superficie también habla.”

Ejemplo a evitar: “Descubre una experiencia artística única e inolvidable.”

## 10. Gobierno de marca

Este documento es la fuente de verdad. Cualquier excepción debe documentarse en `docs/decisions/` indicando contexto, duración y responsable. Los tokens implementados viven en `assets/design-tokens.json` y `src/app/globals.css`.
