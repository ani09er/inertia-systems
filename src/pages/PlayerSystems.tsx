import AnimatedSection from "../components/AnimatedSection";
import DebtMeter from "../components/DebtMeter";
import { motion } from "framer-motion";

const metrics = [
  { label: "Average Debt", value: 42.7, suffix: "" },
  { label: "Peak Debt", value: 94.3, suffix: "" },
  { label: "Velocity Collapse", value: 12.8, suffix: "/s" },
  { label: "Recovery Efficiency", value: 67.5, suffix: "%" },
];

const PlayerSystems = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-primary tracking-widest mb-4">DATA-DRIVEN PERFORMANCE</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold">PERFORMANCE<br />ANALYTICS</h1>
          </div>
        </AnimatedSection>

        {/* Profile card */}
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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-muted/50 rounded p-3 text-center"
                >
                  <span className="text-xs font-mono text-muted-foreground">{stat}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Analytics dashboard */}
        <AnimatedSection delay={0.2}>
          <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-xs font-mono text-primary tracking-widest mb-6">TRACKED METRICS</h3>
            <div className="space-y-5">
              {metrics.map((m, i) => (
                <DebtMeter key={i} label={m.label} value={m.value} suffix={m.suffix} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default PlayerSystems;
