import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";

const levels = [
  { phase: "EARLY", label: "Visible Debt Feedback", desc: "Clear UI indicators show debt in real-time. Players learn the cost of movement.", color: "text-primary" },
  { phase: "MID", label: "Hidden Multipliers", desc: "Debt multipliers become invisible. Players must internalize timing and rhythm.", color: "text-accent" },
  { phase: "LATE", label: "Compound Debt Loops", desc: "Debt generates debt. Recovery windows shrink. Only precision survives.", color: "text-destructive" },
];

const LevelArchitecture = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-primary tracking-widest mb-4">PROGRESSIVE COMPLEXITY</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold">STRUCTURED ARENAS</h1>
            <p className="text-sm text-muted-foreground mt-4 max-w-lg mx-auto">Each level introduces a new debt rule. Mastery of previous rules is required for progression.</p>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-6">
          {levels.map((l, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ x: 6 }}
                className="panel-glass rounded-lg p-6 flex items-start gap-6"
              >
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

        {/* Flow diagram */}
        <AnimatedSection delay={0.4} className="mt-16">
          <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-xs font-mono text-primary tracking-widest mb-6 text-center">PROGRESSION FLOW</h3>
            <div className="flex items-center justify-between gap-2">
              {["Learn", "Adapt", "Internalize", "Master", "Survive"].map((step, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
                    className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5 flex-shrink-0"
                  >
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
    </div>
  );
};

export default LevelArchitecture;
