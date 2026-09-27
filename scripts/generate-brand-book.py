from pathlib import Path
from textwrap import wrap

from reportlab.lib.colors import HexColor, Color
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "guatsart-direccion-marca-ux-ui.pdf"
PAGE_W, PAGE_H = landscape(A4)

INK = HexColor("#0D0F0E")
INK_2 = HexColor("#111312")
PAPER = HexColor("#FAF9F5")
PAPER_2 = HexColor("#F1EFE8")
GRAY = HexColor("#5D625E")
MIST = HexColor("#9B9E99")
ORANGE = HexColor("#ED6F38")
CYAN = HexColor("#3BD8D3")
PINK = HexColor("#EE3F91")
WHITE_20 = Color(1, 1, 1, alpha=0.2)


def register_fonts():
    font_dir = Path("C:/Windows/Fonts")
    fonts = {
        "Brand": font_dir / "arial.ttf",
        "BrandBold": font_dir / "arialbd.ttf",
        "BrandItalic": font_dir / "ariali.ttf",
        "Editorial": font_dir / "georgiai.ttf",
    }
    for name, path in fonts.items():
        if path.exists():
            pdfmetrics.registerFont(TTFont(name, str(path)))
    return {
        "regular": "Brand" if "Brand" in pdfmetrics.getRegisteredFontNames() else "Helvetica",
        "bold": "BrandBold" if "BrandBold" in pdfmetrics.getRegisteredFontNames() else "Helvetica-Bold",
        "italic": "BrandItalic" if "BrandItalic" in pdfmetrics.getRegisteredFontNames() else "Helvetica-Oblique",
        "editorial": "Editorial" if "Editorial" in pdfmetrics.getRegisteredFontNames() else "Times-Italic",
    }


FONTS = register_fonts()


def image_fill(c, path, x, y, w, h, darken=0):
    image = ImageReader(str(path))
    iw, ih = image.getSize()
    scale = max(w / iw, h / ih)
    sw, sh = iw * scale, ih * scale
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, w, h)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(image, x + (w - sw) / 2, y + (h - sh) / 2, sw, sh, mask="auto")
    if darken:
        c.setFillColor(Color(0, 0, 0, alpha=darken))
        c.rect(x, y, w, h, stroke=0, fill=1)
    c.restoreState()


def image_contain(c, path, x, y, w, h, bg=None):
    if bg:
        c.setFillColor(bg)
        c.rect(x, y, w, h, stroke=0, fill=1)
    image = ImageReader(str(path))
    iw, ih = image.getSize()
    scale = min(w / iw, h / ih)
    sw, sh = iw * scale, ih * scale
    c.drawImage(image, x + (w - sw) / 2, y + (h - sh) / 2, sw, sh, mask="auto")


def fit_text(c, text, x, y, max_width, size, font=None, leading=None, color=INK, max_lines=None):
    font = font or FONTS["regular"]
    leading = leading or size * 1.35
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(candidate, font, size) <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    if max_lines:
        lines = lines[:max_lines]
    c.setFont(font, size)
    c.setFillColor(color)
    for idx, line in enumerate(lines):
        c.drawString(x, y - idx * leading, line)
    return y - len(lines) * leading


def label(c, text, x, y, color=GRAY):
    c.setFont(FONTS["bold"], 7.5)
    c.setFillColor(color)
    c.drawString(x, y, text.upper())


def footer(c, page, dark=False):
    color = PAPER if dark else INK
    c.setStrokeColor(Color(1, 1, 1, 0.25) if dark else Color(0.05, 0.06, 0.05, 0.2))
    c.line(38, 27, PAGE_W - 38, 27)
    c.setFont(FONTS["bold"], 6.8)
    c.setFillColor(color)
    c.drawString(38, 14, "GÜATSART - DIRECCION DE MARCA, UX Y UI")
    c.drawRightString(PAGE_W - 38, 14, f"{page:02d}")


