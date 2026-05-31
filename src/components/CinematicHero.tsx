import { motion, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import useFrameSequence from "@/hooks/useFrameSequence";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: EASE },
  },
};

/* ── Loading screen ── */
function LoadingOverlay({ progress }: { progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: EASE }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-[11px] tracking-[0.5em] text-gold/50 uppercase"
        >
          Cargando Experiencia
        </motion.div>
        <div className="relative h-[1px] w-48 overflow-hidden bg-white/[0.06]">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/60 to-gold"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="text-[10px] tracking-[0.3em] text-white/20 tabular-nums">
          {Math.round(progress * 100)}%
        </div>
      </div>
    </motion.div>
  );
}

/* ── Floating golden particles — reduced on mobile ── */
function GoldenParticles({ count = 30 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 137.5) % 100}%`,
    delay: `${(i * 0.9) % 14}s`,
    duration: `${12 + (i % 8) * 2}s`,
    size: 1 + ((i * 3) % 3),
    opacity: 0.15 + ((i * 7) % 5) * 0.08,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[4]">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float-up"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, var(--gold-soft), var(--gold))`,
            boxShadow: `0 0 ${p.size * 5}px var(--gold), 0 0 ${p.size * 10}px rgba(201,169,110,0.2)`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            ["--float-duration" as string]: p.duration,
          }}
        />
      ))}
    </div>
  );
}

/* ── Volumetric fog — lighter on mobile ── */
function VolumetricFog() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[3]">
      <div
        className="absolute -left-[20%] bottom-0 h-[45vh] w-[70%] rounded-full opacity-15 blur-[60px] sm:blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,169,110,0.25), transparent 70%)",
          animation: "smoke 28s linear infinite",
        }}
      />
      <div
        className="absolute right-[-15%] top-[25%] h-[35vh] w-[55%] rounded-full opacity-10 blur-[60px] sm:blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,169,110,0.15), transparent 70%)",
          animation: "smoke-slow 35s linear infinite",
        }}
      />
      <div
        className="hidden sm:block absolute left-[25%] bottom-[15%] h-[25vh] w-[35%] rounded-full opacity-8 blur-[80px] animate-breathe"
        style={{
          background:
            "radial-gradient(ellipse, rgba(240,236,228,0.08), transparent 60%)",
        }}
      />
    </div>
  );
}

/* ── Lens flares — hidden on mobile ── */
function LensFlares() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden sm:block">
      <div
        className="absolute top-[12%] left-[55%] h-24 w-24 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,110,0.3), transparent 70%)",
          animation: "lens-flare 10s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />
      <div
        className="absolute top-[30%] left-[35%] h-36 w-36 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,236,228,0.08), transparent 60%)",
          animation: "lens-flare 15s ease-in-out infinite",
          animationDelay: "4s",
        }}
      />
    </div>
  );
}

/* ── Scroll indicator ── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 1.5 }}
      className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-[12] flex flex-col items-center gap-3"
    >
      <span className="text-[9px] tracking-[0.5em] text-gold/40 uppercase">
        Desliza para explorar
      </span>
      <div className="relative h-8 w-[1px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/50 to-transparent animate-scroll-hint" />
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   MAIN CINEMATIC HERO
   ════════════════════════════════════════ */
