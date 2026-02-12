import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";

const systems = [
  { title: "Auto-Movement Core", desc: "The player moves automatically. There is no idle state. Every frame generates kinetic output." },
  { title: "Impulse Injection", desc: "Player input applies directional force, increasing velocity and accumulating movement debt." },
  { title: "Debt Accumulation", desc: "Each impulse generates a proportional debt value. The faster you move, the more debt you carry." },
  { title: "Velocity Degradation", desc: "Unmanaged debt erodes velocity over time. Speed becomes a cost, not a resource." },
  { title: "Settlement Recovery", desc: "Clearing debt windows restores velocity and stability. Timing is everything." },
];

const TheSystem = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-primary tracking-widest mb-4">CORE ARCHITECTURE</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold">THE INERTIA ENGINE</h1>
          </div>
        </AnimatedSection>

        <div className="space-y-4 max-w-3xl mx-auto">
          {systems.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 8, borderColor: "hsl(175, 80%, 40%)" }}
                transition={{ duration: 0.3 }}
                className="panel-glass rounded-lg p-6 border-l-2 border-transparent cursor-default"
              >
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

        {/* Graph simulation */}
        <AnimatedSection delay={0.3} className="mt-20">
          <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-xs font-mono text-primary tracking-widest mb-6 text-center">IMPULSE → DEBT SPIKE → VELOCITY DROP → RECOVERY</h3>
            <div className="h-40 relative overflow-hidden rounded">
              <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
                <motion.path
                  d="M0,100 C50,100 60,20 100,20 C140,20 150,90 200,90 C250,90 260,50 300,50 C340,50 360,70 400,40"
                  fill="none"
                  stroke="hsl(175, 80%, 40%)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <motion.path
                  d="M0,80 C50,80 70,100 100,100 C130,100 140,30 200,60 C260,90 280,80 300,85 C320,90 360,60 400,70"
                  fill="none"
                  stroke="hsl(185, 65%, 50%)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.8 }}
                />
              </svg>
              <div className="absolute bottom-2 right-3 flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-3 h-px bg-primary inline-block" /> Velocity</span>
                <span className="flex items-center gap-1"><span className="w-3 h-px bg-accent inline-block" /> Debt</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Technical panels */}
        <AnimatedSection delay={0.4} className="mt-16">
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { title: "Debt Threshold Rules", desc: "Debt exceeding 80% triggers velocity penalties. At 100%, system collapse initiates." },
              { title: "Velocity Decay Formula", desc: "V(t) = V₀ × e^(-λt) where λ scales with active debt ratio." },
              { title: "Settlement Windows", desc: "Periodic 2-second windows allow debt clearance. Missing windows compounds interest." },
              { title: "Collapse Conditions", desc: "Full collapse occurs when debt ≥ 100% and velocity ≤ 10%. Recovery requires cooldown." },
            ].map((panel, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="panel-glass rounded-lg p-5"
              >
                <h4 className="font-mono text-xs text-primary mb-2">{panel.title}</h4>
                <p className="text-sm text-muted-foreground">{panel.desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TheSystem;