def page_title(c, index, kicker, title, subtitle=None, dark=False):
    color = PAPER if dark else INK
    label(c, f"{index:02d} / {kicker}", 48, PAGE_H - 54, CYAN if dark else GRAY)
    fit_text(c, title, 48, PAGE_H - 100, 470, 40, FONTS["bold"], 39, color)
    if subtitle:
        fit_text(c, subtitle, 540, PAGE_H - 100, 250, 12, FONTS["regular"], 18, MIST if dark else GRAY)


def draw_mark(c, x, y, size, color=INK, opacity=1):
    c.saveState()
    c.setStrokeColor(Color(color.red, color.green, color.blue, opacity))
    c.setFillColor(Color(color.red, color.green, color.blue, opacity))
    sx = size / 64
    c.setLineWidth(3 * sx)
    path = c.beginPath()
    path.moveTo(x + 8 * sx, y + 32 * sx)
    path.curveTo(x + 8 * sx, y + 16 * sx, x + 18 * sx, y + 8 * sx, x + 32 * sx, y + 8 * sx)
    path.curveTo(x + 41 * sx, y + 8 * sx, x + 49 * sx, y + 12 * sx, x + 54 * sx, y + 19 * sx)
    path.lineTo(x + 43 * sx, y + 29 * sx)
    path.curveTo(x + 40 * sx, y + 24 * sx, x + 36 * sx, y + 22 * sx, x + 31 * sx, y + 22 * sx)
    path.curveTo(x + 24 * sx, y + 22 * sx, x + 20 * sx, y + 27 * sx, x + 20 * sx, y + 33 * sx)
    path.curveTo(x + 20 * sx, y + 39 * sx, x + 24 * sx, y + 44 * sx, x + 32 * sx, y + 44 * sx)
    path.curveTo(x + 36 * sx, y + 44 * sx, x + 39 * sx, y + 43 * sx, x + 42 * sx, y + 40 * sx)
    path.lineTo(x + 42 * sx, y + 35 * sx)
    path.lineTo(x + 31 * sx, y + 35 * sx)
    c.drawPath(path, stroke=1, fill=0)
    c.setLineWidth(1.5 * sx)
    c.line(x + 13 * sx, y + 51 * sx, x + 52 * sx, y + 12 * sx)
    c.circle(x + 25 * sx, y + 60 * sx, 2.5 * sx, stroke=0, fill=1)
    c.circle(x + 38 * sx, y + 60 * sx, 2.5 * sx, stroke=0, fill=1)
    c.restoreState()


