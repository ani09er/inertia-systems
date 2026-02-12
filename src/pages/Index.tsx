import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AnimatedSection from "../components/AnimatedSection";
import DebtMeter from "../components/DebtMeter";
import KineticSphere from "../components/KineticSphere";
import { AlertTriangle, TrendingUp, Lock, Zap, Shield, Target, Activity, Gauge, Timer, Flame, Star, Trophy, Smartphone, Download, Bell, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Rocket } from "lucide-react";
import logoImg from "@/assets/inertia-debt-logo.png";
import heroBanner from "@/assets/hero-banner.png";

/* ─── Animated Counter ─── */
const StatCounter = ({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (value - start) / (1500 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); } else { setCount(start); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return (
    <div ref={ref} className="text-center">
      <div className="stat-mono text-3xl md:text-4xl font-semibold">{count.toFixed(1)}{suffix}</div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
};

/* ─── Floating Particles ─── */
const FloatingParticle = ({ delay = 0, size = 2 }: { delay?: number; size?: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/30"
    style={{ width: size, height: size }}
    initial={{ opacity: 0, y: 100, x: Math.random() * 100 - 50 }}
    animate={{ opacity: [0, 0.6, 0], y: -200, x: Math.random() * 200 - 100 }}
    transition={{ repeat: Infinity, duration: 4 + Math.random() * 3, delay, ease: "easeOut" }}
  />
);

/* ─── Glowing Card ─── */
const GlowCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <AnimatedSection delay={delay}>
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 0 30px -5px hsla(175, 80%, 40%, 0.2)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`panel-glass rounded-xl p-6 border border-border/50 relative overflow-hidden group ${className}`}
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  </AnimatedSection>
);

/* ─── Data ─── */
const systems = [
  { title: "Auto-Movement Core", desc: "The player moves automatically. There is no idle state. Every frame generates kinetic output. The system never stops.", icon: Zap },
  { title: "Impulse Injection", desc: "Player input applies directional force, increasing velocity and accumulating movement debt. Every touch has consequences.", icon: Target },
  { title: "Debt Accumulation", desc: "Each impulse generates a proportional debt value. The faster you move, the more debt you carry. Speed is currency.", icon: Activity },
  { title: "Velocity Degradation", desc: "Unmanaged debt erodes velocity over time. Speed becomes a cost, not a resource. The system punishes neglect.", icon: Gauge },
  { title: "Settlement Recovery", desc: "Clearing debt windows restores velocity and stability. Timing is everything. Precision is survival.", icon: Timer },
];

const threats = [
  { icon: AlertTriangle, title: "COLLECTORS", subtitle: "Force Repayment Cycles", desc: "Autonomous entities that pursue the player during high-debt states, forcing immediate settlement or velocity sacrifice. They accelerate as your debt grows.", severity: "HIGH", color: "text-yellow-500" },
  { icon: TrendingUp, title: "INFLATORS", subtitle: "Multiply Debt Growth", desc: "Environmental hazards that apply debt multipliers. Entering their radius compounds existing debt exponentially. Invisible until triggered.", severity: "CRITICAL", color: "text-destructive" },
  { icon: Lock, title: "DEBT TRAPPERS", subtitle: "Lock Movement During Peak Debt", desc: "Zone-based constraints that freeze player movement when debt exceeds threshold, creating forced settlement scenarios. Escape requires precision timing.", severity: "SEVERE", color: "text-orange-500" },
];

const features = [
  { icon: Flame, title: "Real-Time Physics", desc: "Every frame calculates velocity, debt, and stability in real-time" },
  { icon: Shield, title: "Balance Engine", desc: "Proprietary algorithm ensures fair and challenging progression" },
  { icon: Star, title: "Precision Gameplay", desc: "Millisecond-level timing creates skill-based mastery curve" },
  { icon: Trophy, title: "Competitive Analytics", desc: "Deep performance tracking with credit rating system" },
];

const levels = [
  { phase: "EARLY", label: "Visible Debt Feedback", desc: "Clear UI indicators show debt in real-time. Players learn the cost of movement. Training wheels for the chaos ahead.", color: "text-primary" },
  { phase: "MID", label: "Hidden Multipliers", desc: "Debt multipliers become invisible. Players must internalize timing and rhythm. Intuition replaces information.", color: "text-accent" },
  { phase: "LATE", label: "Compound Debt Loops", desc: "Debt generates debt. Recovery windows shrink. Only precision survives. The system tests everything you've learned.", color: "text-destructive" },
];

const metrics = [
  { label: "Average Debt", value: 42.7, suffix: "" },
  { label: "Peak Debt", value: 94.3, suffix: "" },
  { label: "Velocity Collapse", value: 12.8, suffix: "/s" },
  { label: "Recovery Efficiency", value: 67.5, suffix: "%" },
];

const coreValues = ["Structure over spectacle", "Systems over shortcuts", "Intelligence over reaction", "Clarity over noise"];

const logs = [
  { version: "0.4.2", date: "2025-01-28", changes: ["Debt curve recalibrated for late-game balance", "Collector AI pathfinding optimized", "Settlement window timing adjusted: 2.0s → 1.8s", "New visual feedback for debt threshold warnings"] },
  { version: "0.4.1", date: "2025-01-15", changes: ["Velocity degradation formula refined", "Inflator radius reduced by 15%", "UI debt meter now updates at 60fps", "Added haptic feedback for debt spikes"] },
  { version: "0.4.0", date: "2025-01-02", changes: ["Compound debt loop system introduced", "New late-game arena: Pressure Chamber", "Recovery efficiency metric added to analytics", "Performance optimizations for low-end devices"] },
  { version: "0.3.8", date: "2024-12-18", changes: ["Debt Trapper mechanic implemented", "Balance sheet visualization overhauled", "Frame rate stabilization across low-end devices", "Tutorial system redesigned"] },
];

/* ═══════════════════════════════════ PAGE ═══════════════════════════════════ */
const Index = () => {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div>
      {/* ═══════════ HERO ═══════════ */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Hero banner bg */}
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity, scale: heroScale }}>
          <img src={heroBanner} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
          <KineticSphere />
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}>
              <FloatingParticle delay={i * 0.5} size={1 + Math.random() * 3} />
            </div>
          ))}
        </div>

        <motion.div className="container mx-auto px-4 relative z-10" style={{ y: heroY }}>
          <AnimatedSection>
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                  <Sparkles size={12} className="text-primary" />
                </motion.div>
                <span className="text-xs font-mono text-primary tracking-widest">A PHYSICS-BASED RISK SYSTEM</span>
              </motion.div>

              <motion.img src={logoImg} alt="INERTIA DEBT" className="h-24 md:h-32 lg:h-40 w-auto mb-8" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8, type: "spring" }} />

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="text-xl md:text-2xl text-muted-foreground font-body italic max-w-lg">
                "Every movement has a cost."
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-wrap gap-3 mt-10">
                <motion.button
                  onClick={() => document.getElementById("pre-launch")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 glow-teal"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px -5px hsla(175, 80%, 40%, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Pre-Launch Info <ArrowRight size={14} />
                </motion.button>
                <motion.button
                  onClick={() => document.getElementById("the-system")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm text-sm text-foreground hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore The System
                </motion.button>
              </motion.div>
            </div>
          </AnimatedSection>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-5 h-8 rounded-full border border-primary/30 flex items-start justify-center p-1">
            <motion.div className="w-1 h-2 rounded-full bg-primary" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
          </div>
        </motion.div>
      </section>

      {/* Intro */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <p className="text-base text-muted-foreground leading-relaxed">At <span className="text-foreground font-semibold">SOHAN COMPUTER STORE (SCS)</span>, we engineer systems-driven interactive experiences that challenge convention.</p>
              <div className="section-divider" />
              <p className="text-base text-muted-foreground leading-relaxed"><span className="text-primary font-semibold">INERTIA DEBT</span> is a physics action game built on one principle:</p>
              <div className="space-y-2">
                {["Movement creates debt.", "Debt must be managed.", "Mismanagement collapses the system."].map((text, i) => (
                  <motion.p key={i} className="font-display text-lg text-foreground" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }}>
                    {text}
                  </motion.p>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <GlowCard key={i} delay={i * 0.1}>
                <motion.div whileHover={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 0.5 }}>
                  <f.icon className="w-8 h-8 text-primary mb-3" />
                </motion.div>
                <h3 className="font-display text-sm font-semibold mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-xl p-8 md:p-12 glow-teal-sm">
              <h2 className="text-xs text-muted-foreground uppercase tracking-widest mb-8 text-center font-mono">Real-Time System Telemetry</h2>
              <div className="grid grid-cols-3 gap-8 mb-10">
                <StatCounter label="Debt Index" value={47.3} />
                <StatCounter label="Velocity" value={82.1} suffix="m/s" />
                <StatCounter label="Stability" value={91.6} suffix="%" />
              </div>
              <div className="space-y-4 max-w-md mx-auto">
                <DebtMeter label="Active Debt" value={47.3} />
                <DebtMeter label="Velocity Output" value={82.1} />
                <DebtMeter label="System Stability" value={91.6} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ THE SYSTEM ═══════════ */}
      <section id="the-system" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-20">
              <motion.div whileInView={{ scale: [0.8, 1] }} viewport={{ once: true }} className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <span className="text-xs font-mono text-primary tracking-widest">CORE ARCHITECTURE</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">THE INERTIA ENGINE</h2>
              <p className="text-sm text-muted-foreground mt-4 max-w-lg mx-auto">Five interconnected systems working in harmony to create a gameplay experience unlike anything else.</p>
            </div>
          </AnimatedSection>

          <div className="space-y-4 max-w-3xl mx-auto">
            {systems.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 8, borderColor: "hsl(175, 80%, 40%)", boxShadow: "0 0 20px -5px hsla(175, 80%, 40%, 0.15)" }}
                  transition={{ duration: 0.3 }}
                  className="panel-glass rounded-xl p-6 border-l-2 border-transparent cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <span className="stat-mono text-sm opacity-50">{String(i + 1).padStart(2, "0")}</span>
                      <s.icon size={18} className="text-primary/60" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Graph */}
          <AnimatedSection delay={0.3} className="mt-20">
            <div className="panel-glass rounded-xl p-8 max-w-3xl mx-auto">
              <h3 className="text-xs font-mono text-primary tracking-widest mb-6 text-center">IMPULSE → DEBT SPIKE → VELOCITY DROP → RECOVERY</h3>
              <div className="h-48 relative overflow-hidden rounded-lg bg-navy-deep/30">
                <svg viewBox="0 0 400 140" className="w-full h-full" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[20, 50, 80, 110].map((y) => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="hsla(215, 25%, 18%, 0.5)" strokeWidth="0.5" />)}
                  <motion.path d="M0,120 C30,120 50,20 80,15 C110,10 130,100 180,105 C230,110 250,50 300,45 C350,40 370,70 400,35" fill="none" stroke="hsl(175, 80%, 40%)" strokeWidth="2.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, delay: 0.3 }} />
                  <motion.path d="M0,90 C30,90 60,110 80,115 C100,120 120,25 180,60 C240,95 270,85 300,88 C330,91 370,55 400,65" fill="none" stroke="hsl(185, 65%, 50%)" strokeWidth="1.5" strokeDasharray="5,5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, delay: 0.6 }} />
                  <motion.path d="M0,60 C50,60 70,70 100,65 C130,60 160,80 200,75 C240,70 280,40 340,35 C360,33 380,30 400,25" fill="none" stroke="hsl(0, 72%, 50%)" strokeWidth="1" strokeDasharray="3,6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, delay: 0.9 }} />
                </svg>
                <div className="absolute bottom-2 right-3 flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary inline-block rounded" /> Velocity</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-accent inline-block rounded" /> Debt</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-destructive inline-block rounded" /> Risk</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Tech panels */}
          <AnimatedSection delay={0.2} className="mt-12">
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                { title: "Debt Threshold Rules", desc: "Debt exceeding 80% triggers velocity penalties. At 100%, system collapse initiates. The threshold is non-negotiable." },
                { title: "Velocity Decay Formula", desc: "V(t) = V₀ × e^(-λt) where λ scales with active debt ratio. Higher debt means faster decay." },
                { title: "Settlement Windows", desc: "Periodic 2-second windows allow debt clearance. Missing windows compounds interest at 1.5x rate." },
                { title: "Collapse Conditions", desc: "Full collapse occurs when debt ≥ 100% and velocity ≤ 10%. Recovery requires a 5-second cooldown." },
              ].map((panel, i) => (
                <motion.div key={i} whileHover={{ scale: 1.02, boxShadow: "0 0 20px -5px hsla(175, 80%, 40%, 0.1)" }} className="panel-glass rounded-xl p-5">
                  <h4 className="font-mono text-xs text-primary mb-2">{panel.title}</h4>
                  <p className="text-sm text-muted-foreground">{panel.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ THREATS ═══════════ */}
      <section id="threats" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-20">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block px-4 py-1 rounded-full border border-destructive/20 bg-destructive/5 mb-4">
                <span className="text-xs font-mono text-destructive tracking-widest">⚠ THREAT CLASSIFICATION</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">DEBT ENFORCEMENT<br />SYSTEMS</h2>
              <p className="text-sm text-muted-foreground mt-4 max-w-lg mx-auto">Three classes of adversaries designed to punish reckless movement and reward disciplined play.</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {threats.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8, borderColor: "hsl(0, 72%, 50%)", boxShadow: "0 20px 40px -15px hsla(0, 72%, 50%, 0.2)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="panel-glass rounded-xl p-6 border border-border/50 relative overflow-hidden group h-full"
                >
                  <motion.div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-destructive/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-0 right-0 px-2 py-1 bg-destructive/10 text-destructive text-xs font-mono rounded-bl">{t.severity}</div>
                  <motion.div whileHover={{ rotate: [0, -10, 10, -5, 0] }} transition={{ duration: 0.5 }}>
                    <t.icon className="w-10 h-10 text-destructive mb-4" />
                  </motion.div>
                  <h3 className="font-display text-xl font-bold mb-1">{t.title}</h3>
                  <p className="text-xs text-primary font-mono mb-3">{t.subtitle}</p>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Scenario */}
          <AnimatedSection delay={0.3} className="mt-16">
            <div className="panel-glass rounded-xl p-8 max-w-3xl mx-auto text-center">
              <h3 className="text-xs font-mono text-primary tracking-widest mb-6">SIMULATED THREAT ENCOUNTER</h3>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {["IMPULSE", "→", "COLLECTOR DETECTED", "→", "DEBT SPIKE", "→", "VELOCITY LOCK", "→", "FORCED SETTLEMENT"].map((step, i) => (
                  <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                    className={step === "→" ? "text-muted-foreground/50" : "px-3 py-1.5 rounded-lg border border-border bg-muted/30 text-xs font-mono text-foreground"}>
                    {step}
                  </motion.span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ HEALTH ═══════════ */}
      <section id="health" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <span className="text-xs font-mono text-primary tracking-widest">INTEGRITY MONITORING</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">SYSTEM STABILITY</h2>
              <p className="text-sm text-muted-foreground mt-4 max-w-lg mx-auto">Your health isn't hit points — it's the structural integrity of your financial balance sheet.</p>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-8">
            <AnimatedSection delay={0.1}>
              <div className="panel-glass rounded-xl p-8">
                <h3 className="font-mono text-xs text-primary tracking-widest mb-4">BALANCE SHEET INTEGRITY</h3>
                <p className="text-sm text-muted-foreground mb-6">Health in INERTIA DEBT represents the structural integrity of the player's financial balance sheet. Debt overload drains stability. Clean settlement cycles restore it. Every decision matters.</p>
                <div className="space-y-4">
                  <DebtMeter label="Structural Integrity" value={78.5} />
                  <DebtMeter label="Debt Load" value={34.2} />
                  <DebtMeter label="Recovery Rate" value={62.0} />
                  <DebtMeter label="Collapse Proximity" value={15.8} />
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} className="panel-glass rounded-xl p-6 border-l-2 border-destructive/50">
                  <h4 className="font-mono text-xs text-destructive mb-3">OVERLOAD STATE</h4>
                  <p className="text-sm text-muted-foreground">When debt exceeds capacity, stability drops per frame. Visual distortion increases. Controls degrade. The screen itself fights you.</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="panel-glass rounded-xl p-6 border-l-2 border-primary/50">
                  <h4 className="font-mono text-xs text-primary mb-3">RECOVERY STATE</h4>
                  <p className="text-sm text-muted-foreground">Successful debt settlements restore stability points. Clean movement chains multiply recovery rate. Discipline is rewarded.</p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ LEVELS ═══════════ */}
      <section id="levels" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <span className="text-xs font-mono text-primary tracking-widest">PROGRESSIVE COMPLEXITY</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">STRUCTURED ARENAS</h2>
              <p className="text-sm text-muted-foreground mt-4 max-w-lg mx-auto">Each level introduces a new debt rule. Mastery of previous rules is required for progression. No shortcuts.</p>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-6">
            {levels.map((l, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <motion.div whileHover={{ x: 6, boxShadow: "0 0 20px -5px hsla(175, 80%, 40%, 0.1)" }} className="panel-glass rounded-xl p-6 flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className={`font-mono text-xs ${l.color} tracking-widest`}>{l.phase}</div>
                    <div className="w-12 h-px bg-border mt-2" />
                    <div className="mt-2 text-xs text-muted-foreground/40 font-mono">LVL {i + 1}</div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1">{l.label}</h3>
                    <p className="text-sm text-muted-foreground">{l.desc}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Progress flow */}
          <AnimatedSection delay={0.3} className="mt-16">
            <div className="panel-glass rounded-xl p-8 max-w-3xl mx-auto">
              <h3 className="text-xs font-mono text-primary tracking-widest mb-8 text-center">MASTERY PROGRESSION</h3>
              <div className="flex items-center justify-between gap-1">
                {["Learn", "Adapt", "Internalize", "Master", "Survive"].map((step, i) => (
                  <div key={i} className="flex items-center gap-1 flex-1">
                    <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
                      className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5 flex-shrink-0 relative">
                      <span className="text-xs font-mono text-primary">{i + 1}</span>
                      {i === 4 && <motion.div className="absolute inset-0 rounded-full border border-primary/30" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} />}
                    </motion.div>
                    {i < 4 && <motion.div className="h-px flex-1 bg-border" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.15 }} />}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 px-1">
                {["Learn", "Adapt", "Internalize", "Master", "Survive"].map((step, i) => (
                  <span key={i} className="text-xs text-muted-foreground w-12 text-center">{step}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ ANALYTICS ═══════════ */}
      <section id="analytics" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <span className="text-xs font-mono text-primary tracking-widest">DATA-DRIVEN PERFORMANCE</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">PERFORMANCE<br />ANALYTICS</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-xl p-8 max-w-3xl mx-auto mb-8">
              <div className="flex items-center gap-4 mb-6">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="w-14 h-14 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center">
                  <span className="font-mono text-primary text-sm font-bold">P1</span>
                </motion.div>
                <div>
                  <h3 className="font-display text-lg font-semibold">Player Profile</h3>
                  <p className="text-xs font-mono text-primary">CREDIT RATING: A- · TIER: ELITE</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Matches", val: "147" }, { label: "Wins", val: "89" },
                  { label: "Collapses", val: "23" }, { label: "Win Rate", val: "60.5%" },
                ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-muted/30 rounded-lg p-3 text-center border border-border/30">
                    <span className="text-lg font-mono text-primary font-semibold">{stat.val}</span>
                    <span className="text-xs text-muted-foreground block mt-0.5">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="panel-glass rounded-xl p-8 max-w-3xl mx-auto">
              <h3 className="text-xs font-mono text-primary tracking-widest mb-6">TRACKED METRICS</h3>
              <div className="space-y-5">
                {metrics.map((m, i) => <DebtMeter key={i} label={m.label} value={m.value} suffix={m.suffix} />)}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ PRE-LAUNCH (PREMIUM) ═══════════ */}
      <section id="pre-launch" className="py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ repeat: Infinity, duration: 6 }} />
          <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-soft/5 blur-3xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 8 }} />
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}>
              <FloatingParticle delay={i * 0.3} size={1 + Math.random() * 2} />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="inline-block mb-6">
                <motion.img src={logoImg} alt="INERTIA DEBT" className="h-28 md:h-36 w-auto mx-auto glow-teal" whileHover={{ scale: 1.05 }} />
              </motion.div>

              <motion.div whileInView={{ scale: [0.9, 1] }} viewport={{ once: true }} className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4">
                <span className="text-xs font-mono text-primary tracking-widest flex items-center gap-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}><Rocket size={12} /></motion.div>
                  DEPLOYMENT STATUS
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mt-4">
                <span className="text-gradient-teal">SYSTEM</span> <span className="text-foreground">DEPLOYMENT</span>
              </h2>
              <p className="text-base text-muted-foreground mt-4 max-w-lg mx-auto">The most anticipated physics-based action game is preparing for launch.</p>
            </div>
          </AnimatedSection>

          {/* Status cards */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
            <AnimatedSection delay={0.1}>
              <motion.div whileHover={{ y: -4, boxShadow: "0 20px 40px -15px hsla(175, 80%, 40%, 0.15)" }} className="panel-glass rounded-xl p-8 border border-primary/10 h-full">
                <h3 className="text-xs font-mono text-primary tracking-widest mb-6">DEPLOYMENT DETAILS</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Status", value: "In Development", icon: Activity },
                    { label: "Platform", value: "Android", icon: Smartphone },
                    { label: "Distribution", value: "Google Play", icon: Download },
                    { label: "Build", value: "v0.4.2-alpha", icon: Zap },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg border border-primary/20 bg-primary/5 flex items-center justify-center flex-shrink-0">
                        <item.icon size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-mono uppercase">{item.label}</p>
                        <p className="text-sm font-semibold mt-0.5">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-8 pt-6 border-t border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-xs font-mono text-primary">BALANCE TESTING</span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">62%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" initial={{ width: "0%" }} whileInView={{ width: "62%" }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.5 }} />
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div whileHover={{ y: -4, boxShadow: "0 20px 40px -15px hsla(175, 80%, 40%, 0.15)" }} className="panel-glass rounded-xl p-8 border border-primary/10 h-full">
                <h3 className="text-xs font-mono text-primary tracking-widest mb-6">DEVELOPMENT MILESTONES</h3>
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
                        <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                      ) : (
                        <motion.div className="w-4 h-4 rounded-full border border-muted-foreground/30 flex-shrink-0" animate={m.status === "In Progress" ? { borderColor: ["hsla(175,80%,40%,0.3)", "hsla(175,80%,40%,0.8)", "hsla(175,80%,40%,0.3)"] } : {}} transition={{ repeat: Infinity, duration: 2 }} />
                      )}
                      <span className="text-sm flex-1">{m.label}</span>
                      <span className={`text-xs font-mono ${m.done ? "text-primary" : "text-muted-foreground"}`}>{m.status}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Notification signup */}
          <AnimatedSection delay={0.3}>
            <motion.div whileHover={{ boxShadow: "0 0 50px -10px hsla(175, 80%, 40%, 0.2)" }} className="panel-glass rounded-xl p-10 max-w-2xl mx-auto text-center border border-primary/20 relative overflow-hidden">
              <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-soft/5" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 4 }} />
              <div className="relative z-10">
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <Bell className="w-10 h-10 text-primary mx-auto mb-4" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold mb-2">Get Notified on Launch</h3>
                <p className="text-sm text-muted-foreground mb-6">Be the first to experience INERTIA DEBT when it drops on Google Play.</p>
                {emailSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: 3, duration: 0.3 }}>
                      <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                    </motion.div>
                    <p className="text-lg font-semibold text-primary font-mono">Notification Registered</p>
                    <p className="text-xs text-muted-foreground mt-1">You'll be notified when INERTIA DEBT launches.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); if (email) setEmailSubmitted(true); }} className="flex gap-2 max-w-sm mx-auto">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
                      className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 backdrop-blur-sm" />
                    <motion.button type="submit" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                      Notify <Bell size={14} />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <p className="text-sm text-muted-foreground text-center mt-8 max-w-lg mx-auto">INERTIA DEBT is currently under structured testing at SOHAN COMPUTER STORE (SCS). Release will follow full balance validation and platform compliance review.</p>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ STUDIO ═══════════ */}
      <section id="studio" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <span className="text-xs font-mono text-primary tracking-widest">STUDIO PROFILE</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">SOHAN COMPUTER<br />STORE <span className="text-primary">(SCS)</span></h2>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-8">
            <AnimatedSection delay={0.1}>
              <div className="panel-glass rounded-xl p-8">
                <p className="text-base text-muted-foreground leading-relaxed mb-4">SCS is a technology-focused studio exploring structured system design in interactive media. Founded with a vision to create experiences that respect player intelligence.</p>
                <p className="text-base text-muted-foreground leading-relaxed">We apply computational thinking, balance theory, and disciplined mechanics to every project. Our work isn't about flashy graphics — it's about systems that feel inevitable.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="panel-glass rounded-xl p-8">
                <h3 className="text-xs font-mono text-primary tracking-widest mb-6">CORE VALUES</h3>
                <div className="space-y-4">
                  {coreValues.map((v, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.12 }}
                      className="flex items-center gap-4 group">
                      <motion.div whileHover={{ scale: 1.3, backgroundColor: "hsla(175, 80%, 40%, 0.3)" }} className="w-2 h-2 rounded-full bg-primary flex-shrink-0 transition-colors" />
                      <span className="font-display text-lg text-foreground group-hover:text-primary transition-colors">{v}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: "Founded", value: "India" },
                  { label: "Focus", value: "System Design" },
                  { label: "First Title", value: "INERTIA DEBT" },
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.03 }} className="panel-glass rounded-xl p-5 text-center">
                    <p className="text-xs text-muted-foreground font-mono uppercase mb-1">{item.label}</p>
                    <p className="font-display font-semibold text-primary">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ DEV LOGS ═══════════ */}
      <section id="dev-logs" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <span className="text-xs font-mono text-primary tracking-widest">ENGINEERING RECORDS</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">DEVELOPMENT LOGS</h2>
              <p className="text-sm text-muted-foreground mt-4">Transparent engineering updates from the SCS development team.</p>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-6">
                {logs.map((log, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="relative pl-12">
                      <motion.div className="absolute left-2.5 top-2 w-3 h-3 rounded-full border-2 border-primary bg-background" whileInView={{ scale: [0, 1.2, 1] }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} />
                      <motion.div whileHover={{ x: 4 }} className="panel-glass rounded-xl p-6">
                        <div className="flex items-baseline justify-between mb-3">
                          <span className="font-mono text-sm text-primary font-semibold">v{log.version}</span>
                          <span className="text-xs text-muted-foreground font-mono">{log.date}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {log.changes.map((c, j) => (
                            <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">›</span>{c}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <span className="text-xs font-mono text-primary tracking-widest">PROFESSIONAL INQUIRIES</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">CONTACT</h2>
            </div>
          </AnimatedSection>

          <div className="max-w-lg mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="panel-glass rounded-xl p-8">
                {contactSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                    <p className="text-lg font-semibold text-primary font-mono">Message Received</p>
                    <p className="text-sm text-muted-foreground mt-1">We will respond within 48 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4">
                    {["Name", "Email", "Subject"].map((field) => (
                      <div key={field}>
                        <label className="text-xs font-mono text-muted-foreground uppercase">{field}</label>
                        <input type={field === "Email" ? "email" : "text"} required className="w-full mt-1 bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50" />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs font-mono text-muted-foreground uppercase">Message</label>
                      <textarea required rows={5} className="w-full mt-1 bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none" />
                    </div>
                    <motion.button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      Send Inquiry
                    </motion.button>
                  </form>
                )}
                <div className="mt-6 pt-6 border-t border-border/50 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-mono text-primary mb-1">EMAIL</p>
                    <p className="text-sm text-muted-foreground">contact@scsstudio.com</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-primary mb-1">LOCATION</p>
                    <p className="text-sm text-muted-foreground">India</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ PRIVACY ═══════════ */}
      <section id="privacy" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <span className="text-xs font-mono text-primary tracking-widest">LEGAL</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">PRIVACY POLICY</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-xl p-8 max-w-3xl mx-auto">
              <div className="space-y-6 text-sm text-muted-foreground">
                {[
                  { t: "Overview", p: "SOHAN COMPUTER STORE (SCS) is committed to protecting user privacy. This policy outlines how we handle information in connection with INERTIA DEBT." },
                  { t: "Offline Functionality", p: "INERTIA DEBT is designed to function primarily offline. Core gameplay does not require an internet connection and no personal data is transmitted during gameplay sessions." },
                  { t: "Data Collection", p: "We do not collect, store, or transmit personal information. No accounts are required. No analytics tracking is embedded in the application beyond standard platform metrics provided by Google Play." },
                  { t: "No Data Selling", p: "We do not sell, trade, or otherwise transfer personal data to third parties. This is a firm policy of SOHAN COMPUTER STORE." },
                  { t: "Platform Compliance", p: "INERTIA DEBT complies with Google Play Developer Program Policies, including data handling, content guidelines, and user privacy requirements." },
                  { t: "Contact", p: "For privacy-related inquiries, contact us at contact@scsstudio.com." },
                ].map((s, i) => (
                  <section key={i}><h3 className="font-display text-foreground text-lg mb-2">{s.t}</h3><p>{s.p}</p></section>
                ))}
                <p className="text-xs text-muted-foreground/60 pt-4">Last updated: January 2025</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ TERMS ═══════════ */}
      <section id="terms" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <span className="text-xs font-mono text-primary tracking-widest">LEGAL</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">TERMS OF SERVICE</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-xl p-8 max-w-3xl mx-auto">
              <div className="space-y-6 text-sm text-muted-foreground">
                {[
                  { t: "Acceptance of Terms", p: "By downloading, installing, or using INERTIA DEBT, you agree to these Terms of Service. If you do not agree, do not use the application." },
                  { t: "License", p: "SOHAN COMPUTER STORE (SCS) grants you a limited, non-exclusive, non-transferable license to use INERTIA DEBT for personal, non-commercial purposes." },
                  { t: "Intellectual Property", p: "All content, mechanics, visual assets, and code within INERTIA DEBT are the intellectual property of SOHAN COMPUTER STORE (SCS). Unauthorized reproduction or distribution is prohibited." },
                  { t: "User Conduct", p: "Users agree not to reverse-engineer, decompile, or attempt to extract source code from the application. Modification or redistribution of the application is strictly prohibited." },
                  { t: "Disclaimer", p: "INERTIA DEBT is provided \"as is\" without warranties of any kind. SCS is not liable for any damages arising from use of the application." },
                  { t: "Modifications", p: "SCS reserves the right to modify these terms at any time. Continued use of the application constitutes acceptance of updated terms." },
                  { t: "Governing Law", p: "These terms are governed by the laws of India. Any disputes shall be resolved in the appropriate courts of India." },
                ].map((s, i) => (
                  <section key={i}><h3 className="font-display text-foreground text-lg mb-2">{s.t}</h3><p>{s.p}</p></section>
                ))}
                <p className="text-xs text-muted-foreground/60 pt-4">Last updated: January 2025</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
