import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DebtMeter = ({ label, value, max = 100, suffix = "" }: { label: string; value: number; max?: number; suffix?: string }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCurrent(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = (current / max) * 100;
  const color = percentage > 75 ? "hsl(0, 72%, 50%)" : percentage > 50 ? "hsl(40, 80%, 50%)" : "hsl(175, 80%, 40%)";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-muted-foreground font-body">{label}</span>
        <span className="stat-mono text-lg">{current.toFixed(1)}{suffix}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </div>
    </div>
  );
};

export default DebtMeter;
