import { useEffect, useRef } from "react";

const KineticSphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const trails: { x: number; y: number; alpha: number }[] = [];

    const animate = () => {
      time += 0.008;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2 + Math.sin(time * 1.2) * w * 0.15;
      const cy = h / 2 + Math.cos(time * 0.8) * h * 0.12;

      trails.push({ x: cx, y: cy, alpha: 0.6 });
      if (trails.length > 80) trails.shift();

      // Draw trails
      for (let i = 0; i < trails.length; i++) {
        const t = trails[i];
        t.alpha *= 0.97;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(175, 80%, 40%, ${t.alpha})`;
        ctx.fill();
      }

      // Glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      grad.addColorStop(0, "hsla(175, 80%, 50%, 0.25)");
      grad.addColorStop(1, "hsla(175, 80%, 50%, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Sphere
      const sphereGrad = ctx.createRadialGradient(cx - 5, cy - 5, 0, cx, cy, 18);
      sphereGrad.addColorStop(0, "hsla(185, 65%, 60%, 1)");
      sphereGrad.addColorStop(0.7, "hsla(175, 80%, 40%, 1)");
      sphereGrad.addColorStop(1, "hsla(175, 80%, 30%, 0.8)");
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default KineticSphere;
