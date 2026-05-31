import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Play,
  Phone,
  Instagram,
  Mail,
  Star,
  Sparkles,
  Camera,
  Users,
  Award,
  Flame,
  Zap,
  Music,
  PartyPopper,
  Sliders,
} from "lucide-react";

import heroImg from "@/assets/hero-sparks.jpg";
import weddingImg from "@/assets/event-wedding.jpg";
import djImg from "@/assets/event-dj.jpg";
import corporateImg from "@/assets/event-corporate.jpg";
import gradImg from "@/assets/event-grad.jpg";
import sparksImg from "@/assets/service-sparks.jpg";
import confettiImg from "@/assets/service-confetti.jpg";
import consoleImg from "@/assets/service-console.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import logoSrc from "@/assets/eclipse.png";

const WHATSAPP = "https://wa.me/541161469371?text=Hola%20Eclipse%2C%20quiero%20cotizar%20mi%20evento";
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 sm:mb-6 inline-flex items-center gap-3">
      <div className="h-[1px] w-6 bg-gold/40" />
      <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.4em] text-gold/70 uppercase">{children}</span>
    </div>
  );
}

/* ── Ambient section particles — hidden on mobile ── */
function AmbientParticles({ count = 8 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden hidden sm:block">
      {Array.from({ length: count }, (_, i) => {
        const left = `${10 + (i * 137.5) % 80}%`;
        const top = `${10 + (i * 53) % 80}%`;
        const size = 1 + (i % 2);
        return (
          <span
            key={i}
            className="absolute rounded-full animate-ambient"
            style={{
              left,
              top,
              width: size,
              height: size,
              background: "var(--gold)",
              boxShadow: `0 0 ${size * 6}px var(--gold)`,
              opacity: 0.2,
              animationDelay: `${i * 1.3}s`,
              ["--ambient-dur" as string]: `${8 + i * 1.5}s`,
              ["--dx" as string]: `${((i % 3) - 1) * 30}px`,
              ["--dy" as string]: `${-40 - (i % 4) * 20}px`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Services ── */
export function Services() {
  const services = [
    { icon: Sparkles, title: "Chispas Frías", tag: "Fuentes de chispas frías", desc: "Fuentes de hasta 2 metros para entradas, primeros bailes y momentos inolvidables.", img: sparksImg },
    { icon: PartyPopper, title: "Papel Metalizado", tag: "Cañones de confetti", desc: "Explosiones perfectas para drops, cierres y momentos de máxima energía.", img: confettiImg },
    { icon: Sliders, title: "Consolas Inalámbricas", tag: "Control DMX Profesional", desc: "Control profesional total para ejecutar cada efecto con precisión.", img: consoleImg },
  ];
  return (
    <section id="servicios" className="relative py-20 sm:py-32">
      <AmbientParticles count={6} />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="mb-10 sm:mb-16 max-w-3xl">
          <motion.div variants={fadeUp}><SectionTag>Servicios</SectionTag></motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(1.8rem,5vw,3.8rem)] leading-[1.08]">
            Tecnología de show.{" "}<span className="text-gradient-gold">Ejecución impecable.</span>
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.article key={s.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="card-cinematic group relative flex flex-col overflow-hidden rounded-2xl border border-gold/10 bg-[#0B0B0B]"
            >
              <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden img-cinematic">
                <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />
                <div className="absolute left-4 top-4 sm:left-5 sm:top-5 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full glass glass-reflect transition-all duration-700 group-hover:shadow-[0_0_20px_rgba(201,169,110,0.15)]">
                  <s.icon className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
                </div>
              </div>
              <div className="relative z-[2] flex flex-1 flex-col p-5 sm:p-7">
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold/50">{s.tag}</div>
                <h3 className="mt-2 font-display text-xl sm:text-2xl">{s.title}</h3>
                <p className="mt-2 sm:mt-3 text-sm text-muted-foreground font-light leading-relaxed">{s.desc}</p>
                <div className="mt-5 sm:mt-6 flex items-center gap-2 text-xs tracking-widest text-foreground/50 transition-all duration-700 group-hover:text-gold group-hover:gap-3">
                  SABER MÁS <ArrowRight className="h-3.5 w-3.5 transition-transform duration-700 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Experience Grid ── */
export function Experience() {
  const items = [
    { icon: Sparkles, t: "Entradas deslumbrantes" },
    { icon: Camera, t: "Videos cinemáticos" },
    { icon: Star, t: "Fotografía premium" },
    { icon: Users, t: "Reacciones reales" },
    { icon: Music, t: "Experiencia nivel show" },
    { icon: Zap, t: "Contenido para redes" },
  ];
  return (
    <section id="experience" className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img src={djImg} alt="" className="h-full w-full object-cover opacity-[0.12] sm:opacity-15 ken-burns-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/85 sm:via-[#050505]/90 to-[#050505]" />
      </div>
      <AmbientParticles count={5} />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="mx-auto max-w-4xl text-center">
          <motion.div variants={fadeUp}><SectionTag>La Experiencia</SectionTag></motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(1.8rem,5vw,3.8rem)] leading-[1.08]">
            No es solo un efecto.{" "}<span className="text-gradient-gold">Es el momento que todos van a grabar.</span>
          </motion.h2>
        </motion.div>
        <div className="mt-12 sm:mt-20 grid grid-cols-2 gap-[1px] overflow-hidden rounded-2xl border border-gold/10 bg-gold/10 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div key={it.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative flex flex-col gap-3 sm:gap-4 bg-[#0B0B0B] p-5 sm:p-8 transition-all duration-700 hover:bg-[#0e0e0e]"
            >
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gold/20 bg-gold/5 transition-all duration-700 group-hover:border-gold/40 group-hover:bg-gold group-hover:text-[#050505] group-hover:shadow-[0_0_24px_rgba(201,169,110,0.25)]">
                <it.icon className="h-4 w-4 sm:h-5 sm:w-5 text-gold transition-colors duration-700 group-hover:text-[#050505]" />
              </div>
              <p className="font-display text-base sm:text-xl leading-tight">{it.t}</p>
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-gold transition-all duration-1000 ease-[cubic-bezier(0.4,0,0,1)] group-hover:w-full" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(ellipse at 30% 80%, rgba(201,169,110,0.04), transparent 60%)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Events Grid ── */
export function Events() {
  const events = [
    { name: "Quinceañeras", img: heroImg, span: "md:col-span-2 md:row-span-2" },
    { name: "Bodas", img: weddingImg },
    { name: "DJs & Clubs", img: djImg },
    { name: "Graduaciones", img: gradImg },
    { name: "Shows y Escenarios", img: g3, span: "md:col-span-2" },
    { name: "Corporativo", img: corporateImg },
    { name: "Eventos Privados", img: g4 },
  ];
  return (
    <section id="eventos" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="mb-10 sm:mb-16 max-w-3xl">
          <motion.div variants={fadeUp}><SectionTag>Eventos</SectionTag></motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(1.8rem,5vw,3.8rem)] leading-[1.08]">
            Cada celebración merece su propio{" "}<span className="text-gradient-gold">momento cinemático.</span>
          </motion.h2>
        </motion.div>
        <div className="grid auto-rows-[200px] sm:auto-rows-[240px] grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
          {events.map((e, i) => (
            <motion.a href={WHATSAPP} target="_blank" rel="noreferrer" key={e.name}
              initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-xl vignette ${e.span ?? ""}`}
            >
              <img src={e.img} alt={e.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent transition-opacity duration-700 group-hover:from-[#050505]/90" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(ellipse at center bottom, rgba(201,169,110,0.1), transparent 60%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 transition-transform duration-700 group-hover:-translate-y-1">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-gold/70 opacity-0 transition-all duration-700 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">Consultar →</div>
                <div className="font-display text-lg sm:text-xl md:text-2xl">{e.name}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Gallery ── */
export function Gallery() {
  const imgs = [
    { src: g2, h: "row-span-2", alt: "Lluvia de confetti metalizado" },
    { src: g1, h: "", alt: "Show de fuegos artificiales" },
    { src: g3, h: "", alt: "Show pirotécnico nocturno" },
    { src: weddingImg, h: "row-span-2", alt: "Chispas frías en boda" },
    { src: g4, h: "", alt: "Explosión de confetti" },
  ];
  return (
    <section id="galeria" className="relative py-20 sm:py-32">
      <AmbientParticles count={4} />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="mb-10 sm:mb-16 max-w-3xl">
          <motion.div variants={fadeUp}><SectionTag>Galería</SectionTag></motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(1.8rem,5vw,3.8rem)] leading-[1.08]">
            Momentos reales.{" "}<span className="text-gradient-gold">Emoción real.</span>
          </motion.h2>
        </motion.div>
        <div className="grid auto-rows-[200px] sm:auto-rows-[220px] grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {imgs.map((im, i) => (
            <motion.figure key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
              className={`img-cinematic group relative overflow-hidden rounded-xl vignette ${im.h}`}
            >
              <img src={im.src} alt={im.alt} loading="lazy" className="h-full w-full object-cover transition-all duration-[1500ms] group-hover:scale-110" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reviews ── */
export function Reviews() {
  const reviews = [
    { stars: 5, text: "Las chispas frías hicieron que la entrada de mi hija pareciera un show profesional. Todos quedaron sin palabras.", name: "Camila R.", role: "Quinceañera", initials: "CR" },
    { stars: 5, text: "El momento de la caída del confetti fue explosivo. Los videos salieron increíbles, todos me siguen escribiendo.", name: "Lautaro G.", role: "DJ — Club", initials: "LG" },
    { stars: 5, text: "Profesionales, puntuales y el resultado superó ampliamente nuestras expectativas. Los volveríamos a contratar sin dudar.", name: "Agustina & Franco", role: "Boda", initials: "AF" },
  ];
  return (
    <section id="resenas" className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 -z-10 opacity-20" style={{ background: "var(--gradient-radial-gold)" }} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[40%] rounded-full opacity-[0.04] blur-[60px] sm:blur-[100px] animate-warm-pulse" style={{ background: "var(--gold)" }} />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="mb-10 sm:mb-16 max-w-3xl">
          <motion.div variants={fadeUp}><SectionTag>Testimonios</SectionTag></motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(1.8rem,5vw,3.8rem)] leading-[1.08]">
            Lo que dicen quienes{" "}<span className="text-gradient-gold">vivieron Eclipse.</span>
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure key={r.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative flex flex-col gap-5 sm:gap-6 rounded-2xl glass glass-reflect p-6 sm:p-8 transition-all duration-700 hover:border-gold/30 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(201,169,110,0.06)]"
            >
              <div className="flex gap-1">
                {Array.from({ length: r.stars }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-gold text-gold drop-shadow-[0_0_4px_rgba(201,169,110,0.3)]" />
                ))}
              </div>
              <blockquote className="text-sm sm:text-base leading-relaxed text-foreground/80 font-light">"{r.text}"</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-gold/10 pt-4 sm:pt-5">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-gold text-xs sm:text-sm font-bold text-[#050505] shadow-[0_0_16px_rgba(201,169,110,0.2)] transition-shadow duration-700 group-hover:shadow-[0_0_24px_rgba(201,169,110,0.35)]">{r.initials}</div>
                <div>
                  <div className="font-medium text-sm">{r.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ── */
export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-40">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img src={heroImg} alt="" className="h-full w-full object-cover opacity-[0.15] sm:opacity-20 ken-burns-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/75 sm:via-[#050505]/80 to-[#050505]" />
        <div className="absolute inset-0 opacity-20 sm:opacity-30" style={{ background: "var(--gradient-radial-gold)" }} />
      </div>
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50%] w-[35%] rounded-full opacity-[0.06] blur-[80px] sm:blur-[120px] animate-breathe" style={{ background: "var(--gold)" }} />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ show: { transition: { staggerChildren: 0.15 } } }}>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1.08] text-cinema">
            Tu evento merece{" "}<span className="text-gradient-gold">un momento cinemático.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 sm:mt-8 max-w-xl text-base sm:text-lg text-muted-foreground font-light">
            Transformá cada entrada en una experiencia que será grabada, compartida y recordada para siempre.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-primary animate-pulse-glow">
              <span>Diseñar Mi Entrada</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-secondary">
              <Phone className="h-4 w-4 text-gold" />
              <span>Contactar por WhatsApp</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Footer ── */
export function Footer() {
  return (
    <footer className="relative border-t border-gold/8 py-12 sm:py-16">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-[50%] rounded-full opacity-[0.03] blur-[60px]" style={{ background: "var(--gold)" }} />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-6 md:grid-cols-3">
        <div>
          <img src={logoSrc} alt="Eclipse Eventos" className="h-10 sm:h-12 w-auto brightness-0 invert opacity-70" />
          <p className="mt-4 sm:mt-5 max-w-xs text-sm text-muted-foreground font-light">
            Producción visual premium para eventos. Diseñando momentos que se sienten como escenas de película.
          </p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-gold/60">Contacto</div>
          <ul className="mt-4 sm:mt-5 space-y-3 text-sm">
            <li><a href={WHATSAPP} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-foreground/70 transition-all duration-500 hover:text-gold hover:gap-4"><Phone className="h-4 w-4 text-gold/60 transition-all duration-500 group-hover:text-gold group-hover:drop-shadow-[0_0_6px_rgba(201,169,110,0.4)]" /> +54 11 6146-9371</a></li>
            <li><a href="https://instagram.com/eclipse.eventosss" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-foreground/70 transition-all duration-500 hover:text-gold hover:gap-4"><Instagram className="h-4 w-4 text-gold/60 transition-all duration-500 group-hover:text-gold group-hover:drop-shadow-[0_0_6px_rgba(201,169,110,0.4)]" /> @eclipse.eventosss</a></li>
            <li><a href="mailto:eclipseeventos@gmail.com" className="group inline-flex items-center gap-3 text-foreground/70 transition-all duration-500 hover:text-gold hover:gap-4"><Mail className="h-4 w-4 text-gold/60 transition-all duration-500 group-hover:text-gold group-hover:drop-shadow-[0_0_6px_rgba(201,169,110,0.4)]" /> eclipseeventos@gmail.com</a></li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-gold/60">Navegación</div>
          <ul className="mt-4 sm:mt-5 grid grid-cols-2 gap-3 text-sm">
            {[["Servicios", "#servicios"], ["Experiencia", "#experience"], ["Eventos", "#eventos"], ["Galería", "#galeria"], ["Reseñas", "#resenas"], ["Contacto", WHATSAPP]].map(([l, h]) => (
              <li key={l}><a href={h} className="text-foreground/50 transition-all duration-500 hover:text-gold hover:translate-x-1 inline-block">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 sm:mt-14 max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gold/8 pt-6 text-xs text-muted-foreground/60 sm:flex-row">
          <div>© {new Date().getFullYear()} Eclipse Eventos. Todos los derechos reservados.</div>
          <div className="tracking-[0.35em] text-gold/30">DISEÑANDO · MOMENTOS · CINEMÁTICOS</div>
        </div>
      </div>
    </footer>
  );
}