export default function CinematicHero() {
  const {
    canvasRef,
    containerRef,
    loaded,
    progress,
    scrollYProgress,
  } = useFrameSequence();

  // Text parallax & dissolve driven by scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.55], [1, 0.7, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0vh", "-12vh"]);
  const textBlur = useTransform(scrollYProgress, [0, 0.35, 0.6], [0, 1, 4]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  // Overlay intensifies as scroll progresses
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.15, 0.5]);

  // Particle glow intensifies
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.3]);

  // Canvas parallax zoom — slow cinematic push-in on scroll
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // Derived filter for text blur
  const textFilterBlur = useTransform(textBlur, (v) => `blur(${v}px)`);

  // Scroll indicator fade
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <>
      {/* Loading overlay */}
      {!loaded && <LoadingOverlay progress={progress} />}

      {/* Scroll container — shorter on mobile for better pacing */}
      <div ref={containerRef} className="relative hero-scroll-container">
        {/* Sticky viewport */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
          {/* Canvas — the frame sequence, with parallax zoom */}
          <motion.div
            className="absolute inset-0 z-[1] origin-center"
            style={{ scale: canvasScale }}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0"
              style={{
                willChange: "contents",
                imageRendering: "auto",
              }}
            />
          </motion.div>

          {/* Cinematic gradient overlays — stronger at bottom for text readability */}
          <motion.div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{ opacity: overlayOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,5,5,0.35) 0%, transparent 20%, transparent 40%, rgba(5,5,5,0.45) 60%, rgba(5,5,5,0.88) 100%)",
              }}
            />
          </motion.div>

          {/* Vignette */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{ background: "var(--gradient-vignette)" }}
          />

          {/* Warm radial glow that intensifies with scroll */}
          <motion.div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{ opacity: glowIntensity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,169,110,0.12), transparent)",
              }}
            />
          </motion.div>

          {/* Atmospheric layers */}
          <VolumetricFog />
          <GoldenParticles count={typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 25} />
          <LensFlares />

          {/* ── Hero text content — anchored to bottom on all devices ── */}
          <motion.div
            style={{
              opacity: textOpacity,
              y: textY,
              scale: textScale,
              filter: textFilterBlur,
              willChange: "transform, opacity, filter",
            }}
            className="absolute inset-0 z-[10] flex items-end justify-center pb-[14vh] sm:pb-[12vh]"
          >
            <div className="mx-auto max-w-5xl px-5 sm:px-6 text-center">
              <motion.div
                initial="hidden"
                animate={loaded ? "show" : "hidden"}
                variants={{
                  show: {
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.8,
                    },
                  },
                }}
                className="flex flex-col items-center"
              >
                {/* Eyebrow */}
                <motion.div
                  variants={fadeUp}
                  className="mb-5 sm:mb-8 inline-flex items-center gap-2 sm:gap-3"
                >
                  <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-gold/50" />
                  <span className="text-[9px] sm:text-[11px] font-medium tracking-[0.35em] sm:tracking-[0.45em] text-gold/60 uppercase">
                    Diseño de Experiencias
                  </span>
                  <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-gold/50" />
                </motion.div>

                {/* Main headline */}
                <motion.h1
                  variants={fadeUp}
                  className="font-display text-[clamp(1.75rem,7vw,5rem)] leading-[1.1] tracking-tight text-cinema"
                >
                  Diseñamos momentos
                  <br />
                  <span className="text-gradient-gold">que se sienten como</span>
                  <br />
                  escenas de película.
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  variants={fadeUp}
                  className="mx-auto mt-5 sm:mt-7 max-w-md sm:max-w-2xl text-[clamp(0.8rem,2.5vw,1.15rem)] leading-relaxed text-muted-foreground font-light px-2 sm:px-0"
                >
                  Experiencias visuales premium para entradas inolvidables, celebraciones emotivas y momentos que todos grabarán.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={fadeUp}
                  className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0"
                >
                  <a href="#contact" className="btn-primary">
                    <span>Diseñar Mi Entrada</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <a href="#experience" className="btn-secondary group">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/25 transition-all duration-700 group-hover:border-gold/50 group-hover:bg-gold/10 group-hover:shadow-[0_0_12px_rgba(201,169,110,0.2)]">
                      <Play className="h-2.5 w-2.5 fill-gold text-gold ml-0.5" />
                    </span>
                    <span>Ver La Experiencia</span>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator — only shows near top */}
          <motion.div
            style={{
              opacity: scrollIndicatorOpacity,
            }}
          >
            <ScrollIndicator />
          </motion.div>
        </div>
      </div>
    </>
  );
}
