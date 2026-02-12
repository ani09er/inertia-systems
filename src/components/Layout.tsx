import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Menu, X, Home, Cpu, AlertTriangle, Heart, Map, BarChart3,
  Rocket, Building2, FileText, Mail, Shield, Scale, ChevronUp,
  Zap
} from "lucide-react";
import logoImg from "@/assets/inertia-debt-logo.png";

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

const topNavLinks = [
  { id: "the-system", label: "System" },
  { id: "threats", label: "Threats" },
  { id: "pre-launch", label: "Pre-Launch" },
  { id: "studio", label: "SCS" },
  { id: "contact", label: "Contact" },
];

const footerLinks = [
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "terms", label: "Terms", icon: Scale },
];

const sidebarVariants = {
  closed: { x: "-100%", transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  open: { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30, staggerChildren: 0.03, delayChildren: 0.08 } },
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
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowTopBtn(window.scrollY > 600);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setSidebarOpen(false);
    setTimeout(() => scrollTo(id), 100);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 grid-bg animate-grid-shift opacity-30 pointer-events-none will-change-transform" />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />

      {/* Top bar */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl flex items-center px-4 transition-all duration-300 ${
          scrolled ? "h-12 bg-background/90 shadow-lg shadow-primary/5" : "h-16 bg-background/70"
        }`}
      >
        {/* Sidebar toggle */}
        <motion.button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border/50 bg-card/50 hover:bg-primary/10 hover:border-primary/30 transition-colors group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={16} className="text-primary" />
              </motion.div>
            ) : (
              <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2 ml-3">
          <motion.img
            src={logoImg}
            alt="INERTIA DEBT"
            className={`transition-all duration-300 ${scrolled ? "h-7" : "h-9"} w-auto`}
            whileHover={{ scale: 1.05 }}
          />
        </button>

        {/* Desktop inline nav */}
        <nav className="hidden md:flex items-center gap-1 ml-auto">
          {topNavLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="nav-link text-xs px-3 py-1.5 rounded-md hover:bg-primary/5 transition-colors"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              {link.label}
            </motion.button>
          ))}
        </nav>

        {/* Status */}
        <div className="flex items-center gap-2 ml-auto md:ml-4">
          <motion.div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded border border-border/30 bg-card/30">
            <Zap size={10} className="text-primary" />
            <span className="text-xs font-mono text-primary">LIVE</span>
          </motion.div>
          <motion.div className="w-2 h-2 rounded-full bg-primary" animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }} transition={{ repeat: Infinity, duration: 2 }} />
        </div>
      </motion.header>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 bg-navy-deep/70 backdrop-blur-md" onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside variants={sidebarVariants} initial="closed" animate="open" exit="closed" className="fixed top-0 left-0 bottom-0 z-50 w-80 bg-card/95 backdrop-blur-2xl border-r border-border/50 flex flex-col overflow-hidden">
            {/* Decorative elements */}
            <motion.div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-primary/40 via-transparent to-primary/40" />

            {/* Sidebar header with logo */}
            <motion.div variants={itemVariants} className="px-5 py-5 border-b border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logoImg} alt="INERTIA DEBT" className="h-10 w-auto" />
              </div>
              <motion.button
                onClick={() => setSidebarOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg border border-border/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors"
              >
                <X size={14} className="text-muted-foreground" />
              </motion.button>
            </motion.div>

            {/* Scanner bar */}
            <motion.div variants={itemVariants} className="px-5 py-3 border-b border-border/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-muted-foreground/60 tracking-widest">SECTIONS</span>
                <span className="text-xs font-mono text-primary animate-pulse-teal">{navItems.length} MODULES</span>
              </div>
              <div className="h-px w-full overflow-hidden rounded-full bg-muted">
                <motion.div className="h-full bg-primary/50 rounded-full" animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} style={{ width: "25%" }} />
              </div>
            </motion.div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5 scrollbar-none">
              {navItems.map((item, i) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <button onClick={() => handleNav(item.id)} className="relative group block w-full text-left">
                    <motion.div
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative overflow-hidden text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      whileHover={{ x: 6, backgroundColor: "hsla(175, 80%, 40%, 0.05)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {/* Numbering */}
                      <span className="text-xs font-mono text-muted-foreground/30 w-4">{String(i + 1).padStart(2, "0")}</span>

                      {/* Icon */}
                      <div className="relative w-8 h-8 rounded-md border border-border/30 bg-muted/20 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                        <item.icon size={14} className="transition-colors group-hover:text-primary" />
                      </div>

                      {/* Label & code */}
                      <div className="flex-1">
                        <span className="text-sm block">{item.label}</span>
                      </div>

                      <span className="text-xs font-mono text-muted-foreground/30 group-hover:text-primary/60 transition-colors">{item.code}</span>

                      {/* Hover shimmer */}
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} />
                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Legal */}
            <motion.div variants={itemVariants} className="px-5 py-3 border-t border-border/30">
              <div className="text-xs font-mono text-muted-foreground/40 mb-2 tracking-widest">LEGAL</div>
              <div className="flex gap-1">
                {footerLinks.map((item) => (
                  <button key={item.id} onClick={() => handleNav(item.id)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
                    <item.icon size={11} />{item.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Bottom panel */}
            <motion.div variants={itemVariants} className="px-5 py-4 border-t border-border/30 bg-navy-deep/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg border border-primary/20 bg-primary/5 flex items-center justify-center glow-teal-sm">
                  <span className="font-display text-xs font-bold text-primary">SCS</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">SOHAN COMPUTER STORE</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">Systems-Driven Studio</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: "SYS", val: "98%" },
                  { label: "NET", val: "ON" },
                  { label: "VER", val: "0.4" },
                  { label: "BLD", val: "α" },
                ].map((m) => (
                  <div key={m.label} className="text-center bg-muted/15 rounded px-1 py-1.5 border border-border/20">
                    <p className="text-[9px] font-mono text-muted-foreground/40">{m.label}</p>
                    <p className="text-[10px] font-mono text-primary">{m.val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className="relative z-10" style={{ paddingTop: scrolled ? 48 : 64 }}>
        {children}
      </main>

      {/* Back to top */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollTo("home")}
            className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors glow-teal-sm backdrop-blur-sm"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={16} className="text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll progress side indicator */}
      <div className="fixed right-2 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-1">
        {navItems.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="w-1 rounded-full bg-border hover:bg-primary transition-colors"
            style={{ height: 12 }}
            whileHover={{ scaleX: 3, backgroundColor: "hsl(175, 80%, 40%)" }}
            title={item.label}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left flex items-center gap-4">
              <img src={logoImg} alt="INERTIA DEBT" className="h-12 w-auto opacity-70" />
              <div>
                <p className="font-display text-sm font-semibold text-primary">SOHAN COMPUTER STORE</p>
                <p className="text-xs text-muted-foreground mt-1">Systems-Driven Interactive Experiences</p>
              </div>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <button onClick={() => scrollTo("privacy")} className="hover:text-foreground transition-colors">Privacy</button>
              <button onClick={() => scrollTo("terms")} className="hover:text-foreground transition-colors">Terms</button>
              <button onClick={() => scrollTo("contact")} className="hover:text-foreground transition-colors">Contact</button>
            </div>
          </div>
          <div className="section-divider my-8" />
          <p className="text-center text-xs text-muted-foreground">© 2025 SOHAN COMPUTER STORE (SCS). All rights reserved. Made in India.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
