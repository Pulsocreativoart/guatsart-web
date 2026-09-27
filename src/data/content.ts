export type Artwork = {
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

export const artworks: Artwork[] = [
  {
    id: "la-busqueda-y-el-sistema",
    title: "La Búsqueda y El Sistema",
    series: "Mancha urbana",
    medium: "Técnica mixta",
    year: "2021",
    image: "/media/la-busqueda-y-el-sistema.jpg",
    alt: "Obra abstracta urbana en tonos turquesa, coral y negro con grafismos gestuales.",
    accent: "#35d3d0",
  },
  {
    id: "milagrito-concedido",
    title: "Milagrito concedido",
    series: "Pulsión y materia",
    medium: "Técnica mixta sobre madera",
    year: "2021",
    image: "/media/milagrito-concedido.jpg",
    alt: "Corazón anatómico intervenido sobre madera, rodeado por líneas y ornamentos rosas.",
    accent: "#ed7352",
  },
  {
    id: "el-encargo-y-la-evidencia",
    title: "El encargo y la evidencia",
    series: "Mancha urbana",
    medium: "Técnica mixta",
    year: "2020",
    image: "/media/el-encargo-y-la-evidencia.jpg",
    alt: "Composición abstracta con trazos negros y amarillos sobre un fondo urbano terroso.",
    accent: "#f3d32d",
  },
  {
    id: "retumba-el-om",
    title: "Retumba el OM",
    series: "Manchas urbanas",
    medium: "Técnica mixta",
    year: "2021",
    image: "/media/retumba-el-om.jpg",
    alt: "Obra abstracta azul, amarilla y coral con un símbolo OM y caligrafía urbana.",
    accent: "#285bd7",
  },
  {
    id: "surrender",
    title: "Surrender",
    series: "Manchas urbanas",
    medium: "Técnica mixta",
    year: "2020",
    image: "/media/surrender.jpg",
    alt: "Composición abstracta con formas rosas, amarillas y turquesa sobre fondo gris texturizado.",
    accent: "#f23c87",
  },
  {
    id: "underground",
    title: "Underground",
    series: "No galería",
    medium: "Óleo sobre madera",
    year: "2020",
    dimensions: "100 × 60 cm",
    image: "/media/underground.jpg",
    alt: "Figura con traje sosteniendo un cráneo frente al emblema Underground, óleo sobre madera.",
    accent: "#de6f35",
  },
];

export const navItems = [
  { label: "Obra", href: "#obra" },
  { label: "Exhibiciones", href: "#exhibiciones" },
  { label: "Manifiesto", href: "#manifiesto" },
  { label: "Contacto", href: "#contacto" },
];

export const exhibitionNotes = [
  {
    index: "01",
    title: "La ciudad como palimpsesto",
    copy: "Capas, tachaduras y signos privados convierten la superficie en un territorio de memoria compartida.",
  },
  {
    index: "02",
    title: "Materia que contradice",
    copy: "La imagen no ilustra: disputa. Madera, gesto y color sostienen una tensión entre lo íntimo y lo público.",
  },
  {
    index: "03",
    title: "Fuera del cubo blanco",
    copy: "GÜATSART propone mirar sin protocolo: una no galería donde la obra ocupa el espacio y altera el recorrido.",
  },
];
