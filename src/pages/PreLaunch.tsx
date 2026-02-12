import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";
import { useState } from "react";

const PreLaunch = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-primary tracking-widest mb-4">DEPLOYMENT STATUS</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold">SYSTEM DEPLOYMENT<br />STATUS</h1>
          </div>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto space-y-6">
          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Status", value: "In Development" },
                  { label: "Platform", value: "Android (Google Play)" },
                  { label: "Phase", value: "Internal Testing" },
                  { label: "Build", value: "v0.4.2-alpha" },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-muted-foreground font-mono uppercase">{item.label}</p>
                    <p className="text-sm font-semibold mt-1">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                  <span className="text-xs font-mono text-primary">BALANCE TESTING IN PROGRESS</span>
                </div>
                <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "62%" }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Notification */}
          <AnimatedSection delay={0.2}>
            <div className="panel-glass rounded-lg p-8 text-center">
              <h3 className="font-display text-lg font-semibold mb-2">Request Release Notification</h3>
              {submitted ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-primary font-mono"
                >
                  ✓ Notification registered
                </motion.p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-sm text-sm font-semibold hover:opacity-90 transition-opacity">
                    Notify
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-sm text-muted-foreground text-center">
              INERTIA DEBT is currently under structured testing at SOHAN COMPUTER STORE (SCS). Release will follow full balance validation.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default PreLaunch;
