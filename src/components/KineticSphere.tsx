import { useEffect, useRef, useCallback } from "react";

interface KineticSphereProps {
  scrollVelocity?: number;
  debtLevel?: number;
}

const KineticSphere = ({ scrollVelocity = 0, debtLevel = 0 }: KineticSphereProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const ripples = useRef<{ x: number; y: number; radius: number; alpha: number; maxRadius: number }[]>([]);
  const debtTrails = useRef<{ x: number; y: number; alpha: number; size: number }[]>([]);
  const scrollVelRef = useRef(0);
  const debtRef = useRef(0);

  useEffect(() => {
    scrollVelRef.current = scrollVelocity;
    debtRef.current = debtLevel;
  }, [scrollVelocity, debtLevel]);

  const handleClick = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    ripples.current.push({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      radius: 0,
      alpha: 0.8,
      maxRadius: 200,
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    const trails: { x: number; y: number; alpha: number }[] = [];
    const orbitParticles: { angle: number; radius: number; speed: number; size: number }[] = [];

    // Create orbit particles
    for (let i = 0; i < 40; i++) {
      orbitParticles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 30 + Math.random() * 80,
        speed: 0.003 + Math.random() * 0.008,
        size: 0.5 + Math.random() * 1.5,
      });
    }

    const animate = () => {
      time += 0.006;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const sv = scrollVelRef.current;
      const debt = debtRef.current;

      ctx.clearRect(0, 0, w, h);

      // Mouse influence on sphere position
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const baseCx = w / 2;
      const baseCy = h / 2;
      const cx = baseCx + (mx - 0.5) * 60 + Math.sin(time * 0.8) * 15;
      const cy = baseCy + (my - 0.5) * 40 + Math.cos(time * 0.6) * 10;

      // Draw debt trails (scroll-generated)
      if (sv > 2) {
        debtTrails.current.push({
          x: cx + (Math.random() - 0.5) * 120,
          y: cy + (Math.random() - 0.5) * 120,
          alpha: 0.4,
          size: 1 + Math.random() * 2,
        });
      }
      if (debtTrails.current.length > 60) debtTrails.current.splice(0, 5);

      for (const trail of debtTrails.current) {
        trail.alpha *= 0.985;
        if (trail.alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(175, 80%, 50%, ${trail.alpha * 0.5})`;
          ctx.fill();
        }
      }
      debtTrails.current = debtTrails.current.filter(t => t.alpha > 0.01);

      // Draw orbit trails
      trails.push({ x: cx, y: cy, alpha: 0.3 });
      if (trails.length > 50) trails.shift();

      for (let i = 0; i < trails.length; i++) {
        const t = trails[i];
        t.alpha *= 0.96;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(175, 80%, 40%, ${t.alpha})`;
        ctx.fill();
      }

      // Draw orbit particles
      for (const p of orbitParticles) {
        p.angle += p.speed * (1 + sv * 0.02);
        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * (p.radius * 0.6);
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(185, 65%, 55%, ${0.15 + Math.sin(time + p.angle) * 0.1})`;
        ctx.fill();
      }

      // Outer glow rings
      for (let i = 0; i < 3; i++) {
        const radius = 40 + i * 25 + Math.sin(time * 1.5 + i) * 5 + sv * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(175, 80%, 45%, ${0.06 - i * 0.015})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Ambient glow
      const glowSize = 80 + sv * 3 + debt * 0.5;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
      grad.addColorStop(0, "hsla(175, 80%, 50%, 0.2)");
      grad.addColorStop(0.5, "hsla(185, 65%, 45%, 0.06)");
      grad.addColorStop(1, "hsla(175, 80%, 50%, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Main sphere
      const sphereSize = 20 + Math.sin(time * 2) * 2 + sv * 0.3;
      const sphereGrad = ctx.createRadialGradient(cx - 4, cy - 4, 0, cx, cy, sphereSize);
      sphereGrad.addColorStop(0, "hsla(185, 70%, 70%, 1)");
      sphereGrad.addColorStop(0.4, "hsla(175, 80%, 45%, 1)");
      sphereGrad.addColorStop(0.8, "hsla(175, 80%, 35%, 0.9)");
      sphereGrad.addColorStop(1, "hsla(175, 80%, 25%, 0.6)");
      ctx.beginPath();
      ctx.arc(cx, cy, sphereSize, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Inner highlight
      ctx.beginPath();
      ctx.arc(cx - sphereSize * 0.25, cy - sphereSize * 0.25, sphereSize * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(185, 80%, 80%, 0.3)";
      ctx.fill();

      // Ripple effects (click-triggered)
      for (const ripple of ripples.current) {
        ripple.radius += 3;
        ripple.alpha *= 0.96;
        const rx = ripple.x * w;
        const ry = ripple.y * h;
        ctx.beginPath();
        ctx.arc(rx, ry, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(175, 80%, 50%, ${ripple.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner ripple
        ctx.beginPath();
        ctx.arc(rx, ry, ripple.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(185, 65%, 55%, ${ripple.alpha * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ripples.current = ripples.current.filter(r => r.alpha > 0.02);

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleClick, handleMouseMove]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />;
};

export default KineticSphere;
