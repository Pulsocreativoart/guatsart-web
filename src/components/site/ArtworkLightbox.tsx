"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

import type { Artwork } from "@/data/content";

type ArtworkLightboxProps = {
  artwork: Artwork | null;
  onClose: () => void;
};

export function ArtworkLightbox({ artwork, onClose }: ArtworkLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!artwork) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [artwork, onClose]);

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          animate={{ opacity: 1 }}
          aria-label={`Vista ampliada: ${artwork.title}`}
          aria-modal="true"
          className="lightbox"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
          role="dialog"
        >
          <button aria-label="Cerrar vista ampliada" className="lightbox-close" onClick={onClose} ref={closeRef} type="button">
            <X aria-hidden="true" />
          </button>
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="lightbox-content"
            exit={{ opacity: 0, scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lightbox-image">
              <Image alt={artwork.alt} fill priority sizes="90vw" src={artwork.image} />
            </div>
            <div className="lightbox-caption">
              <p>{artwork.series} · {artwork.year}</p>
              <h2>{artwork.title}</h2>
              <span>{artwork.medium}{artwork.dimensions ? ` · ${artwork.dimensions}` : ""}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
