import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  PartyPopper,
  Sliders,
  Camera,
  Star,
  Instagram,
  Mail,
  ArrowRight,
  Play,
  Phone,
  Users,
  Award,
  Flame,
  Zap,
  Music,
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

export const Route = createFileRoute("/")({
  component: Landing,
});

const WHATSAPP = "https://wa.me/541136363115?text=Hola%20Eclipse%2C%20quiero%20cotizar%20mi%20evento";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

function Particles({ count = 24 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = (i * 137) % 100;
        const top = (i * 53) % 100;
        const delay = (i * 0.37) % 6;
        const size = 2 + ((i * 7) % 4);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gold animate-drift"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              boxShadow: "0 0 12px var(--gold), 0 0 24px var(--gold)",
              animationDelay: `${delay}s`,
              animationDuration: `${6 + (i % 6)}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${
          scrolled
            ? "rounded-full glass mx-4 px-5 py-3 sm:mx-auto sm:max-w-5xl"
            : ""
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <img src={logoSrc} alt="Eclipse Eventos" className="h-11 w-auto brightness-0 invert" />
        </a>
        <nav className="hidden items-center gap-9 text-sm text-muted-foreground md:flex">
          {[
            ["Servicios", "#servicios"],
            ["Experiencia", "#experiencia"],
            ["Eventos", "#eventos"],
            ["Galería", "#galeria"],
            ["Reseñas", "#resenas"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative transition-colors hover:text-gold"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="group hidden items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-5 py-2.5 text-sm text-foreground transition-all hover:bg-gold hover:text-primary-foreground hover:shadow-[0_0_24px_var(--gold)] sm:inline-flex"
        >
          Cotizar evento
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen w-full overflow-hidden vignette noise">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Entrada épica con chispas frías y luces cinematográficas"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)", opacity: 0.4 }} />
      </motion.div>

      <Particles count={36} />

      {/* moving smoke */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-40 bottom-0 h-72 w-[60%] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(ellipse, oklch(0.85 0.05 80 / 0.5), transparent 70%)", animation: "smoke 18s linear infinite" }}
        />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-end px-6 pb-24 pt-40">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-4xl"
        >
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-background/40 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-xs tracking-[0.35em] text-gold/90">PRODUCCIÓN VISUAL PREMIUM</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.92] tracking-tight"
          >
            Hacemos <span className="text-gradient-gold">inolvidable</span>
            <br />
            cada entrada.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg text-muted-foreground">
            Efectos visuales premium para fiestas, shows y eventos que merecen ser recordados, filmados y compartidos.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-gold px-8 py-4 text-sm font-semibold tracking-wide text-primary-foreground transition-all animate-pulse-glow hover:scale-[1.02]"
            >
              <span className="relative z-10">Quiero cotizar mi evento</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#galeria"
              className="group inline-flex items-center gap-3 rounded-full border border-gold/30 px-7 py-4 text-sm tracking-wide text-foreground transition-all hover:border-gold hover:bg-gold/5"
            >
              <Play className="h-4 w-4 fill-gold text-gold" />
              Ver efectos en acción
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 right-6 hidden items-center gap-3 text-xs tracking-[0.3em] text-muted-foreground md:flex"
        >
          <div className="h-px w-16 bg-gold/40" />
          SCROLL
        </motion.div>
      </motion.div>

      {/* marquee bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 hairline overflow-hidden bg-background/80 py-3 backdrop-blur-sm">
        <div className="flex animate-marquee gap-12 whitespace-nowrap text-xs tracking-[0.4em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-12">
              {["CHISPAS FRÍAS", "★", "PAPEL METALIZADO", "★", "CONSOLAS INALÁMBRICAS", "★", "EFECTOS PREMIUM", "★", "SHOWS EN VIVO", "★", "EVENTOS PRIVADOS", "★"].map((t, i) => (
                <span key={`${k}-${i}`} className={t === "★" ? "text-gold" : ""}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { num: "200+", label: "Eventos producidos", icon: Award },
    { num: "500+", label: "Momentos épicos", icon: Flame },
    { num: "100+", label: "Clientes felices", icon: Users },
  ];
  return (
    <section className="relative overflow-hidden py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm vignette">
            <img src={weddingImg} alt="Entrada de novios con chispas frías" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden h-40 w-40 rounded-full border border-gold/30 sm:block" />
          <div className="absolute -left-4 top-12 hidden h-24 w-24 rounded-full bg-gradient-gold opacity-20 blur-2xl md:block" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="flex flex-col justify-center"
        >
          <motion.span variants={fadeUp} className="mb-5 text-xs tracking-[0.4em] text-gold">
            — QUIÉNES SOMOS
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-5xl leading-[0.95] sm:text-6xl">
            Elevamos cualquier celebración a una <span className="text-gradient-gold">experiencia visual.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-7 text-lg text-muted-foreground">
            Nos especializamos en efectos premium para entradas, shows y momentos únicos que convierten cualquier evento en algo digno de ser filmado, compartido y recordado.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-muted-foreground">
            Profesionalismo, puntualidad y tecnología moderna que se nota en cada foto, cada video y cada reacción.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="group relative overflow-hidden rounded-lg border border-gold/15 bg-card/40 p-5 transition-all hover:border-gold/50">
                <s.icon className="mb-3 h-5 w-5 text-gold/80 transition-transform group-hover:scale-110" />
                <div className="font-display text-3xl text-gradient-gold sm:text-4xl">{s.num}</div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ValueProp() {
  return (
    <section className="relative overflow-hidden py-36">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)", opacity: 0.4 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <Particles count={20} />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div variants={fadeUp} className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-xs tracking-[0.35em] text-gold/80">
            <Sparkles className="h-3 w-3" /> NUESTRA FILOSOFÍA
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.95]">
            No vendemos efectos.
            <br />
            <span className="text-gradient-gold">Creamos momentos</span>
            <br />
            que hacen explotar la emoción.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-10 max-w-2xl text-lg text-muted-foreground">
            En Eclipse Eventos transformamos entradas, bailes y celebraciones en experiencias visuales inolvidables que impactan en vivo, brillan en redes sociales y quedan para siempre en la memoria.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Sparkles,
      title: "Chispas Frías",
      tag: "Efectos pirotécnicos en frío",
      desc: "Fuentes de hasta 2 metros para entradas, primeros bailes y momentos inolvidables.",
      img: sparksImg,
      durations: ["10s", "20s", "30s"],
    },
    {
      icon: PartyPopper,
      title: "Papel Metalizado",
      tag: "Cañones de confetti",
      desc: "Explosiones perfectas para drops, cierres y momentos de máxima energía.",
      img: confettiImg,
    },
    {
      icon: Sliders,
      title: "Consolas Inalámbricas",
      tag: "Control profesional DMX",
      desc: "Control total y profesional para ejecutar cada efecto con precisión milimétrica.",
      img: consoleImg,
    },
  ];
  return (
    <section id="servicios" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <motion.span variants={fadeUp} className="mb-4 block text-xs tracking-[0.4em] text-gold">
              — SERVICIOS
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-5xl leading-[0.95] sm:text-6xl">
              Tecnología de espectáculo.
              <br />
              <span className="text-gradient-gold">Ejecución impecable.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-md text-muted-foreground">
            Cada efecto está pensado para crear el momento que todos van a recordar y a compartir.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-gold/15 bg-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/50"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-background/70 backdrop-blur-md">
                  <s.icon className="h-5 w-5 text-gold" />
                </div>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(ellipse at center bottom, oklch(0.78 0.13 85 / 0.4), transparent 70%)" }}
                />
              </div>
              <div className="relative flex flex-1 flex-col p-7">
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold/70">{s.tag}</div>
                <h3 className="mt-2 font-display text-3xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                {s.durations && (
                  <div className="mt-5 flex gap-2">
                    {s.durations.map((d) => (
                      <span key={d} className="rounded-full border border-gold/30 px-3 py-1 text-[11px] tracking-widest text-gold">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex items-center gap-2 text-xs tracking-widest text-foreground/70 transition-colors group-hover:text-gold">
                  CONSULTAR <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    { icon: Sparkles, t: "Entradas más impactantes" },
    { icon: Camera, t: "Videos más épicos" },
    { icon: Star, t: "Fotos más premium" },
    { icon: Users, t: "Reacción real de invitados" },
    { icon: Music, t: "Experiencia tipo show" },
    { icon: Zap, t: "Contenido ideal para redes" },
  ];
  return (
    <section id="experiencia" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10">
        <img src={djImg} alt="" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span variants={fadeUp} className="mb-5 block text-xs tracking-[0.4em] text-gold">
            — EXPERIENCIA
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-5xl leading-[0.95] sm:text-7xl">
            No es solo un efecto.
            <br />
            <span className="text-gradient-gold">Es el momento que todos van a grabar.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold/15 bg-gold/15 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative flex flex-col gap-4 bg-card p-8 transition-all hover:bg-card/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-background/60 transition-all group-hover:bg-gold group-hover:text-primary-foreground">
                <it.icon className="h-5 w-5 text-gold transition-colors group-hover:text-primary-foreground" />
              </div>
              <p className="font-display text-2xl leading-tight">{it.t}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-gold transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Events() {
  const events = [
    { name: "Fiestas de 15", img: heroImg, span: "md:col-span-2 md:row-span-2" },
    { name: "Casamientos", img: weddingImg },
    { name: "DJs y Boliches", img: djImg },
    { name: "Egresos", img: gradImg },
    { name: "Shows y Escenarios", img: g3, span: "md:col-span-2" },
    { name: "Eventos Empresariales", img: corporateImg },
    { name: "Eventos Privados", img: g4 },
  ];
  return (
    <section id="eventos" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16 max-w-3xl"
        >
          <motion.span variants={fadeUp} className="mb-4 block text-xs tracking-[0.4em] text-gold">— EVENTOS</motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-5xl leading-[0.95] sm:text-6xl">
            Cada celebración merece su propio <span className="text-gradient-gold">momento épico.</span>
          </motion.h2>
        </motion.div>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-3 md:grid-cols-4">
          {events.map((e, i) => (
            <motion.a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              key={e.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-lg vignette ${e.span ?? ""}`}
            >
              <img src={e.img} alt={e.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent transition-opacity duration-500 group-hover:from-background/90" />
              <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Cotizar →
                </div>
                <div className="font-display text-2xl sm:text-3xl">{e.name}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    { src: g2, h: "row-span-2", alt: "Lluvia de papel metalizado verde y blanco" },
    { src: g1, h: "", alt: "Fuegos artificiales sobre la iglesia" },
    { src: g3, h: "", alt: "Show pirotécnico nocturno con público" },
    { src: weddingImg, h: "row-span-2", alt: "Primer baile de novios con chispas frías" },
    { src: g4, h: "", alt: "Procesión con explosión de papel picado" },
  ];
  return (
    <section id="galeria" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <motion.span variants={fadeUp} className="mb-4 block text-xs tracking-[0.4em] text-gold">— GALERÍA</motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-5xl leading-[0.95] sm:text-6xl">
              Momentos reales.
              <br />
              <span className="text-gradient-gold">Emoción real.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-sm text-muted-foreground">
            Cada imagen es un evento, una entrada, un momento que dejó marca.
          </motion.p>
        </motion.div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {imgs.map((im, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden rounded-md vignette ${im.h}`}
            >
              <img src={im.src} alt={im.alt} loading="lazy" className="h-full w-full object-cover transition-all duration-[1200ms] group-hover:scale-110" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(ellipse at center, oklch(0.78 0.13 85 / 0.25), transparent 70%)" }} />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    {
      stars: 5,
      text: "Las chispas frías hicieron que la entrada de mi hija pareciera un show profesional. Todos quedaron impresionados.",
      name: "Camila R.",
      role: "Fiesta de 15",
      initials: "CR",
    },
    {
      stars: 5,
      text: "El momento del drop con papel metalizado explotó. Los videos quedaron increíbles, no paro de recibir mensajes.",
      name: "Lautaro G.",
      role: "DJ — Boliche",
      initials: "LG",
    },
    {
      stars: 5,
      text: "Profesionales, puntuales y el resultado fue muchísimo mejor de lo que imaginábamos. Volveríamos a contratarlos sin dudar.",
      name: "Agustina y Franco",
      role: "Casamiento",
      initials: "AF",
    },
  ];
  return (
    <section id="resenas" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)", opacity: 0.25 }} />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="mb-16 max-w-3xl">
          <motion.span variants={fadeUp} className="mb-4 block text-xs tracking-[0.4em] text-gold">— RESEÑAS</motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-5xl leading-[0.95] sm:text-6xl">
            Lo que dicen quienes <span className="text-gradient-gold">vivieron Eclipse.</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="group relative flex flex-col gap-6 rounded-2xl glass p-8 transition-all hover:border-gold/40 hover:-translate-y-1"
            >
              <div className="flex gap-1">
                {Array.from({ length: r.stars }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-foreground/90">"{r.text}"</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-gold/15 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-gold font-display text-sm text-primary-foreground">
                  {r.initials}
                </div>
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{r.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-40">
      <div className="absolute inset-0 -z-10">
        <img src={heroImg} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)", opacity: 0.5 }} />
      </div>
      <Particles count={32} />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.15 } } }}>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.92]">
            Tu evento merece un <br />
            <span className="text-gradient-gold">momento inolvidable.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
            Hacé que cada entrada se convierta en una experiencia épica que se filme, se comparta y se recuerde.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-gold px-9 py-5 text-sm font-semibold tracking-wide text-primary-foreground transition-all animate-pulse-glow hover:scale-[1.03]"
            >
              <span className="relative z-10">Reservar fecha</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-background/40 px-8 py-5 text-sm tracking-wide text-foreground backdrop-blur-md transition-all hover:bg-gold/10"
            >
              <Phone className="h-4 w-4 text-gold" />
              Hablar por WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-gold/15 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logoSrc} alt="Eclipse Eventos" className="h-12 w-auto brightness-0 invert" />
          </div>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Producción visual premium para eventos. Hacemos inolvidable cada entrada.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-gold">Contacto</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-foreground transition-colors hover:text-gold">
                <Phone className="h-4 w-4 text-gold" /> +54 11 3636-3115
              </a>
            </li>
            <li>
              <a href="https://instagram.com/eclipse.eventosss" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-foreground transition-colors hover:text-gold">
                <Instagram className="h-4 w-4 text-gold" /> @eclipse.eventosss
              </a>
            </li>
            <li>
              <a href="mailto:eclipseeventos@gmail.com" className="group inline-flex items-center gap-3 text-foreground transition-colors hover:text-gold">
                <Mail className="h-4 w-4 text-gold" /> eclipseeventos@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-gold">Navegación</div>
          <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {[
              ["Servicios", "#servicios"],
              ["Experiencia", "#experiencia"],
              ["Eventos", "#eventos"],
              ["Galería", "#galeria"],
              ["Reseñas", "#resenas"],
              ["Cotizar", WHATSAPP],
            ].map(([l, h]) => (
              <li key={l}>
                <a href={h} className="text-muted-foreground transition-colors hover:text-gold">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gold/15 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Eclipse Eventos. Todos los derechos reservados.</div>
          <div className="tracking-[0.35em]">HACEMOS · INOLVIDABLE · CADA · ENTRADA</div>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <ValueProp />
      <Services />
      <Experience />
      <Events />
      <Gallery />
      <Reviews />
      <FinalCTA />
      <Footer />
    </main>
  );
}
