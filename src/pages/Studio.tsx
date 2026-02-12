import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";

const values = [
  "Structure over spectacle",
  "Systems over shortcuts",
  "Intelligence over reaction",
  "Clarity over noise",
];

const Studio = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-primary tracking-widest mb-4">STUDIO PROFILE</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold">SOHAN COMPUTER<br />STORE <span className="text-primary">(SCS)</span></h1>
          </div>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto space-y-8">
          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-lg p-8">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                SCS is a technology-focused studio exploring structured system design in interactive media.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We apply computational thinking, balance theory, and disciplined mechanics to every project.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="panel-glass rounded-lg p-8">
              <h3 className="text-xs font-mono text-primary tracking-widest mb-6">CORE VALUES</h3>
              <div className="space-y-3">
                {values.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="font-display text-foreground">{v}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Studio;
