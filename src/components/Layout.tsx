import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Menu, X, Home, Cpu, AlertTriangle, Heart, Map, BarChart3,
  Rocket, Building2, FileText, Mail, Shield, Scale
} from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home, code: "HME" },
  { id: "the-system", label: "The System", icon: Cpu, code: "SYS" },
  { id: "threats", label: "Threats", icon: AlertTriangle, code: "THR" },
  { id: "health", label: "Health", icon: Heart, code: "HLT" },
  { id: "levels", label: "Levels", icon: Map, code: "LVL" },
  { id: "analytics", label: "Analytics", icon: BarChart3, code: "ANL" },
  { id: "pre-launch", label: "Pre-Launch", icon: Rocket, code: "PLN" },
  { id: "studio", label: "SCS", icon: Building2, code: "SCS" },
  { id: "dev-logs", label: "Dev Logs", icon: FileText, code: "LOG" },
  { id: "contact", label: "Contact", icon: Mail, code: "CNT" },
];

const footerLinks = [
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "terms", label: "Terms", icon: Scale },
];

const sidebarVariants = {
  closed: { x: "-100%", transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  open: { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30, staggerChildren: 0.04, delayChildren: 0.1 } },
};

const itemVariants = {
  closed: { x: -30, opacity: 0 },
  open: { x: 0, opacity: 1 },
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNav = (id: string) => {
    setSidebarOpen(false);
    setTimeout(() => scrollTo(id), 100);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 grid-bg animate-grid-shift opacity-30 pointer-events-none" />

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center px-4">
        <motion.button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-border/50 bg-card/50 hover:bg-primary/10 hover:border-primary/30 transition-colors group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={18} className="text-primary" />
              </motion.div>
            ) : (
              <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/20 group-hover:animate-ping pointer-events-none" />
        </motion.button>

        <div className="flex-1 flex items-center justify-center">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5">
            <motion.div className="w-8 h-8 rounded border border-primary/50 flex items-center justify-center glow-teal-sm relative overflow-hidden" whileHover={{ borderColor: "hsl(175, 80%, 60%)" }}>
              <span className="font-display text-sm font-bold text-primary relative z-10">S</span>
              <motion.div className="absolute inset-0 bg-primary/10" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 3 }} />
            </motion.div>
            <span className="font-display text-sm font-semibold tracking-widest">
              <span className="text-foreground">INERTIA</span>
              <span className="text-primary ml-1">DEBT</span>
            </span>
          </button>
        </div>

        <div className="w-10 flex items-center justify-center">
          <motion.div className="w-2 h-2 rounded-full bg-primary" animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }} transition={{ repeat: Infinity, duration: 2 }} />
        </div>
      </header>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 bg-navy-deep/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside variants={sidebarVariants} initial="closed" animate="open" exit="closed" className="fixed top-14 left-0 bottom-0 z-50 w-72 bg-card/95 backdrop-blur-2xl border-r border-border/50 flex flex-col overflow-hidden">
            <motion.div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-primary/30 via-transparent to-primary/30" />

            <motion.div variants={itemVariants} className="px-5 py-4 border-b border-border/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground tracking-widest">NAVIGATION</span>
                <span className="text-xs font-mono text-primary animate-pulse-teal">ACTIVE</span>
              </div>
              <div className="mt-2 h-px w-full overflow-hidden rounded-full bg-muted">
                <motion.div className="h-full bg-primary/50 rounded-full" animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ width: "30%" }} />
              </div>
            </motion.div>

            <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 scrollbar-none">
              {navItems.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <button onClick={() => handleNav(item.id)} className="relative group block w-full text-left">
                    <motion.div
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative overflow-hidden text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="relative">
                        <item.icon size={16} className="transition-colors group-hover:text-primary" />
                      </div>
                      <span className="text-sm flex-1">{item.label}</span>
                      <span className="text-xs font-mono text-muted-foreground/40 group-hover:text-muted-foreground transition-colors">{item.code}</span>
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} />
                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </nav>

            <motion.div variants={itemVariants} className="px-5 py-3 border-t border-border/30">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground/50 mb-2"><span>LEGAL</span></div>
              <div className="flex gap-1">
                {footerLinks.map((item) => (
                  <button key={item.id} onClick={() => handleNav(item.id)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
                    <item.icon size={12} />{item.label}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="px-5 py-4 border-t border-border/30 bg-navy-deep/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border border-primary/20 bg-primary/5 flex items-center justify-center">
                  <span className="font-display text-xs font-bold text-primary">S</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">SOHAN COMPUTER STORE</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">v0.4.2-alpha</p>
                </div>
                <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[{ label: "SYS", val: "98%" }, { label: "NET", val: "ON" }, { label: "VER", val: "0.4" }].map((m) => (
                  <div key={m.label} className="text-center bg-muted/20 rounded px-1 py-1">
                    <p className="text-xs font-mono text-muted-foreground/50">{m.label}</p>
                    <p className="text-xs font-mono text-primary">{m.val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className="pt-14 relative z-10">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-display text-sm font-semibold text-primary">SOHAN COMPUTER STORE</p>
              <p className="text-xs text-muted-foreground mt-1">Systems-Driven Interactive Experiences</p>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <button onClick={() => scrollTo("privacy")} className="hover:text-foreground transition-colors">Privacy</button>
              <button onClick={() => scrollTo("terms")} className="hover:text-foreground transition-colors">Terms</button>
              <button onClick={() => scrollTo("contact")} className="hover:text-foreground transition-colors">Contact</button>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">© 2025 SOHAN COMPUTER STORE (SCS). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
