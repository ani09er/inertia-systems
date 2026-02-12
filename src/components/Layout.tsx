import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/the-system", label: "The System" },
  { path: "/threats", label: "Threats" },
  { path: "/health", label: "Health" },
  { path: "/levels", label: "Levels" },
  { path: "/analytics", label: "Analytics" },
  { path: "/pre-launch", label: "Pre-Launch" },
  { path: "/studio", label: "SCS" },
  { path: "/dev-logs", label: "Dev Logs" },
  { path: "/contact", label: "Contact" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg animate-grid-shift opacity-30 pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border border-primary/50 flex items-center justify-center glow-teal-sm">
              <span className="font-display text-sm font-bold text-primary">S</span>
            </div>
            <span className="font-display text-sm font-semibold tracking-wider hidden sm:inline">SCS</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link text-xs px-3 py-2 rounded-sm transition-colors ${
                  location.pathname === item.path ? "text-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground p-2">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <div className="p-4 grid grid-cols-2 gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-xs px-3 py-2.5 rounded-sm transition-colors ${
                      location.pathname === item.path ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Content */}
      <main className="pt-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-display text-sm font-semibold text-primary">SOHAN COMPUTER STORE</p>
              <p className="text-xs text-muted-foreground mt-1">Systems-Driven Interactive Experiences</p>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">© 2025 SOHAN COMPUTER STORE (SCS). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
