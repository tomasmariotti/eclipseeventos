import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import logoSrc from "@/assets/eclipse.png";

const WHATSAPP = "https://wa.me/541161469371?text=Hola%20Eclipse%2C%20quiero%20cotizar%20mi%20evento";
const EASE = [0.22, 1, 0.36, 1] as const;

const NAV_LINKS = [
  ["Servicios", "#servicios"],
  ["Experiencia", "#experience"],
  ["Eventos", "#eventos"],
  ["Galería", "#galeria"],
  ["Reseñas", "#resenas"],
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${scrolled ? "py-2 sm:py-3" : "py-3 sm:py-6"}`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 transition-all duration-700 ${
            scrolled
              ? "rounded-full glass-strong glass-reflect mx-3 sm:mx-4 px-4 sm:px-5 py-2.5 sm:py-3 sm:mx-auto sm:max-w-5xl"
              : ""
          }`}
        >
          {/* Logo */}
          <a href="#top" className="group relative flex items-center gap-2.5">
            <img
              src={logoSrc}
              alt="Eclipse Eventos"
              className="h-8 sm:h-10 w-auto brightness-0 invert opacity-70 transition-all duration-700 group-hover:opacity-100"
            />
            <div className="absolute -inset-3 rounded-full bg-gold/0 transition-all duration-700 group-hover:bg-gold/5 blur-xl" />
          </a>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-8 text-[13px] text-foreground/40 md:flex">
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary hidden sm:inline-flex !py-2.5 !px-5 !text-[13px] !gap-2"
          >
            <span>Cotizar Evento</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/15 bg-white/[0.02] md:hidden transition-all duration-300"
            aria-label="Menú"
          >
            {mobileOpen ? (
              <X className="h-4 w-4 text-gold" />
            ) : (
              <Menu className="h-4 w-4 text-foreground/60" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[45] flex flex-col items-center justify-center gap-1 bg-[#050505]/98 backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map(([label, href], i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                className="py-3 text-xl font-display tracking-wide text-foreground/70 transition-colors hover:text-gold"
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: NAV_LINKS.length * 0.06, ease: EASE }}
              className="btn-primary mt-6 !px-10"
            >
              <span>Cotizar Evento</span>
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
