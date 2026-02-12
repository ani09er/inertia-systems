import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AnimatedSection from "../components/AnimatedSection";
import DebtMeter from "../components/DebtMeter";
import KineticSphere from "../components/KineticSphere";
import { AlertTriangle, TrendingUp, Lock } from "lucide-react";

/* ─── Helpers ─── */
const StatCounter = ({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const step = (end - start) / (1500 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); } else { setCount(start); }
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

/* ─── Data ─── */
const systems = [
  { title: "Auto-Movement Core", desc: "The player moves automatically. There is no idle state. Every frame generates kinetic output." },
  { title: "Impulse Injection", desc: "Player input applies directional force, increasing velocity and accumulating movement debt." },
  { title: "Debt Accumulation", desc: "Each impulse generates a proportional debt value. The faster you move, the more debt you carry." },
  { title: "Velocity Degradation", desc: "Unmanaged debt erodes velocity over time. Speed becomes a cost, not a resource." },
  { title: "Settlement Recovery", desc: "Clearing debt windows restores velocity and stability. Timing is everything." },
];

const threats = [
  { icon: AlertTriangle, title: "COLLECTORS", subtitle: "Force Repayment Cycles", desc: "Autonomous entities that pursue the player during high-debt states, forcing immediate settlement or velocity sacrifice.", severity: "HIGH" },
  { icon: TrendingUp, title: "INFLATORS", subtitle: "Multiply Debt Growth", desc: "Environmental hazards that apply debt multipliers. Entering their radius compounds existing debt exponentially.", severity: "CRITICAL" },
  { icon: Lock, title: "DEBT TRAPPERS", subtitle: "Lock Movement During Peak Debt", desc: "Zone-based constraints that freeze player movement when debt exceeds threshold, creating forced settlement scenarios.", severity: "SEVERE" },
];

const levels = [
  { phase: "EARLY", label: "Visible Debt Feedback", desc: "Clear UI indicators show debt in real-time. Players learn the cost of movement.", color: "text-primary" },
  { phase: "MID", label: "Hidden Multipliers", desc: "Debt multipliers become invisible. Players must internalize timing and rhythm.", color: "text-accent" },
  { phase: "LATE", label: "Compound Debt Loops", desc: "Debt generates debt. Recovery windows shrink. Only precision survives.", color: "text-destructive" },
];

const metrics = [
  { label: "Average Debt", value: 42.7, suffix: "" },
  { label: "Peak Debt", value: 94.3, suffix: "" },
  { label: "Velocity Collapse", value: 12.8, suffix: "/s" },
  { label: "Recovery Efficiency", value: 67.5, suffix: "%" },
];

const values = ["Structure over spectacle", "Systems over shortcuts", "Intelligence over reaction", "Clarity over noise"];

const logs = [
  { version: "0.4.2", date: "2025-01-28", changes: ["Debt curve recalibrated for late-game balance", "Collector AI pathfinding optimized", "Settlement window timing adjusted: 2.0s → 1.8s"] },
  { version: "0.4.1", date: "2025-01-15", changes: ["Velocity degradation formula refined", "Inflator radius reduced by 15%", "UI debt meter now updates at 60fps"] },
  { version: "0.4.0", date: "2025-01-02", changes: ["Compound debt loop system introduced", "New late-game arena: Pressure Chamber", "Recovery efficiency metric added to analytics"] },
  { version: "0.3.8", date: "2024-12-18", changes: ["Debt Trapper mechanic implemented", "Balance sheet visualization overhauled", "Frame rate stabilization across low-end devices"] },
];

/* ─── Page ─── */
const Index = () => {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  return (
    <div>
      {/* ═══════════ HERO ═══════════ */}
      <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0"><KineticSphere /></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-block px-3 py-1 rounded-sm border border-primary/30 bg-primary/5 mb-6">
                <span className="text-xs font-mono text-primary tracking-widest">A PHYSICS-BASED RISK SYSTEM</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none mb-6">
                <span className="text-gradient-teal">INERTIA</span><br /><span className="text-foreground">DEBT</span>
              </h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-lg md:text-xl text-muted-foreground font-body italic">
                "Every movement has a cost."
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <p className="text-sm text-muted-foreground leading-relaxed">At <span className="text-foreground font-semibold">SOHAN COMPUTER STORE (SCS)</span>, we engineer systems-driven interactive experiences.</p>
              <div className="section-divider" />
              <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-primary font-semibold">INERTIA DEBT</span> is a physics action game built on one principle:</p>
              <div className="space-y-1">
                <p className="font-display text-foreground">Movement creates debt.</p>
                <p className="font-display text-foreground">Debt must be managed.</p>
                <p className="font-display text-foreground">Mismanagement collapses the system.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-lg p-8 md:p-12">
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
      <section id="the-system" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-primary tracking-widest mb-4">CORE ARCHITECTURE</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold">THE INERTIA ENGINE</h2>
            </div>
          </AnimatedSection>
          <div className="space-y-4 max-w-3xl mx-auto">
            {systems.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div whileHover={{ x: 8, borderColor: "hsl(175, 80%, 40%)" }} transition={{ duration: 0.3 }} className="panel-glass rounded-lg p-6 border-l-2 border-transparent cursor-default">
                  <div className="flex items-start gap-4">
                    <span className="stat-mono text-sm opacity-50">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3} className="mt-20">
            <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto">
              <h3 className="text-xs font-mono text-primary tracking-widest mb-6 text-center">IMPULSE → DEBT SPIKE → VELOCITY DROP → RECOVERY</h3>
              <div className="h-40 relative overflow-hidden rounded">
                <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
                  <motion.path d="M0,100 C50,100 60,20 100,20 C140,20 150,90 200,90 C250,90 260,50 300,50 C340,50 360,70 400,40" fill="none" stroke="hsl(175, 80%, 40%)" strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.5 }} />
                  <motion.path d="M0,80 C50,80 70,100 100,100 C130,100 140,30 200,60 C260,90 280,80 300,85 C320,90 360,60 400,70" fill="none" stroke="hsl(185, 65%, 50%)" strokeWidth="1.5" strokeDasharray="4,4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.8 }} />
                </svg>
                <div className="absolute bottom-2 right-3 flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="w-3 h-px bg-primary inline-block" /> Velocity</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-px bg-accent inline-block" /> Debt</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="mt-16">
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                { title: "Debt Threshold Rules", desc: "Debt exceeding 80% triggers velocity penalties. At 100%, system collapse initiates." },
                { title: "Velocity Decay Formula", desc: "V(t) = V₀ × e^(-λt) where λ scales with active debt ratio." },
                { title: "Settlement Windows", desc: "Periodic 2-second windows allow debt clearance. Missing windows compounds interest." },
                { title: "Collapse Conditions", desc: "Full collapse occurs when debt ≥ 100% and velocity ≤ 10%. Recovery requires cooldown." },
              ].map((panel, i) => (
                <motion.div key={i} whileHover={{ scale: 1.02 }} className="panel-glass rounded-lg p-5">
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
      <section id="threats" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-destructive tracking-widest mb-4">⚠ THREAT CLASSIFICATION</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold">DEBT ENFORCEMENT<br />SYSTEMS</h2>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {threats.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <motion.div whileHover={{ y: -4, borderColor: "hsl(0, 72%, 50%)" }} transition={{ duration: 0.3 }} className="panel-glass rounded-lg p-6 border border-border/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 px-2 py-1 bg-destructive/10 text-destructive text-xs font-mono rounded-bl">{t.severity}</div>
                  <t.icon className="w-8 h-8 text-destructive mb-4 group-hover:animate-flicker" />
                  <h3 className="font-display text-xl font-bold mb-1">{t.title}</h3>
                  <p className="text-xs text-primary font-mono mb-3">{t.subtitle}</p>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.4} className="mt-20">
            <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto text-center">
              <h3 className="text-xs font-mono text-primary tracking-widest mb-6">SIMULATED THREAT ENCOUNTER</h3>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {["IMPULSE", "→", "COLLECTOR DETECTED", "→", "DEBT SPIKE", "→", "FORCED SETTLEMENT"].map((step, i) => (
                  <motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                    className={step === "→" ? "text-muted-foreground" : "px-3 py-1.5 rounded-sm border border-border bg-muted/50 text-xs font-mono text-foreground"}>
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
      <section id="health" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-primary tracking-widest mb-4">INTEGRITY MONITORING</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold">SYSTEM STABILITY</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-8">
            <AnimatedSection delay={0.1}>
              <div className="panel-glass rounded-lg p-8">
                <h3 className="font-mono text-xs text-primary tracking-widest mb-4">BALANCE SHEET INTEGRITY</h3>
                <p className="text-sm text-muted-foreground mb-6">Health in INERTIA DEBT represents the structural integrity of the player's financial balance sheet. Debt overload drains stability. Clean settlement cycles restore it.</p>
                <div className="space-y-4">
                  <DebtMeter label="Structural Integrity" value={78.5} />
                  <DebtMeter label="Debt Load" value={34.2} />
                  <DebtMeter label="Recovery Rate" value={62.0} />
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="panel-glass rounded-lg p-6">
                  <h4 className="font-mono text-xs text-destructive mb-3">OVERLOAD STATE</h4>
                  <p className="text-sm text-muted-foreground">When debt exceeds capacity, stability drops per frame. Visual distortion increases. Controls degrade.</p>
                </div>
                <div className="panel-glass rounded-lg p-6">
                  <h4 className="font-mono text-xs text-primary mb-3">RECOVERY STATE</h4>
                  <p className="text-sm text-muted-foreground">Successful debt settlements restore stability points. Clean movement chains multiply recovery rate.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ LEVELS ═══════════ */}
      <section id="levels" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-primary tracking-widest mb-4">PROGRESSIVE COMPLEXITY</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold">STRUCTURED ARENAS</h2>
              <p className="text-sm text-muted-foreground mt-4 max-w-lg mx-auto">Each level introduces a new debt rule. Mastery of previous rules is required for progression.</p>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-6">
            {levels.map((l, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <motion.div whileHover={{ x: 6 }} className="panel-glass rounded-lg p-6 flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className={`font-mono text-xs ${l.color} tracking-widest`}>{l.phase}</div>
                    <div className="w-12 h-px bg-border mt-2" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1">{l.label}</h3>
                    <p className="text-sm text-muted-foreground">{l.desc}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.4} className="mt-16">
            <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto">
              <h3 className="text-xs font-mono text-primary tracking-widest mb-6 text-center">PROGRESSION FLOW</h3>
              <div className="flex items-center justify-between gap-2">
                {["Learn", "Adapt", "Internalize", "Master", "Survive"].map((step, i) => (
                  <div key={i} className="flex items-center gap-2 flex-1">
                    <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15, type: "spring" }} className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5 flex-shrink-0">
                      <span className="text-xs font-mono text-primary">{i + 1}</span>
                    </motion.div>
                    {i < 4 && <div className="h-px flex-1 bg-border" />}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 px-1">
                {["Learn", "Adapt", "Internalize", "Master", "Survive"].map((step, i) => (
                  <span key={i} className="text-xs text-muted-foreground w-10 text-center">{step}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ ANALYTICS ═══════════ */}
      <section id="analytics" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-primary tracking-widest mb-4">DATA-DRIVEN PERFORMANCE</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold">PERFORMANCE<br />ANALYTICS</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center">
                  <span className="font-mono text-primary text-sm">P1</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">Player Profile</h3>
                  <p className="text-xs font-mono text-primary">CREDIT RATING: A-</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Matches: 147", "Wins: 89", "Collapses: 23", "Rank: Elite"].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-muted/50 rounded p-3 text-center">
                    <span className="text-xs font-mono text-muted-foreground">{stat}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto">
              <h3 className="text-xs font-mono text-primary tracking-widest mb-6">TRACKED METRICS</h3>
              <div className="space-y-5">
                {metrics.map((m, i) => <DebtMeter key={i} label={m.label} value={m.value} suffix={m.suffix} />)}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ PRE-LAUNCH ═══════════ */}
      <section id="pre-launch" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-primary tracking-widest mb-4">DEPLOYMENT STATUS</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold">SYSTEM DEPLOYMENT<br />STATUS</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-2xl mx-auto space-y-6">
            <AnimatedSection delay={0.1}>
              <div className="panel-glass rounded-lg p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[{ label: "Status", value: "In Development" }, { label: "Platform", value: "Android (Google Play)" }, { label: "Phase", value: "Internal Testing" }, { label: "Build", value: "v0.4.2-alpha" }].map((item, i) => (
                    <div key={i}><p className="text-xs text-muted-foreground font-mono uppercase">{item.label}</p><p className="text-sm font-semibold mt-1">{item.value}</p></div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs font-mono text-primary">BALANCE TESTING IN PROGRESS</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full bg-primary rounded-full" initial={{ width: "0%" }} whileInView={{ width: "62%" }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.5 }} />
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="panel-glass rounded-lg p-8 text-center">
                <h3 className="font-display text-lg font-semibold mb-2">Request Release Notification</h3>
                {emailSubmitted ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary font-mono">✓ Notification registered</motion.p>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); if (email) setEmailSubmitted(true); }} className="flex gap-2 max-w-sm mx-auto mt-4">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                    <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-sm text-sm font-semibold hover:opacity-90 transition-opacity">Notify</button>
                  </form>
                )}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p className="text-sm text-muted-foreground text-center">INERTIA DEBT is currently under structured testing at SOHAN COMPUTER STORE (SCS). Release will follow full balance validation.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ STUDIO ═══════════ */}
      <section id="studio" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-primary tracking-widest mb-4">STUDIO PROFILE</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold">SOHAN COMPUTER<br />STORE <span className="text-primary">(SCS)</span></h2>
            </div>
          </AnimatedSection>
          <div className="max-w-2xl mx-auto space-y-8">
            <AnimatedSection delay={0.1}>
              <div className="panel-glass rounded-lg p-8">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">SCS is a technology-focused studio exploring structured system design in interactive media.</p>
                <p className="text-sm text-muted-foreground leading-relaxed">We apply computational thinking, balance theory, and disciplined mechanics to every project.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="panel-glass rounded-lg p-8">
                <h3 className="text-xs font-mono text-primary tracking-widest mb-6">CORE VALUES</h3>
                <div className="space-y-3">
                  {values.map((v, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="font-display text-foreground">{v}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ DEV LOGS ═══════════ */}
      <section id="dev-logs" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-primary tracking-widest mb-4">ENGINEERING RECORDS</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold">DEVELOPMENT LOGS</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-4">
            {logs.map((log, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="panel-glass rounded-lg p-6">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono text-sm text-primary font-semibold">v{log.version}</span>
                    <span className="text-xs text-muted-foreground font-mono">{log.date}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {log.changes.map((c, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-1">›</span>{c}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-primary tracking-widest mb-4">PROFESSIONAL INQUIRIES</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold">CONTACT</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-lg mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="panel-glass rounded-lg p-8">
                {contactSubmitted ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                    <p className="text-primary font-mono mb-2">✓ Message received</p>
                    <p className="text-sm text-muted-foreground">We will respond within 48 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4">
                    <div><label className="text-xs font-mono text-muted-foreground uppercase">Name</label><input required className="w-full mt-1 bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                    <div><label className="text-xs font-mono text-muted-foreground uppercase">Email</label><input type="email" required className="w-full mt-1 bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                    <div><label className="text-xs font-mono text-muted-foreground uppercase">Subject</label><input required className="w-full mt-1 bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                    <div><label className="text-xs font-mono text-muted-foreground uppercase">Message</label><textarea required rows={5} className="w-full mt-1 bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none" /></div>
                    <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 rounded-sm text-sm font-semibold hover:opacity-90 transition-opacity">Send Inquiry</button>
                  </form>
                )}
                <div className="mt-6 pt-6 border-t border-border/50 space-y-2">
                  <p className="text-xs text-muted-foreground"><span className="font-mono text-primary">EMAIL</span> — contact@scsstudio.com</p>
                  <p className="text-xs text-muted-foreground"><span className="font-mono text-primary">LOCATION</span> — India</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ PRIVACY ═══════════ */}
      <section id="privacy" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-primary tracking-widest mb-4">LEGAL</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold">PRIVACY POLICY</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto">
              <div className="space-y-6 text-sm text-muted-foreground">
                <section><h3 className="font-display text-foreground text-lg mb-2">Overview</h3><p>SOHAN COMPUTER STORE (SCS) is committed to protecting user privacy. This policy outlines how we handle information in connection with INERTIA DEBT.</p></section>
                <section><h3 className="font-display text-foreground text-lg mb-2">Offline Functionality</h3><p>INERTIA DEBT is designed to function primarily offline. Core gameplay does not require an internet connection and no personal data is transmitted during gameplay sessions.</p></section>
                <section><h3 className="font-display text-foreground text-lg mb-2">Data Collection</h3><p>We do not collect, store, or transmit personal information. No accounts are required. No analytics tracking is embedded in the application beyond standard platform metrics provided by Google Play.</p></section>
                <section><h3 className="font-display text-foreground text-lg mb-2">No Data Selling</h3><p>We do not sell, trade, or otherwise transfer personal data to third parties. This is a firm policy of SOHAN COMPUTER STORE.</p></section>
                <section><h3 className="font-display text-foreground text-lg mb-2">Platform Compliance</h3><p>INERTIA DEBT complies with Google Play Developer Program Policies, including data handling, content guidelines, and user privacy requirements.</p></section>
                <section><h3 className="font-display text-foreground text-lg mb-2">Contact</h3><p>For privacy-related inquiries, contact us at contact@scsstudio.com.</p></section>
                <p className="text-xs text-muted-foreground/60 pt-4">Last updated: January 2025</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ TERMS ═══════════ */}
      <section id="terms" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-primary tracking-widest mb-4">LEGAL</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold">TERMS OF SERVICE</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto">
              <div className="space-y-6 text-sm text-muted-foreground">
                <section><h3 className="font-display text-foreground text-lg mb-2">Acceptance of Terms</h3><p>By downloading, installing, or using INERTIA DEBT, you agree to these Terms of Service. If you do not agree, do not use the application.</p></section>
                <section><h3 className="font-display text-foreground text-lg mb-2">License</h3><p>SOHAN COMPUTER STORE (SCS) grants you a limited, non-exclusive, non-transferable license to use INERTIA DEBT for personal, non-commercial purposes.</p></section>
                <section><h3 className="font-display text-foreground text-lg mb-2">Intellectual Property</h3><p>All content, mechanics, visual assets, and code within INERTIA DEBT are the intellectual property of SOHAN COMPUTER STORE (SCS). Unauthorized reproduction or distribution is prohibited.</p></section>
                <section><h3 className="font-display text-foreground text-lg mb-2">User Conduct</h3><p>Users agree not to reverse-engineer, decompile, or attempt to extract source code from the application. Modification or redistribution of the application is strictly prohibited.</p></section>
                <section><h3 className="font-display text-foreground text-lg mb-2">Disclaimer</h3><p>INERTIA DEBT is provided "as is" without warranties of any kind. SCS is not liable for any damages arising from use of the application.</p></section>
                <section><h3 className="font-display text-foreground text-lg mb-2">Modifications</h3><p>SCS reserves the right to modify these terms at any time. Continued use of the application constitutes acceptance of updated terms.</p></section>
                <section><h3 className="font-display text-foreground text-lg mb-2">Governing Law</h3><p>These terms are governed by the laws of India. Any disputes shall be resolved in the appropriate courts of India.</p></section>
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
