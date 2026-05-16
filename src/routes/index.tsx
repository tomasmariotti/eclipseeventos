import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import CinematicHero from "@/components/CinematicHero";
import {
  Services,
  Experience,
  Events,
  Gallery,
  Reviews,
  FinalCTA,
  Footer,
} from "@/components/Sections";

import weddingImg from "@/assets/event-wedding.jpg";
import { Award, Flame, Users, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: EASE } },
};

export const Route = createFileRoute("/")(  {
  component: Landing,
});

/* ── Cinematic section divider ── */
function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE }}
      className="section-divider"
    />
  );
}

/* ── About / Philosophy ── */
function About() {
  const stats = [
    { num: "200+", label: "Eventos producidos", icon: Award },
    { num: "500+", label: "Momentos épicos", icon: Flame },
    { num: "100+", label: "Clientes felices", icon: Users },
  ];

  return (
    <section className="relative overflow-hidden py-36">
      {/* Depth lighting — warm ambient glow */}
      <div className="pointer-events-none absolute top-0 right-0 h-[40%] w-[30%] rounded-full opacity-[0.03] blur-[100px]" style={{ background: "var(--gold)" }} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
          className="relative"
        >
          <div className="img-cinematic relative aspect-[4/5] overflow-hidden rounded-2xl vignette">
            <img src={weddingImg} alt="Wedding entrance with cold sparks" loading="lazy" className="h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
          </div>
          {/* Decorative ring with warm glow */}
          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full border border-gold/15 sm:block" />
          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full opacity-20 blur-2xl sm:block animate-warm-pulse" style={{ background: "var(--gold)" }} />
          <div className="absolute -left-4 top-12 hidden h-20 w-20 rounded-full opacity-10 blur-2xl md:block animate-breathe" style={{ background: "var(--gradient-gold)" }} />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="flex flex-col justify-center"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-3">
            <div className="h-[1px] w-6 bg-gold/40" />
            <span className="text-[11px] font-medium tracking-[0.4em] text-gold/70 uppercase">Quiénes Somos</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08]">
            Elevamos cada celebración a una{" "}
            <span className="text-gradient-gold">experiencia visual.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-7 text-base text-muted-foreground font-light leading-relaxed">
            Nos especializamos en efectos premium para entradas, shows y momentos únicos
            que transforman cualquier evento en algo digno de grabar, compartir y recordar.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="card-cinematic group relative overflow-hidden rounded-xl border border-gold/10 bg-[#0B0B0B] p-5">
                <div className="relative z-[2]">
                  <s.icon className="mb-3 h-5 w-5 text-gold/60 transition-all duration-700 group-hover:scale-110 group-hover:text-gold group-hover:drop-shadow-[0_0_8px_rgba(201,169,110,0.3)]" />
                  <div className="font-display text-2xl text-gradient-gold sm:text-3xl">{s.num}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Value Proposition ── */
function ValueProp() {
  return (
    <section className="relative overflow-hidden py-36">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-25" style={{ background: "var(--gradient-radial-gold)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>
      {/* Warm breathing glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40%] w-[30%] rounded-full opacity-[0.04] blur-[100px] animate-breathe" style={{ background: "var(--gold)" }} />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div variants={fadeUp} className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-gold/15 px-4 py-2 text-[10px] tracking-[0.35em] text-gold/60 glass-reflect">
            <Sparkles className="h-3 w-3" /> NUESTRA FILOSOFÍA
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-display text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.08] text-cinema">
            No vendemos efectos.
            <br />
            <span className="text-gradient-gold">Creamos momentos</span>
            <br />
            que encienden emociones.
          </motion.h2>

          <motion.p variants={fadeUp} className="mx-auto mt-10 max-w-2xl text-base text-muted-foreground font-light leading-relaxed">
            En Eclipse Eventos transformamos entradas, bailes y celebraciones en experiencias
            visuales inolvidables que impactan en vivo, brillan en redes y quedan en la memoria para siempre.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Marquee ── */
function CinematicMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-gold/8 bg-[#050505]/90 py-4 backdrop-blur-sm">
      <div className="flex animate-marquee gap-12 whitespace-nowrap text-[10px] tracking-[0.5em] text-foreground/20 uppercase">
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex shrink-0 items-center gap-12">
            {["Chispas Frías", "◆", "Confetti Metalizado", "◆", "DMX Inalámbrico", "◆", "Efectos Premium", "◆", "Shows en Vivo", "◆", "Eventos Privados", "◆"].map((t, i) => (
              <span key={`${k}-${i}`} className={t === "◆" ? "text-gold/30" : ""}>{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Landing ── */
function Landing() {
  return (
    <main className="relative bg-[#050505] text-foreground film-grain">
      <Cursor />
      <Nav />
      <CinematicHero />
      <CinematicMarquee />
      <About />
      <SectionDivider />
      <ValueProp />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Events />
      <SectionDivider />
      <Gallery />
      <SectionDivider />
      <Reviews />
      <FinalCTA />
      <Footer />
    </main>
  );
}
