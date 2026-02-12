import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Lock } from "lucide-react";

const threats = [
  {
    icon: AlertTriangle,
    title: "COLLECTORS",
    subtitle: "Force Repayment Cycles",
    desc: "Autonomous entities that pursue the player during high-debt states, forcing immediate settlement or velocity sacrifice.",
    severity: "HIGH",
  },
  {
    icon: TrendingUp,
    title: "INFLATORS",
    subtitle: "Multiply Debt Growth",
    desc: "Environmental hazards that apply debt multipliers. Entering their radius compounds existing debt exponentially.",
    severity: "CRITICAL",
  },
  {
    icon: Lock,
    title: "DEBT TRAPPERS",
    subtitle: "Lock Movement During Peak Debt",
    desc: "Zone-based constraints that freeze player movement when debt exceeds threshold, creating forced settlement scenarios.",
    severity: "SEVERE",
  },
];

const Threats = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-destructive tracking-widest mb-4">⚠ THREAT CLASSIFICATION</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold">DEBT ENFORCEMENT<br />SYSTEMS</h1>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {threats.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4, borderColor: "hsl(0, 72%, 50%)" }}
                transition={{ duration: 0.3 }}
                className="panel-glass rounded-lg p-6 border border-border/50 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 px-2 py-1 bg-destructive/10 text-destructive text-xs font-mono rounded-bl">
                  {t.severity}
                </div>
                <t.icon className="w-8 h-8 text-destructive mb-4 group-hover:animate-flicker" />
                <h3 className="font-display text-xl font-bold mb-1">{t.title}</h3>
                <p className="text-xs text-primary font-mono mb-3">{t.subtitle}</p>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Scenario simulation */}
        <AnimatedSection delay={0.4} className="mt-20">
          <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto text-center">
            <h3 className="text-xs font-mono text-primary tracking-widest mb-6">SIMULATED THREAT ENCOUNTER</h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {["IMPULSE", "→", "COLLECTOR DETECTED", "→", "DEBT SPIKE", "→", "FORCED SETTLEMENT"].map((step, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.3 }}
                  className={step === "→" ? "text-muted-foreground" : "px-3 py-1.5 rounded-sm border border-border bg-muted/50 text-xs font-mono text-foreground"}
                >
                  {step}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Threats;
