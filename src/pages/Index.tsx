import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AnimatedSection from "../components/AnimatedSection";
import DebtMeter from "../components/DebtMeter";
import KineticSphere from "../components/KineticSphere";

const StatCounter = ({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 1500;
    const step = (end - start) / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
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

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <KineticSphere />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block px-3 py-1 rounded-sm border border-primary/30 bg-primary/5 mb-6"
              >
                <span className="text-xs font-mono text-primary tracking-widest">A PHYSICS-BASED RISK SYSTEM</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none mb-6">
                <span className="text-gradient-teal">INERTIA</span>
                <br />
                <span className="text-foreground">DEBT</span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-muted-foreground font-body italic"
              >
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
              <p className="text-sm text-muted-foreground leading-relaxed">
                At <span className="text-foreground font-semibold">SOHAN COMPUTER STORE (SCS)</span>, we engineer systems-driven interactive experiences.
              </p>
              <div className="section-divider" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold">INERTIA DEBT</span> is a physics action game built on one principle:
              </p>
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
    </div>
  );
};

export default Index;
