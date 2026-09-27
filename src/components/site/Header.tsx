"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { navItems } from "@/data/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
      <a aria-label="Ir al inicio" className="brand-link" href="#inicio" onClick={() => setOpen(false)}>
        <Logo className="brand-logo" />
      </a>

      <nav aria-label="Navegación principal" className="desktop-nav">
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>{item.label}</a>
        ))}
      </nav>

      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="menu-button"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
            aria-label="Navegación móvil"
            className="mobile-nav"
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            id="mobile-navigation"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">Índice</span>
            {navItems.map((item, index) => (
              <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>{item.label}
              </a>
            ))}
            <p>Una no galería<br />por NOUBODY.</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
