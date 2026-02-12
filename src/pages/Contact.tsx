import AnimatedSection from "../components/AnimatedSection";
import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-primary tracking-widest mb-4">PROFESSIONAL INQUIRIES</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold">CONTACT</h1>
          </div>
        </AnimatedSection>

        <div className="max-w-lg mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="panel-glass rounded-lg p-8">
              {submitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <p className="text-primary font-mono mb-2">✓ Message received</p>
                  <p className="text-sm text-muted-foreground">We will respond within 48 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-muted-foreground uppercase">Name</label>
                    <input required className="w-full mt-1 bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-muted-foreground uppercase">Email</label>
                    <input type="email" required className="w-full mt-1 bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-muted-foreground uppercase">Subject</label>
                    <input required className="w-full mt-1 bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-muted-foreground uppercase">Message</label>
                    <textarea required rows={5} className="w-full mt-1 bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 rounded-sm text-sm font-semibold hover:opacity-90 transition-opacity">
                    Send Inquiry
                  </button>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-border/50 space-y-2">
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono text-primary">EMAIL</span> — contact@scsstudio.com
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono text-primary">LOCATION</span> — India
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Contact;