def draw_document():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    c.setTitle("GÜATSART - Direccion de marca, UX y UI")
    c.setAuthor("GÜATSART / Proyecto digital")

    hero = ROOT / "public" / "media" / "hero-gallery-poster.jpg"
    underground = ROOT / "public" / "media" / "underground.jpg"
    search = ROOT / "public" / "media" / "la-busqueda-y-el-sistema.jpg"
    surrender = ROOT / "public" / "media" / "surrender.jpg"
    desktop = ROOT / "output" / "previews" / "desktop-hero.png"
    desktop_full = ROOT / "output" / "previews" / "desktop-full.png"
    tablet = ROOT / "output" / "previews" / "tablet-hero.png"
    mobile = ROOT / "output" / "previews" / "mobile-hero.png"
    mobile_full = ROOT / "output" / "previews" / "mobile-full.png"

    # 1 - Cover
    image_fill(c, hero, 0, 0, PAGE_W, PAGE_H, darken=0.62)
    draw_mark(c, 48, PAGE_H - 110, 52, PAPER)
    c.setFillColor(PAPER)
    c.setFont(FONTS["bold"], 56)
    c.drawString(48, 238, "GÜATSART")
    c.setFont(FONTS["regular"], 20)
    c.drawString(51, 205, "Una no galeria - por NOUBODY")
    c.setStrokeColor(CYAN)
    c.setLineWidth(2)
    c.line(48, 180, 335, 180)
    c.setStrokeColor(PINK)
    c.line(158, 174, 470, 174)
    label(c, "Direccion de marca / Auditoria UX / Sistema UI / Prototipo responsive", 51, 135, PAPER)
    c.setFont(FONTS["regular"], 9)
    c.drawString(51, 107, "Version 1.0 - 27 septiembre 2026")
    c.drawRightString(PAGE_W - 48, 42, "GUATEMALA")
    c.showPage()

    # 2 - Executive summary
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 2, "Resumen ejecutivo", "De plantilla visual a sistema curatorial.")
    fit_text(c, "La referencia de Canva aporta una atmosfera underground valiosa, pero conserva copy ficticio, datos genericos, una arquitectura lineal y ninguna ruta de exploracion. La solucion conserva los activos autorizados y los organiza como una experiencia propia para GÜATSART.", 48, 350, 350, 15, FONTS["regular"], 22, INK)
    cards = [
        ("CONSERVAR", "Video de sala, contraste negro/blanco, energia urbana y protagonismo de la obra.", CYAN),
        ("CORREGIR", "Navegacion, copy, accesibilidad, fichas, responsive, SEO y contacto real.", ORANGE),
        ("CONSTRUIR", "Identidad, narrativa, rail horizontal, lightbox, manifiesto, SMTP y base para CMS.", PINK),
    ]
    x = 435
    for idx, (title, body, accent) in enumerate(cards):
        y = 398 - idx * 116
        c.setFillColor(INK_2)
        c.rect(x, y - 82, 350, 96, stroke=0, fill=1)
        c.setFillColor(accent)
        c.rect(x, y - 82, 5, 96, stroke=0, fill=1)
        label(c, title, x + 24, y - 9, PAPER)
        fit_text(c, body, x + 24, y - 34, 295, 10.5, FONTS["regular"], 15, PAPER)
    footer(c, 2)
    c.showPage()

    # 3 - Audit
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 3, "Auditoria de referencia", "Lo que la referencia dice - y lo que aun no resuelve.", dark=True)
    issues = [
        ("P0", "Credibilidad", "Biografia y datos de contacto de plantilla; marcas sin relacion verificable."),
        ("P0", "Arquitectura", "Sin navegacion, rutas, fichas ni jerarquia entre obra, exhibicion y contacto."),
        ("P0", "Accesibilidad", "Sin alt descriptivo, skip link, foco, reduced motion o controles de teclado."),
        ("P1", "Experiencia", "Secuencia vertical sin ampliacion, comparacion ni continuidad entre piezas."),
        ("P1", "Operacion", "Sin SEO propio, formulario funcional, variables seguras o flujo Git."),
    ]
    for idx, (priority, title, body) in enumerate(issues):
        y = 390 - idx * 62
        c.setStrokeColor(WHITE_20)
        c.line(48, y - 39, 515, y - 39)
        label(c, priority, 48, y, ORANGE if priority == "P0" else CYAN)
        c.setFont(FONTS["bold"], 12)
        c.setFillColor(PAPER)
        c.drawString(93, y - 3, title)
        fit_text(c, body, 195, y, 315, 9.5, FONTS["regular"], 13, MIST)
    image_contain(c, underground, 555, 70, 235, 390, INK_2)
    label(c, "Activo autorizado / Underground", 568, 86, PAPER)
    footer(c, 3, dark=True)
    c.showPage()

    # 4 - Brand platform
    c.setFillColor(ORANGE)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 4, "Plataforma de marca", "Rigor editorial por fuera. Gesto indocil por dentro.")
    c.setFont(FONTS["editorial"], 39)
    c.setFillColor(INK)
    c.drawString(48, 332, "Una no galeria.")
    fit_text(c, "GÜATSART es un territorio de friccion: calle y sala, impulso y archivo, orden y ruptura. La identidad no domestica la obra; construye un marco para que respire.", 48, 285, 360, 15, FONTS["regular"], 22, INK)
    pillars = [("01", "FRICCION"), ("02", "PORTAL ABIERTO"), ("03", "ARCHIVO VIVO"), ("04", "PRESENCIA MATERIAL")]
    for idx, (number, title) in enumerate(pillars):
        x = 455 + (idx % 2) * 170
        y = 330 - (idx // 2) * 125
        c.setStrokeColor(Color(0.05, 0.06, 0.05, 0.38))
        c.rect(x, y - 55, 145, 90, stroke=1, fill=0)
        label(c, number, x + 14, y + 14, INK)
        fit_text(c, title, x + 14, y - 10, 115, 13, FONTS["bold"], 16, INK)
    draw_mark(c, 650, 46, 145, INK, 0.16)
    footer(c, 4)
    c.showPage()

    # 5 - Logo
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 5, "Logotipo", "Un portal abierto atravesado por la interferencia.")
    draw_mark(c, 60, 230, 170, INK)
    c.setFont(FONTS["bold"], 34)
    c.setFillColor(INK)
    c.drawString(250, 295, "GÜATSART")
    fit_text(c, "La G abierta permite entrada y salida. La diagonal interrumpe el orden. Los dos puntos convierten la dieresis en una firma reconocible.", 250, 255, 250, 12.5, FONTS["regular"], 18, GRAY)
    c.setFillColor(INK)
    c.rect(550, 200, 240, 200, stroke=0, fill=1)
    draw_mark(c, 625, 247, 90, PAPER)
    label(c, "Version invertida", 565, 218, PAPER)
    specs = ["AREA LIBRE 4X", "MINIMO 120 PX", "SIMBOLO 24 PX", "SIN EFECTOS"]
    for idx, item in enumerate(specs):
        x = 60 + idx * 182
        c.setStrokeColor(Color(0.05, 0.06, 0.05, 0.25))
        c.line(x, 118, x + 145, 118)
        label(c, item, x, 97, INK)
    footer(c, 5)
    c.showPage()

    # 6 - Color
    c.setFillColor(PAPER_2)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 6, "Color", "Base sobria. Acentos extraidos de la energia material de la obra.")
    swatches = [
        (INK, "CARBON ARCHIVO", "#0D0F0E", PAPER),
        (PAPER, "HUESO PAPEL", "#FAF9F5", INK),
        (ORANGE, "NARANJA MATERIA", "#ED6F38", INK),
        (CYAN, "CIAN PULSO", "#3BD8D3", INK),
        (PINK, "ROSA SEÑAL", "#EE3F91", INK),
    ]
    widths = [210, 165, 155, 155, 155]
    x = 48
    for idx, (color, name, value, text_color) in enumerate(swatches):
        w = widths[idx]
        c.setFillColor(color)
        c.rect(x, 183, w, 205, stroke=0, fill=1)
        label(c, name, x + 13, 208, text_color)
        c.setFont(FONTS["regular"], 9)
        c.setFillColor(text_color)
        c.drawString(x + 13, 193, value)
        x += w
    fit_text(c, "Contraste: Hueso/Carbon 18.26:1 - Naranja/Carbon 6.35:1 - Cian/Carbon 10.94:1 - Rosa/Carbon 5.27:1. Naranja sobre Hueso es decorativo, no texto de cuerpo.", 48, 135, 730, 11, FONTS["regular"], 17, GRAY)
    footer(c, 6)
    c.showPage()

    # 7 - Type and voice
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 7, "Tipografia y voz", "Syne para presencia. Manrope para precision. Serif solo para tension editorial.", dark=True)
    c.setFillColor(PAPER)
    c.setFont(FONTS["bold"], 54)
    c.drawString(48, 330, "La superficie")
    c.drawString(48, 274, "tambien habla.")
    label(c, "Display / Syne Variable / 400-600", 51, 238, CYAN)
    c.setFont(FONTS["editorial"], 34)
    c.drawString(480, 338, "Esto no es una galeria.")
    fit_text(c, "La voz es directa, culta y material. Habla desde la obra sin explicar de mas. Evita los cliches de lujo, la grandilocuencia institucional y cualquier dato no verificado.", 482, 287, 295, 13, FONTS["regular"], 19, MIST)
    c.setStrokeColor(WHITE_20)
    c.line(48, 170, PAGE_W - 48, 170)
    label(c, "SI", 48, 141, CYAN)
    fit_text(c, "Frases precisas, verbos activos, metaforas espaciales y copy que abre preguntas.", 84, 141, 290, 10.5, FONTS["regular"], 15, PAPER)
    label(c, "NO", 430, 141, ORANGE)
    fit_text(c, "Experiencias unicas, lenguaje de plantilla, promesas vacias o biografias inventadas.", 470, 141, 305, 10.5, FONTS["regular"], 15, PAPER)
    footer(c, 7, dark=True)
    c.showPage()

    # 8 - UX flow
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 8, "Arquitectura UX", "Entrar, orientarse, explorar, profundizar, tomar posicion y conversar.")
    steps = [
        ("01", "UMBRAL", "Video + marca"),
        ("02", "CONTEXTO", "Una no galeria"),
        ("03", "EXPLORACION", "Rail horizontal"),
        ("04", "PROFUNDIDAD", "Lightbox + detalle"),
        ("05", "POSICION", "Manifiesto"),
        ("06", "CONVERSION", "Contacto SMTP"),
    ]
    x0, y0 = 50, 290
    for idx, (num, title, desc) in enumerate(steps):
        x = x0 + idx * 126
        c.setFillColor(INK if idx not in (2, 4) else ORANGE)
        c.circle(x + 38, y0, 34, stroke=0, fill=1)
        c.setFillColor(PAPER if idx not in (2, 4) else INK)
        c.setFont(FONTS["bold"], 11)
        c.drawCentredString(x + 38, y0 - 4, num)
        if idx < len(steps) - 1:
            c.setStrokeColor(MIST)
            c.line(x + 72, y0, x + 126, y0)
        label(c, title, x, y0 - 62, INK)
        fit_text(c, desc, x, y0 - 84, 100, 9, FONTS["regular"], 13, GRAY)
    c.setFillColor(INK_2)
    c.rect(48, 76, 744, 78, stroke=0, fill=1)
    statements = ["SCROLL VERTICAL NATIVO", "1 CAPITULO HORIZONTAL", "TECLADO + TACTIL", "REDUCED MOTION", "FOCO VISIBLE"]
    for idx, text in enumerate(statements):
        label(c, text, 66 + idx * 145, 111, CYAN if idx % 2 == 0 else PAPER)
    footer(c, 8)
    c.showPage()

    # 9 - Responsive views
    c.setFillColor(PAPER_2)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 9, "Responsive", "Tres composiciones, una misma jerarquia.")
    image_contain(c, desktop, 48, 80, 420, 300, INK)
    image_contain(c, tablet, 495, 80, 145, 330, INK)
    image_contain(c, mobile, 660, 80, 125, 330, INK)
    label(c, "Escritorio 1440", 48, 57, INK)
    label(c, "Tablet 834", 495, 57, INK)
    label(c, "Movil 390", 660, 57, INK)
    footer(c, 9)
    c.showPage()

    # 10 - UI and art
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 10, "Sistema UI", "La interfaz acompaña. La obra conserva sus bordes.", dark=True)
    image_contain(c, search, 48, 94, 270, 305, INK_2)
    image_fill(c, surrender, 342, 94, 210, 305, darken=0)
    c.setFillColor(PAPER)
    c.rect(576, 94, 216, 305, stroke=0, fill=1)
    ui_rules = [
        ("44 PX", "Target minimo"),
        ("180-320 MS", "Microinteraccion"),
        ("1.5 PX", "Trazo de icono"),
        ("60-72 CH", "Ancho de lectura"),
        ("4 / 8 PX", "Ritmo espacial"),
    ]
    for idx, (value, name) in enumerate(ui_rules):
        y = 357 - idx * 51
        c.setFont(FONTS["bold"], 15)
        c.setFillColor(INK)
        c.drawString(594, y, value)
        label(c, name, 690, y + 2, GRAY)
        c.setStrokeColor(Color(0.05, 0.06, 0.05, 0.17))
        c.line(594, y - 13, 773, y - 13)
    footer(c, 10, dark=True)
    c.showPage()

    # 11 - Prototype
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 11, "Prototipo funcional", "Next.js, contenido desacoplado y pruebas reales en tres viewports.")
    # Keep the viewport evidence below the multi-line heading so the title
    # remains fully legible in the final landscape layout.
    image_contain(c, desktop_full, 48, 67, 245, 300, PAPER)
    image_contain(c, mobile_full, 320, 67, 125, 300, PAPER)
    c.setFillColor(INK_2)
    c.rect(485, 74, 307, 332, stroke=0, fill=1)
    capabilities = [
        "Hero en video con poster local",
        "Galeria horizontal con snap y botones",
        "Lightbox con Escape y foco restaurado",
        "Copy curatorial sin datos inventados",
        "Formulario validado y SMTP preparado",
        "SEO, Open Graph y JSON-LD",
        "Playwright, axe, lint, tipos y build",
    ]
    label(c, "Capacidades entregadas", 510, 374, CYAN)
    for idx, item in enumerate(capabilities):
        y = 337 - idx * 39
        c.setFillColor(ORANGE)
        c.circle(514, y + 3, 3, stroke=0, fill=1)
        fit_text(c, item, 528, y + 7, 235, 10.2, FONTS["regular"], 14, PAPER)
    footer(c, 11)
    c.showPage()

    # 12 - Architecture
    c.setFillColor(PAPER_2)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 12, "Arquitectura tecnica", "Vercel para Next.js. cPanel para dominio, DNS y SMTP.")
    nodes = [
        (70, 290, 150, 78, "GITHUB", "Fuente y colaboracion"),
        (345, 290, 150, 78, "VERCEL", "App + API + previews"),
        (620, 352, 150, 78, "CPANEL DNS", "Dominio y HTTPS"),
        (620, 228, 150, 78, "CPANEL SMTP", "Correo del dominio"),
    ]
    for idx, (x, y, w, h, title, desc) in enumerate(nodes):
        c.setFillColor(INK if idx != 1 else ORANGE)
        c.rect(x, y, w, h, stroke=0, fill=1)
        label(c, title, x + 16, y + 49, PAPER if idx != 1 else INK)
        fit_text(c, desc, x + 16, y + 28, w - 32, 9, FONTS["regular"], 12, PAPER if idx != 1 else INK)
    c.setStrokeColor(GRAY)
    c.setLineWidth(1.2)
    c.line(220, 329, 345, 329)
    c.line(495, 329, 620, 391)
    c.line(495, 329, 620, 267)
    fit_text(c, "Ruta secundaria: cPanel con Node.js 22 puede ejecutar el servidor completo. Si el hosting solo ofrece Apache/PHP, el export estatico requiere un endpoint PHP separado y pierde funciones de servidor.", 70, 150, 700, 11, FONTS["regular"], 17, GRAY)
    footer(c, 12)
    c.showPage()

    # 13 - Roadmap and close
    c.setFillColor(ORANGE)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    page_title(c, 13, "Siguiente etapa", "El sistema esta listo. Faltan decisiones de contenido y publicacion.")
    columns = [
        ("CLIENTE", ["Biografia factual", "Correo y telefono", "Instagram oficial", "Fichas de obra", "Politica de privacidad"]),
        ("PRODUCCION", ["Dominio y DNS", "Credenciales SMTP", "Preview aprobado", "Analitica con consentimiento", "Monitoreo y rollback"]),
        ("EVOLUCION", ["CMS o editor IA", "Rutas por obra", "Archivo de exhibiciones", "Disponibilidad/precios", "Prensa y descargas"]),
    ]
    for idx, (title, items) in enumerate(columns):
        x = 48 + idx * 255
        c.setStrokeColor(Color(0.05, 0.06, 0.05, 0.35))
        c.line(x, 382, x + 215, 382)
        label(c, title, x, 360, INK)
        for item_idx, item in enumerate(items):
            y = 325 - item_idx * 42
            c.setFillColor(INK)
            c.rect(x, y + 1, 8, 8, stroke=1, fill=0)
            fit_text(c, item, x + 22, y + 10, 185, 11, FONTS["regular"], 15, INK)
    draw_mark(c, PAGE_W - 165, 42, 118, INK, 0.18)
    c.setFont(FONTS["bold"], 19)
    c.setFillColor(INK)
    c.drawString(48, 70, "GÜATSART")
    c.setFont(FONTS["editorial"], 16)
    c.drawString(157, 70, "Una no galeria.")
    footer(c, 13)
    c.showPage()

    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    draw_document()
