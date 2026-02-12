import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import KineticSphere from "../components/KineticSphere";
import { Rocket, Bell, CheckCircle2, ArrowRight, Play, Pause } from "lucide-react";
import gameplayTrailer from "@/assets/gameplay-trailer.mp4";
import logoImg from "@/assets/inertia-debt-logo.png";
import appIconImg from "@/assets/inertia-debt-app-icon.png";
import AnimatedSection from "../components/AnimatedSection";
import DebtMeter from "../components/DebtMeter";

/* ─── Animated Digit Roll ─── */
const DigitRoll = ({ value, label }: { value: number; label: string }) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (value - start) / (60);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCurrent(value); clearInterval(timer); }
      else setCurrent(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-5xl md:text-7xl lg:text-8xl font-semibold text-primary tabular-nums tracking-tight">
        {current.toFixed(1)}
      </div>
      <div className="text-xs font-mono text-muted-foreground/60 mt-3 uppercase tracking-[0.3em]">{label}</div>
    </div>
  );
};

/* ─── Threat Bar (expandable) ─── */
const ThreatBar = ({ title, desc, delay }: { title: string; desc: string; delay: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="group cursor-pointer"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <motion.div
        className="border-b border-border/30 py-6 md:py-8 relative overflow-hidden"
        animate={{ paddingBottom: expanded ? 48 : 32, paddingTop: expanded ? 48 : 32 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="flex items-center justify-between">
          <motion.h3
            className="font-editorial text-2xl md:text-4xl text-foreground/80 tracking-wide"
            animate={{ color: expanded ? "hsl(175, 80%, 40%)" : "hsl(200, 20%, 85%)" }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.div
            className="w-2 h-2 rounded-full bg-destructive"
            animate={{ scale: expanded ? [1, 1.5, 1] : 1, opacity: expanded ? 1 : 0.4 }}
            transition={{ duration: 0.5, repeat: expanded ? Infinity : 0 }}
          />
        </div>
        <motion.p
          className="text-sm text-muted-foreground max-w-xl mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          {desc}
        </motion.p>
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-primary"
          animate={{ width: expanded ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

/* ─── Data Module (horizontal strip) ─── */
const DataModule = ({ label, desc, index }: { label: string; desc: string; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex-1 min-w-[200px] py-8 px-6 cursor-default relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <motion.div
        className="text-xs font-mono text-muted-foreground/40 tracking-[0.3em] mb-3"
        animate={{ color: hovered ? "hsl(175, 80%, 40%)" : "hsla(215, 15%, 55%, 0.4)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>
      <motion.h4
        className="font-editorial text-xl md:text-2xl mb-2"
        animate={{ color: hovered ? "hsl(175, 80%, 40%)" : "hsl(200, 20%, 95%)" }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.h4>
      <motion.p
        className="text-sm text-muted-foreground leading-relaxed"
        animate={{ opacity: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        {desc}
      </motion.p>
      <motion.div
        className="absolute bottom-0 left-6 right-6 h-px bg-primary/30"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
};

/* ═══════════════════════════════════ PAGE ═══════════════════════════════════ */
const Index = () => {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [sphereCollapsed, setSphereCollapsed] = useState(false);

  // Use refs for high-frequency values to avoid re-renders
  const scrollVelocityRef = useRef(0);
  const debtCounterRef = useRef(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [debtCounter, setDebtCounter] = useState(0);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const rafId = useRef(0);

  // Scroll velocity tracking — batch state updates via rAF
  useMotionValueEvent(scrollY, "change", (latest) => {
    const vel = Math.abs(latest - lastScrollY.current);
    lastScrollY.current = latest;
    scrollVelocityRef.current = Math.min(vel, 100);
    debtCounterRef.current += vel * 0.01;

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(() => {
        setScrollVelocity(scrollVelocityRef.current);
        setDebtCounter(debtCounterRef.current);
        rafId.current = 0;
      });
    }
  });

  // Show buttons after 3s
  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Cursor glow tracker — direct DOM manipulation, no state
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Detect bottom for sphere collapse
  useEffect(() => {
    const handler = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      setSphereCollapsed(atBottom);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Parallax transforms
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.9]);

  // Vignette based on scroll
  const vignetteOpacity = useTransform(scrollY, [0, 2000], [0.3, 0.7]);

  // Scroll-based telemetry values
  const debtIndex = useTransform(scrollY, [0, 3000], [12.4, 97.8]);
  const velocityOutput = useTransform(scrollY, [0, 3000], [0.0, 88.5]);
  const systemStability = useTransform(scrollY, [0, 3000], [99.9, 34.2]);

  const [di, setDi] = useState(12.4);
  const [vo, setVo] = useState(0.0);
  const [ss, setSs] = useState(99.9);

  useMotionValueEvent(debtIndex, "change", (v) => setDi(v));
  useMotionValueEvent(velocityOutput, "change", (v) => setVo(v));
  useMotionValueEvent(systemStability, "change", (v) => setSs(v));

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Data for non-homepage sections kept
  const threats = [
    { title: "COLLECTORS", desc: "Autonomous entities that pursue the player during high-debt states, forcing immediate settlement or velocity sacrifice. They accelerate as your debt grows." },
    { title: "INFLATORS", desc: "Environmental hazards that apply debt multipliers. Entering their radius compounds existing debt exponentially. Invisible until triggered." },
    { title: "DEBT TRAPPERS", desc: "Zone-based constraints that freeze player movement when debt exceeds threshold, creating forced settlement scenarios. Escape requires precision timing." },
  ];

  const coreValues = ["Structure over spectacle", "Systems over shortcuts", "Intelligence over reaction", "Clarity over noise"];

  const logs = [
    { version: "0.4.2", date: "2025-01-28", changes: ["Debt curve recalibrated for late-game balance", "Collector AI pathfinding optimized", "Settlement window timing adjusted: 2.0s → 1.8s", "New visual feedback for debt threshold warnings"] },
    { version: "0.4.1", date: "2025-01-15", changes: ["Velocity degradation formula refined", "Inflator radius reduced by 15%", "UI debt meter now updates at 60fps", "Added haptic feedback for debt spikes"] },
    { version: "0.4.0", date: "2025-01-02", changes: ["Compound debt loop system introduced", "New late-game arena: Pressure Chamber", "Recovery efficiency metric added to analytics", "Performance optimizations for low-end devices"] },
  ];

  const systems = [
    { title: "Auto-Movement Core", desc: "The player moves automatically. There is no idle state. Every frame generates kinetic output." },
    { title: "Impulse Injection", desc: "Player input applies directional force, increasing velocity and accumulating movement debt." },
    { title: "Debt Accumulation", desc: "Each impulse generates a proportional debt value. The faster you move, the more debt you carry." },
    { title: "Velocity Degradation", desc: "Unmanaged debt erodes velocity over time. Speed becomes a cost, not a resource." },
    { title: "Settlement Recovery", desc: "Clearing debt windows restores velocity and stability. Timing is everything." },
  ];

  const levels = [
    { phase: "EARLY", label: "Visible Debt Feedback", desc: "Clear UI indicators show debt in real-time. Players learn the cost of movement.", color: "text-primary" },
    { phase: "MID", label: "Hidden Multipliers", desc: "Debt multipliers become invisible. Players must internalize timing and rhythm.", color: "text-accent" },
    { phase: "LATE", label: "Compound Debt Loops", desc: "Debt generates debt. Recovery windows shrink. Only precision survives.", color: "text-destructive" },
  ];

  return (
    <div className="relative">
      {/* Cursor glow — positioned via ref, no re-renders */}
      <div
        ref={cursorGlowRef}
        className="cursor-glow"
      />

      {/* Scroll-based vignette */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{ opacity: vignetteOpacity, boxShadow: "inset 0 0 200px 80px hsl(222, 47%, 6%)" }}
      />

      {/* Live debt counter - subtle floating */}
      <motion.div
        className="fixed top-20 right-6 z-30 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
      >
        <div className="text-right">
          <div className="text-[10px] font-mono text-muted-foreground/40 tracking-[0.3em]">ACCUMULATED DEBT</div>
          <div className="font-mono text-sm text-primary/60 tabular-nums">{debtCounter.toFixed(2)}</div>
        </div>
      </motion.div>

      {/* ═══════════ HERO — FULL-SCREEN INTERACTIVE ═══════════ */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity, scale: heroScale }}>
          <KineticSphere scrollVelocity={scrollVelocity} debtLevel={debtCounter} />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="font-editorial text-5xl md:text-7xl lg:text-9xl text-foreground tracking-tight leading-[0.9]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            INERTIA IS<br />
            <span className="italic text-primary/90">NEVER</span> FREE.
          </motion.h1>

          <motion.p
            className="text-sm md:text-base text-muted-foreground/60 mt-8 font-body tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Every movement generates consequence.
          </motion.p>

          {/* Buttons fade in after 3s */}
          <motion.div
            className="flex gap-4 justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : 20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.button
              onClick={() => scrollTo("the-system")}
              className="px-8 py-3.5 rounded-lg border border-border/50 bg-card/20 backdrop-blur-sm text-sm font-body text-foreground/80 hover:border-primary/40 transition-all"
              whileHover={{ scale: 1.03, borderColor: "hsl(175, 80%, 40%)" }}
              whileTap={{ scale: 0.97 }}
            >
              Explore The System
            </motion.button>
            <motion.button
              onClick={() => scrollTo("pre-launch")}
              className="px-8 py-3.5 rounded-lg bg-primary/10 border border-primary/30 text-sm font-body text-primary hover:bg-primary/20 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Deployment Status
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════ LAYER 1 — THE PRINCIPLE ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <div className="text-center px-4">
          {["MOVEMENT", "CREATES", "DEBT."].map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <span className={`font-editorial block text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tight ${
                i === 2 ? "text-primary italic" : "text-foreground"
              }`}>
                {word}
              </span>
            </motion.div>
          ))}

          {/* Faint scroll debt counter */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em]">SCROLL DEBT ACCUMULATING</span>
            <div className="font-mono text-lg text-primary/40 mt-1 tabular-nums">{debtCounter.toFixed(4)}</div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ GAMEPLAY TRAILER ═══════════ */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em] text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            SYSTEM PREVIEW
          </motion.div>
          <motion.h2
            className="font-editorial text-3xl md:text-5xl text-center text-foreground mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            See the engine in motion.
          </motion.h2>

          <motion.div
            className="max-w-5xl mx-auto relative group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Glow frame */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative rounded-2xl overflow-hidden border border-border/20 bg-navy-deep">
              {/* Aspect ratio container */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={gameplayTrailer}
                  loop
                  muted
                  playsInline
                  autoPlay
                />

                {/* Vignette overlay on video */}
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 100px 40px hsl(222, 47%, 6%)" }} />
              </div>

              {/* Bottom info strip */}
              <div className="flex items-center justify-between px-6 py-4 bg-card/30 backdrop-blur-sm border-t border-border/10">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <span className="text-xs font-mono text-muted-foreground/50">LIVE ENGINE CAPTURE</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-muted-foreground/30">60 FPS</span>
                  <span className="text-[10px] font-mono text-muted-foreground/30">ALPHA v0.4.2</span>
                </div>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/20 rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/20 rounded-bl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/20 rounded-br-2xl pointer-events-none" />
          </motion.div>

          <motion.p
            className="text-center text-xs text-muted-foreground/30 mt-8 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Captured from the INERTIA DEBT physics engine. Pre-release footage.
          </motion.p>
        </div>
      </section>

      {/* ═══════════ LAYER 2 — LIVE DEBT SIMULATION ═══════════ */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em] text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            SYSTEM DEMONSTRATION
          </motion.div>

          <div className="flex flex-col md:flex-row gap-0 md:gap-px max-w-5xl mx-auto">
            <DataModule label="Impulse" desc="Player input applies directional force. Each input generates velocity and corresponding debt. The exchange is never free." index={0} />
            <DataModule label="Settlement" desc="Timed debt clearance windows restore velocity. Miss the window, debt compounds. Precision is survival." index={1} />
            <DataModule label="Overload" desc="When debt exceeds capacity, the system destabilizes. Controls degrade. Vision distorts. The screen itself fights you." index={2} />
          </div>
        </div>
      </section>

      {/* ═══════════ LAYER 3 — SYSTEM TELEMETRY ═══════════ */}
      <section className="relative min-h-screen flex items-center py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em] text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            REAL-TIME TELEMETRY
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-5xl mx-auto">
            <DigitRoll value={di} label="Debt Index" />
            <DigitRoll value={vo} label="Velocity Output" />
            <DigitRoll value={ss} label="System Stability" />
          </div>

          <motion.p
            className="text-center text-xs text-muted-foreground/30 mt-16 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Values respond to your scroll velocity. Scroll faster → velocity spikes. Scroll slowly → debt accumulates.
          </motion.p>
        </div>
      </section>

      {/* ═══════════ LAYER 4 — THREAT PREVIEW ═══════════ */}
      <section id="threats" className="relative py-32">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em] mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            THREAT CLASSIFICATION
          </motion.div>

          {threats.map((t, i) => (
            <ThreatBar key={t.title} title={t.title} desc={t.desc} delay={i * 0.12} />
          ))}
        </div>
      </section>

      {/* ═══════════ LAYER 5 — THE PHILOSOPHY (SCS) ═══════════ */}
      <section id="studio" className="relative min-h-screen flex items-center py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="font-editorial text-4xl md:text-6xl lg:text-8xl text-foreground tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            SOHAN COMPUTER STORE
          </motion.h2>
          <motion.p
            className="font-editorial text-lg md:text-xl text-primary/70 italic mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            (SCS)
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground/50 mt-6 font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Engineering consequence into play.
          </motion.p>

          <div className="mt-20 max-w-lg mx-auto space-y-6">
            {coreValues.map((v, i) => (
              <motion.p
                key={v}
                className="font-editorial text-xl md:text-2xl text-foreground/70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              >
                {v}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ THE SYSTEM (detailed) ═══════════ */}
      <section id="the-system" className="py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em] text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            CORE ARCHITECTURE
          </motion.div>
          <motion.h2
            className="font-editorial text-4xl md:text-6xl text-center text-foreground mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            THE INERTIA ENGINE
          </motion.h2>

          <div className="space-y-3 max-w-3xl mx-auto">
            {systems.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                <motion.div
                  whileHover={{ x: 8, borderColor: "hsl(175, 80%, 40%)" }}
                  transition={{ duration: 0.3 }}
                  className="py-5 px-6 border-l-2 border-transparent cursor-default rounded-lg hover:bg-card/20 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-muted-foreground/30 mt-1">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground/70">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HEALTH ═══════════ */}
      <section id="health" className="py-32">
        <div className="container mx-auto px-4">
          <motion.div className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em] text-center mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            INTEGRITY MONITORING
          </motion.div>
          <motion.h2 className="font-editorial text-4xl md:text-6xl text-center text-foreground mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            SYSTEM STABILITY
          </motion.h2>

          <AnimatedSection delay={0.1}>
            <div className="max-w-3xl mx-auto space-y-4 py-8">
              <DebtMeter label="Structural Integrity" value={78.5} />
              <DebtMeter label="Debt Load" value={34.2} />
              <DebtMeter label="Recovery Rate" value={62.0} />
              <DebtMeter label="Collapse Proximity" value={15.8} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8">
              <div className="py-6 px-8 border-l border-destructive/30">
                <h4 className="font-mono text-xs text-destructive/80 mb-3 tracking-widest">OVERLOAD STATE</h4>
                <p className="text-sm text-muted-foreground/60">When debt exceeds capacity, stability drops per frame. Visual distortion increases. Controls degrade.</p>
              </div>
              <div className="py-6 px-8 border-l border-primary/30">
                <h4 className="font-mono text-xs text-primary/80 mb-3 tracking-widest">RECOVERY STATE</h4>
                <p className="text-sm text-muted-foreground/60">Successful debt settlements restore stability points. Clean movement chains multiply recovery rate.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ LEVELS ═══════════ */}
      <section id="levels" className="py-32">
        <div className="container mx-auto px-4">
          <motion.div className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em] text-center mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            PROGRESSIVE COMPLEXITY
          </motion.div>
          <motion.h2 className="font-editorial text-4xl md:text-6xl text-center text-foreground mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            STRUCTURED ARENAS
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {levels.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="py-6 px-8 border-l border-border/30 hover:border-primary/50 transition-colors group"
              >
                <div className={`font-mono text-xs ${l.color} tracking-widest mb-2`}>{l.phase}</div>
                <h3 className="font-display text-lg font-semibold mb-1">{l.label}</h3>
                <p className="text-sm text-muted-foreground/60">{l.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ANALYTICS ═══════════ */}
      <section id="analytics" className="py-32">
        <div className="container mx-auto px-4">
          <motion.div className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em] text-center mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            DATA-DRIVEN PERFORMANCE
          </motion.div>
          <motion.h2 className="font-editorial text-4xl md:text-6xl text-center text-foreground mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            PERFORMANCE ANALYTICS
          </motion.h2>

          <AnimatedSection delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center">
                  <span className="font-mono text-primary text-sm font-bold">P1</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">Player Profile</h3>
                  <p className="text-xs font-mono text-primary/60">CREDIT RATING: A- · TIER: ELITE</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Matches", val: "147" }, { label: "Wins", val: "89" },
                  { label: "Collapses", val: "23" }, { label: "Win Rate", val: "60.5%" },
                ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                    className="py-4 text-center border-b border-border/20">
                    <span className="text-lg font-mono text-primary font-semibold">{stat.val}</span>
                    <span className="text-xs text-muted-foreground/50 block mt-1">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4 mt-10">
                <DebtMeter label="Average Debt" value={42.7} />
                <DebtMeter label="Peak Debt" value={94.3} suffix="" />
                <DebtMeter label="Velocity Collapse" value={12.8} suffix="/s" />
                <DebtMeter label="Recovery Efficiency" value={67.5} suffix="%" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ PRE-LAUNCH ═══════════ */}
      <section id="pre-launch" className="py-32 relative overflow-hidden">
        {/* Premium background accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            {/* App icon — clean circular glow, no box */}
            <motion.div
              className="relative w-32 h-32 md:w-44 md:h-44 mx-auto mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
            >
              {/* Ambient glow behind */}
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: "radial-gradient(circle, hsl(175, 80%, 40%, 0.25) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              {/* Thin orbit ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-primary/10"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/60" />
              </motion.div>
              {/* Icon — circular crop */}
              <img
                src={appIconImg}
                alt="INERTIA DEBT"
                className="relative w-full h-full rounded-full object-cover border-2 border-primary/15 shadow-[0_0_40px_-8px_hsl(175,80%,40%,0.3)]"
              />
            </motion.div>

            {/* Logo text — no background visible */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
              <h3 className="font-display text-xl md:text-2xl tracking-[0.3em] text-foreground/80 uppercase">Inertia Debt</h3>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
            </motion.div>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6"
              whileInView={{ scale: [0.9, 1] }}
              viewport={{ once: true }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
                <Rocket size={12} className="text-primary" />
              </motion.div>
              <span className="text-xs font-mono text-primary tracking-widest">DEPLOYMENT STATUS</span>
            </motion.div>

            <h2 className="font-editorial text-4xl md:text-6xl text-foreground">
              <span className="text-gradient-teal">SYSTEM</span> DEPLOYMENT
            </h2>
            <p className="text-sm text-muted-foreground/50 mt-4 max-w-lg mx-auto">The most anticipated physics-based action game is preparing for launch.</p>
          </div>

          {/* Status */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            <AnimatedSection delay={0.1}>
              <div className="py-8 px-8 border border-border/20 rounded-xl bg-card/30 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10">
                <h3 className="text-xs font-mono text-primary/60 tracking-widest mb-6">DEPLOYMENT DETAILS</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Platform", value: "Android" },
                    { label: "Store", value: "Google Play" },
                    { label: "Version", value: "α 0.4.2" },
                    { label: "Status", value: "Testing" },
                    { label: "Engine", value: "Custom" },
                    { label: "Genre", value: "Physics Action" },
                  ].map((d, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.06 }}>
                      <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-wider">{d.label}</p>
                      <p className="text-sm text-foreground font-mono mt-0.5">{d.value}</p>
                    </motion.div>
                  ))}
                </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="py-8 px-8 border border-border/20 rounded-xl bg-card/30 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
                <h3 className="text-xs font-mono text-primary/60 tracking-widest mb-6">MILESTONES</h3>
                <div className="space-y-4">
                  {[
                    { label: "Core Engine", status: "Complete", done: true },
                    { label: "Debt System", status: "Complete", done: true },
                    { label: "Threat AI", status: "Complete", done: true },
                    { label: "Level Design", status: "In Progress", done: false },
                    { label: "Balance Testing", status: "In Progress", done: false },
                    { label: "Play Store Launch", status: "Pending", done: false },
                  ].map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-3">
                      {m.done ? (
                        <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                      ) : (
                        <motion.div className="w-3.5 h-3.5 rounded-full border border-muted-foreground/30 flex-shrink-0"
                          animate={m.status === "In Progress" ? { borderColor: ["hsla(175,80%,40%,0.3)", "hsla(175,80%,40%,0.8)", "hsla(175,80%,40%,0.3)"] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      )}
                      <span className="text-sm flex-1">{m.label}</span>
                      <span className={`text-xs font-mono ${m.done ? "text-primary/60" : "text-muted-foreground/40"}`}>{m.status}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Notification signup */}
          <AnimatedSection delay={0.3}>
            <div className="max-w-xl mx-auto text-center py-12 px-8 border border-primary/10 rounded-xl relative overflow-hidden">
              <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent" animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ repeat: Infinity, duration: 4 }} />
              <div className="relative z-10">
                <Bell className="w-8 h-8 text-primary/60 mx-auto mb-4" />
                <h3 className="font-editorial text-2xl text-foreground mb-2">Get Notified on Launch</h3>
                <p className="text-sm text-muted-foreground/50 mb-6">Be the first to experience INERTIA DEBT.</p>
                {emailSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
                    <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="text-sm font-mono text-primary">Notification Registered</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); if (email) setEmailSubmitted(true); }} className="flex gap-2 max-w-sm mx-auto">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
                      className="flex-1 bg-card/30 border border-border/30 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30" />
                    <motion.button type="submit" className="bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-body" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      Notify
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ DEV LOGS ═══════════ */}
      <section id="dev-logs" className="py-32">
        <div className="container mx-auto px-4">
          <motion.div className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em] text-center mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            ENGINEERING RECORDS
          </motion.div>
          <motion.h2 className="font-editorial text-4xl md:text-6xl text-center text-foreground mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            DEVELOPMENT LOGS
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border/30" />
              <div className="space-y-6">
                {logs.map((log, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="relative pl-12">
                      <motion.div className="absolute left-2.5 top-2 w-3 h-3 rounded-full border border-primary/50 bg-background" whileInView={{ scale: [0, 1.2, 1] }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} />
                      <div className="py-5 px-6 border border-border/10 rounded-xl hover:border-border/30 transition-colors">
                        <div className="flex items-baseline justify-between mb-3">
                          <span className="font-mono text-sm text-primary/80 font-semibold">v{log.version}</span>
                          <span className="text-xs text-muted-foreground/40 font-mono">{log.date}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {log.changes.map((c, j) => (
                            <li key={j} className="text-sm text-muted-foreground/60 flex items-start gap-2">
                              <span className="text-primary/40 mt-0.5">›</span>{c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-32">
        <div className="container mx-auto px-4">
          <motion.div className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em] text-center mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            PROFESSIONAL INQUIRIES
          </motion.div>
          <motion.h2 className="font-editorial text-4xl md:text-6xl text-center text-foreground mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            CONTACT
          </motion.h2>

          <div className="max-w-lg mx-auto">
            <div className="py-8 px-8 border border-border/20 rounded-xl">
              {contactSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="text-sm font-mono text-primary">Message Received</p>
                  <p className="text-xs text-muted-foreground/50 mt-1">We will respond within 48 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4">
                  {["Name", "Email", "Subject"].map((field) => (
                    <div key={field}>
                      <label className="text-xs font-mono text-muted-foreground/40 uppercase tracking-wider">{field}</label>
                      <input type={field === "Email" ? "email" : "text"} required className="w-full mt-1 bg-card/20 border border-border/20 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30" />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-mono text-muted-foreground/40 uppercase tracking-wider">Message</label>
                    <textarea required rows={5} className="w-full mt-1 bg-card/20 border border-border/20 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 resize-none" />
                  </div>
                  <motion.button type="submit" className="w-full bg-primary/90 text-primary-foreground py-3 rounded-lg text-sm font-body" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    Send Inquiry
                  </motion.button>
                </form>
              )}
              <div className="mt-6 pt-6 border-t border-border/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground/30 uppercase">EMAIL</p>
                  <p className="text-sm text-muted-foreground/60">contact@scsstudio.com</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground/30 uppercase">LOCATION</p>
                  <p className="text-sm text-muted-foreground/60">India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PRIVACY ═══════════ */}
      <section id="privacy" className="py-24">
        <div className="container mx-auto px-4">
          <motion.h2 className="font-editorial text-3xl md:text-4xl text-center text-foreground mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Privacy Policy
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-6 text-sm text-muted-foreground/60">
            {[
              { t: "Overview", p: "SOHAN COMPUTER STORE (SCS) is committed to protecting user privacy. This policy outlines how we handle information in connection with INERTIA DEBT." },
              { t: "Offline Functionality", p: "INERTIA DEBT is designed to function primarily offline. Core gameplay does not require an internet connection." },
              { t: "Data Collection", p: "We do not collect, store, or transmit personal information. No accounts are required." },
              { t: "No Data Selling", p: "We do not sell, trade, or otherwise transfer personal data to third parties." },
              { t: "Platform Compliance", p: "INERTIA DEBT complies with Google Play Developer Program Policies." },
              { t: "Contact", p: "For privacy-related inquiries, contact us at contact@scsstudio.com." },
            ].map((s, i) => (
              <section key={i}><h3 className="font-display text-foreground/80 text-base mb-1">{s.t}</h3><p>{s.p}</p></section>
            ))}
            <p className="text-xs text-muted-foreground/30 pt-4">Last updated: January 2025</p>
          </div>
        </div>
      </section>

      {/* ═══════════ TERMS ═══════════ */}
      <section id="terms" className="py-24">
        <div className="container mx-auto px-4">
          <motion.h2 className="font-editorial text-3xl md:text-4xl text-center text-foreground mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Terms of Service
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-6 text-sm text-muted-foreground/60">
            {[
              { t: "Acceptance of Terms", p: "By downloading, installing, or using INERTIA DEBT, you agree to these Terms of Service." },
              { t: "License", p: "SCS grants you a limited, non-exclusive, non-transferable license to use INERTIA DEBT for personal, non-commercial purposes." },
              { t: "Intellectual Property", p: "All content, mechanics, visual assets, and code within INERTIA DEBT are the intellectual property of SOHAN COMPUTER STORE (SCS)." },
              { t: "User Conduct", p: "Users agree not to reverse-engineer, decompile, or attempt to extract source code from the application." },
              { t: "Disclaimer", p: "INERTIA DEBT is provided \"as is\" without warranties of any kind." },
              { t: "Modifications", p: "SCS reserves the right to modify these terms at any time." },
              { t: "Governing Law", p: "These terms are governed by the laws of India." },
            ].map((s, i) => (
              <section key={i}><h3 className="font-display text-foreground/80 text-base mb-1">{s.t}</h3><p>{s.p}</p></section>
            ))}
            <p className="text-xs text-muted-foreground/30 pt-4">Last updated: January 2025</p>
          </div>
        </div>
      </section>

      {/* Bottom sphere collapse moment */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 z-50"
        animate={{ 
          backgroundColor: sphereCollapsed ? "hsl(175, 80%, 40%)" : "transparent",
          scaleX: sphereCollapsed ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default Index;
