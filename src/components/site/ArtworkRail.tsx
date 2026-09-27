"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type CSSProperties } from "react";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { artworks, type Artwork } from "@/data/content";

import { ArtworkLightbox } from "./ArtworkLightbox";

export function ArtworkRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Artwork | null>(null);

  const move = useCallback((direction: -1 | 1) => {
    railRef.current?.scrollBy({
      behavior: "smooth",
      left: direction * Math.min(window.innerWidth * 0.78, 920),
    });
  }, []);

  return (
    <>
      <section aria-labelledby="artwork-heading" className="artwork-section" id="obra">
        <div className="section-heading artwork-heading">
          <div>
            <p className="eyebrow">01 · Obra seleccionada</p>
            <h2 id="artwork-heading">La superficie<br />también habla.</h2>
          </div>
          <div className="rail-controls" role="group" aria-label="Controles de la galería">
            <button aria-label="Obra anterior" onClick={() => move(-1)} type="button">
              <ArrowIcon direction="left" />
            </button>
            <button aria-label="Obra siguiente" onClick={() => move(1)} type="button">
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        <div aria-label="Obras seleccionadas" className="artwork-rail" ref={railRef} tabIndex={0}>
          {artworks.map((artwork, index) => (
            <article className="artwork-card" key={artwork.id} style={{ "--art-accent": artwork.accent } as CSSProperties}>
              <button aria-label={`Ampliar ${artwork.title}`} className="artwork-image-button" onClick={() => setSelected(artwork)} type="button">
                <span aria-hidden="true" className="artwork-index">{String(index + 1).padStart(2, "0")}</span>
                <Image alt={artwork.alt} fill loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 767px) 86vw, 64vw" src={artwork.image} />
                <span className="artwork-view">Ver obra <ArrowIcon /></span>
              </button>
              <div className="artwork-info">
                <div>
                  <p>{artwork.series}</p>
                  <h3>{artwork.title}</h3>
                </div>
                <p>{artwork.year}<br />{artwork.medium}</p>
              </div>
            </article>
          ))}
          <div aria-hidden="true" className="rail-end">
            <span>Fin del recorrido</span>
            <strong>06</strong>
          </div>
        </div>
      </section>
      <ArtworkLightbox artwork={selected} onClose={() => setSelected(null)} />
    </>
  );
}
