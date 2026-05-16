import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import logoSrc from "@/assets/eclipse.png";

const WHATSAPP = "https://wa.me/541161469371?text=Hola%20Eclipse%2C%20quiero%20cotizar%20mi%20evento";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${scrolled ? "py-3" : "py-6"}`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-700 ${
          scrolled
            ? "rounded-full glass-strong glass-reflect mx-4 px-5 py-3 sm:mx-auto sm:max-w-5xl"
            : ""
        }`}
      >
        {/* Logo with elegant hover glow */}
        <a href="#top" className="group relative flex items-center gap-2.5">
          <img
            src={logoSrc}
            alt="Eclipse Eventos"
            className="h-10 w-auto brightness-0 invert opacity-70 transition-all duration-700 group-hover:opacity-100"
          />
          {/* Subtle warm glow behind logo on hover */}
          <div className="absolute -inset-3 rounded-full bg-gold/0 transition-all duration-700 group-hover:bg-gold/5 blur-xl" />
        </a>

        {/* Nav links with cinematic underline */}
        <nav className="hidden items-center gap-8 text-[13px] text-foreground/40 md:flex">
          {[
            ["Servicios", "#servicios"],
            ["Experiencia", "#experience"],
            ["Eventos", "#eventos"],
            ["Galería", "#galeria"],
            ["Reseñas", "#resenas"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="nav-link"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA button with premium hover */}
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary hidden sm:inline-flex !py-2.5 !px-5 !text-[13px] !gap-2"
        >
          <span>Cotizar Evento</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.header>
  );
}
