import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Reveal } from "@/components/ui/Reveal";
import { artworks, exhibitionNotes } from "@/data/content";

import { ArtworkRail } from "./ArtworkRail";
import { ContactForm } from "./ContactForm";
import { Header } from "./Header";
import { Hero } from "./Hero";

export function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <Header />
      <main id="main-content">
        <Hero />

        <section aria-labelledby="intro-heading" className="intro-section">
          <div aria-hidden="true" className="marquee">
            <div>
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index}>GESTO · MATERIA · CIUDAD · ARCHIVO · </span>
              ))}
            </div>
          </div>
          <Reveal className="intro-grid">
            <div>
              <p className="eyebrow">Una no galería</p>
              <h2 id="intro-heading">No venimos a<br />decorar paredes.</h2>
            </div>
            <div className="intro-copy">
              <p className="lead">GÜATSART es un territorio de fricción: entre la calle y la sala, entre el impulso y el archivo.</p>
              <p>La práctica de NOUBODY reúne materia, caligrafía y relato para construir imágenes que no piden permiso. Aquí, la obra se mira de cerca, se recorre y se deja hablar.</p>
              <a className="text-link" href="#manifiesto">Leer el manifiesto <ArrowIcon /></a>
            </div>
          </Reveal>
        </section>

        <ArtworkRail />

        <section aria-labelledby="exhibition-heading" className="exhibition-section" id="exhibiciones">
          <div className="section-heading exhibition-heading">
            <div>
              <p className="eyebrow">02 · Exhibiciones</p>
              <h2 id="exhibition-heading">Ensayos para<br />mirar distinto.</h2>
            </div>
            <p>Una lectura curatorial provisional sobre los gestos, símbolos y tensiones que atraviesan la obra.</p>
          </div>

          <div className="exhibition-layout">
            <Reveal className="exhibition-main">
              <Image alt={artworks[5].alt} fill sizes="(max-width: 767px) 100vw, 58vw" src={artworks[5].image} />
              <span>NOUBODY · Underground</span>
            </Reveal>
            <div className="exhibition-notes">
              {exhibitionNotes.map((note, index) => (
                <Reveal className="exhibition-note" delay={index * 0.08} key={note.index}>
                  <span>{note.index}</span>
                  <h3>{note.title}</h3>
                  <p>{note.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Detalle inmersivo de una obra" className="immersion-section">
          <div className="immersion-copy">
            <p className="eyebrow">Acercamiento · 200%</p>
            <blockquote>“La ciudad escribe encima de nosotros. La obra devuelve el gesto.”</blockquote>
          </div>
          <div className="triptych" role="img" aria-label={artworks[4].alt}>
            <div style={{ backgroundImage: `url(${artworks[4].image})` }} />
            <div style={{ backgroundImage: `url(${artworks[4].image})` }} />
            <div style={{ backgroundImage: `url(${artworks[4].image})` }} />
          </div>
        </section>

        <section aria-labelledby="manifest-heading" className="manifest-section" id="manifiesto">
          <Reveal className="manifest-title">
            <p className="eyebrow">03 · Manifiesto</p>
            <h2 id="manifest-heading">Esto no es<br /><em>una galería.</em></h2>
          </Reveal>
          <div className="manifest-body">
            <Reveal>
              <p>Es un lugar para la interferencia. Un archivo que respira, se contradice y cambia con cada montaje.</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>No buscamos neutralidad. La sala, la pantalla y la calle son materia; el espectador también.</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>GÜATSART existe para sostener procesos, abrir conversaciones y dejar que la obra conserve sus bordes.</p>
            </Reveal>
          </div>
          <div aria-hidden="true" className="manifest-mark"><Logo compact /></div>
        </section>

        <section aria-labelledby="contact-heading" className="contact-section" id="contacto">
          <div className="contact-intro">
            <p className="eyebrow">04 · Contacto</p>
            <h2 id="contact-heading">Hagamos espacio<br />para una idea.</h2>
            <p>Adquisiciones, exhibiciones, colaboraciones y prensa.</p>
            <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@reallygreatsite.com"}`}>
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@reallygreatsite.com"}<ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        <Logo className="footer-logo" />
        <div>
          <p>GÜATSART<br />Una no galería.</p>
          <a aria-label="Instagram — perfil pendiente" href="#contacto" title="Perfil pendiente de configurar"><InstagramIcon /></a>
        </div>
        <div className="footer-meta">
          <p>© {new Date().getFullYear()} GÜATSART</p>
          <a href="#inicio">Volver arriba <ArrowIcon direction="up" /></a>
        </div>
      </footer>
    </>
  );
}
