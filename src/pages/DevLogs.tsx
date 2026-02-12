import AnimatedSection from "../components/AnimatedSection";

const logs = [
  { version: "0.4.2", date: "2025-01-28", changes: ["Debt curve recalibrated for late-game balance", "Collector AI pathfinding optimized", "Settlement window timing adjusted: 2.0s → 1.8s"] },
  { version: "0.4.1", date: "2025-01-15", changes: ["Velocity degradation formula refined", "Inflator radius reduced by 15%", "UI debt meter now updates at 60fps"] },
  { version: "0.4.0", date: "2025-01-02", changes: ["Compound debt loop system introduced", "New late-game arena: Pressure Chamber", "Recovery efficiency metric added to analytics"] },
  { version: "0.3.8", date: "2024-12-18", changes: ["Debt Trapper mechanic implemented", "Balance sheet visualization overhauled", "Frame rate stabilization across low-end devices"] },
];

const DevLogs = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-primary tracking-widest mb-4">ENGINEERING RECORDS</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold">DEVELOPMENT LOGS</h1>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-4">
          {logs.map((log, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="panel-glass rounded-lg p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-mono text-sm text-primary font-semibold">v{log.version}</span>
                  <span className="text-xs text-muted-foreground font-mono">{log.date}</span>
                </div>
                <ul className="space-y-1.5">
                  {log.changes.map((c, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">›</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevLogs;
