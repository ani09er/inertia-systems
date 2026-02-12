import { useEffect, useRef, useCallback } from "react";

interface KineticSphereProps {
  scrollVelocity?: number;
  debtLevel?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  hue: number;
  life: number;
  maxLife: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  maxRadius: number;
}

interface OrbitParticle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  baseRadius: number;
}

const KineticSphere = ({ scrollVelocity = 0, debtLevel = 0 }: KineticSphereProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const spherePos = useRef({ x: 0, y: 0 });
  const sphereVel = useRef({ x: 0, y: 0 });
  const isHolding = useRef(false);
  const holdCharge = useRef(0);
  const holdStart = useRef(0);
  const ripples = useRef<Ripple[]>([]);
  const particles = useRef<Particle[]>([]);
  const orbitParticles = useRef<OrbitParticle[]>([]);
  const scrollVelRef = useRef(0);
  const debtRef = useRef(0);
  const clickCount = useRef(0);
  const lastClickTime = useRef(0);

  useEffect(() => {
    scrollVelRef.current = scrollVelocity;
    debtRef.current = debtLevel;
  }, [scrollVelocity, debtLevel]);

  const spawnBurst = useCallback((cx: number, cy: number, count: number, power: number) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
      const speed = 2 + Math.random() * power;
      particles.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: 1 + Math.random() * 3,
        hue: 170 + Math.random() * 30,
        life: 0,
        maxLife: 40 + Math.random() * 40,
      });
    }
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const sx = spherePos.current.x || canvas.offsetWidth / 2;
    const sy = spherePos.current.y || canvas.offsetHeight / 2;
    const dist = Math.sqrt((mx - sx) ** 2 + (my - sy) ** 2);

    if (dist < 80) {
      isDragging.current = true;
      dragOffset.current = { x: mx - sx, y: my - sy };
    }

    isHolding.current = true;
    holdStart.current = Date.now();
    holdCharge.current = 0;
  }, []);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    if (isDragging.current) {
      isDragging.current = false;
    }

    // Hold-release burst
    if (holdCharge.current > 20) {
      const power = Math.min(holdCharge.current / 15, 12);
      const count = Math.floor(10 + holdCharge.current / 3);
      const sx = spherePos.current.x || canvas.offsetWidth / 2;
      const sy = spherePos.current.y || canvas.offsetHeight / 2;
      spawnBurst(sx, sy, count, power);

      ripples.current.push({
        x: sx / canvas.offsetWidth,
        y: sy / canvas.offsetHeight,
        radius: 0,
        alpha: Math.min(holdCharge.current / 50, 1),
        maxRadius: 100 + holdCharge.current * 2,
      });
    }

    isHolding.current = false;
    holdCharge.current = 0;
  }, [spawnBurst]);

  const handleClick = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;

    const now = Date.now();
    if (now - lastClickTime.current < 400) {
      clickCount.current++;
    } else {
      clickCount.current = 1;
    }
    lastClickTime.current = now;

    // Combo clicks = bigger bursts
    const combo = Math.min(clickCount.current, 5);
    ripples.current.push({
      x: mx,
      y: my,
      radius: 0,
      alpha: 0.5 + combo * 0.15,
      maxRadius: 120 + combo * 60,
    });

    spawnBurst(
      mx * canvas.offsetWidth,
      my * canvas.offsetHeight,
      6 + combo * 4,
      2 + combo * 1.5
    );
  }, [spawnBurst]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    mouseRef.current = { x: mx, y: my };

    if (isDragging.current) {
      const target = {
        x: e.clientX - rect.left - dragOffset.current.x,
        y: e.clientY - rect.top - dragOffset.current.y,
      };
      sphereVel.current = {
        x: (target.x - spherePos.current.x) * 0.3,
        y: (target.y - spherePos.current.y) * 0.3,
      };
      spherePos.current = target;
    }
  }, []);

  // Touch support
  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleMouseDown(mouseEvent);
  }, [handleMouseDown]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleMouseMove(mouseEvent);
  }, [handleMouseMove]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const upEvent = new MouseEvent("mouseup", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleMouseUp(upEvent);

    const clickEvent = new MouseEvent("click", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleClick(clickEvent);
  }, [handleMouseUp, handleClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spherePos.current = { x: canvas.offsetWidth / 2, y: canvas.offsetHeight / 2 };
    };
    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

    // Create orbit particles
    for (let i = 0; i < 50; i++) {
      orbitParticles.current.push({
        angle: Math.random() * Math.PI * 2,
        radius: 30 + Math.random() * 100,
        baseRadius: 30 + Math.random() * 100,
        speed: 0.003 + Math.random() * 0.008,
        size: 0.5 + Math.random() * 2,
      });
    }

    const animate = () => {
      time += 0.006;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const sv = scrollVelRef.current;
      const debt = debtRef.current;

      ctx.clearRect(0, 0, w, h);

      // Sphere physics — spring back to center when not dragging
      if (!isDragging.current) {
        const targetX = w / 2 + (mouseRef.current.x - 0.5) * 80;
        const targetY = h / 2 + (mouseRef.current.y - 0.5) * 50;
        sphereVel.current.x += (targetX - spherePos.current.x) * 0.02;
        sphereVel.current.y += (targetY - spherePos.current.y) * 0.02;
        sphereVel.current.x *= 0.92;
        sphereVel.current.y *= 0.92;
        spherePos.current.x += sphereVel.current.x;
        spherePos.current.y += sphereVel.current.y;
      }

      const cx = spherePos.current.x + Math.sin(time * 0.8) * 8;
      const cy = spherePos.current.y + Math.cos(time * 0.6) * 6;

      // Hold charge
      if (isHolding.current) {
        holdCharge.current = Math.min((Date.now() - holdStart.current) / 15, 100);
      }

      // Charge ring
      if (holdCharge.current > 5) {
        const chargeAlpha = holdCharge.current / 100;
        const chargeRadius = 30 + holdCharge.current * 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, chargeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(45, 100%, 60%, ${chargeAlpha * 0.6})`;
        ctx.lineWidth = 1.5 + chargeAlpha * 2;
        ctx.stroke();

        // Charging particles swirl inward
        for (let i = 0; i < 3; i++) {
          const a = time * 8 + (i * Math.PI * 2) / 3;
          const r = chargeRadius + 10 - holdCharge.current * 0.1;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(50, 100%, 70%, ${chargeAlpha})`;
          ctx.fill();
        }
      }

      // Magnetic attraction — orbit particles gravitate toward mouse
      const mxPx = mouseRef.current.x * w;
      const myPx = mouseRef.current.y * h;

      // Draw orbit particles with magnetic behavior
      for (const p of orbitParticles.current) {
        p.angle += p.speed * (1 + sv * 0.02);

        const distToMouse = Math.sqrt(
          (cx + Math.cos(p.angle) * p.radius - mxPx) ** 2 +
          (cy + Math.sin(p.angle) * p.radius - myPx) ** 2
        );
        const attraction = Math.max(0, 1 - distToMouse / 200);
        p.radius += (p.baseRadius * (1 - attraction * 0.5) - p.radius) * 0.05;

        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * (p.radius * 0.6);

        // Connection lines to nearby particles
        for (const q of orbitParticles.current) {
          if (q === p) continue;
          const qx = cx + Math.cos(q.angle) * q.radius;
          const qy = cy + Math.sin(q.angle) * (q.radius * 0.6);
          const d = Math.sqrt((px - qx) ** 2 + (py - qy) ** 2);
          if (d < 50) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(qx, qy);
            ctx.strokeStyle = `hsla(180, 70%, 50%, ${(1 - d / 50) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(px, py, p.size * (1 + attraction * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${180 + attraction * 20}, 65%, ${55 + attraction * 20}%, ${0.2 + attraction * 0.4 + Math.sin(time + p.angle) * 0.1})`;
        ctx.fill();
      }

      // Outer glow rings — react to velocity
      const speed = Math.sqrt(sphereVel.current.x ** 2 + sphereVel.current.y ** 2);
      for (let i = 0; i < 4; i++) {
        const radius = 35 + i * 22 + Math.sin(time * 1.5 + i) * 5 + sv * 2 + speed * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(175, 80%, 45%, ${0.07 - i * 0.012 + speed * 0.01})`;
        ctx.lineWidth = 0.5 + speed * 0.05;
        ctx.stroke();
      }

      // Ambient glow
      const glowSize = 90 + sv * 3 + debt * 0.5 + speed * 3;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
      grad.addColorStop(0, `hsla(175, 80%, 50%, ${0.2 + speed * 0.03})`);
      grad.addColorStop(0.5, "hsla(185, 65%, 45%, 0.06)");
      grad.addColorStop(1, "hsla(175, 80%, 50%, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Main sphere — squashes with velocity
      const baseSize = 22 + Math.sin(time * 2) * 2 + sv * 0.3;
      const squashX = 1 + Math.abs(sphereVel.current.x) * 0.015;
      const squashY = 1 + Math.abs(sphereVel.current.y) * 0.015;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(squashX, 1 / squashX);

      const sphereGrad = ctx.createRadialGradient(-4, -4, 0, 0, 0, baseSize);
      sphereGrad.addColorStop(0, "hsla(185, 70%, 75%, 1)");
      sphereGrad.addColorStop(0.3, "hsla(175, 80%, 50%, 1)");
      sphereGrad.addColorStop(0.7, "hsla(175, 80%, 38%, 0.95)");
      sphereGrad.addColorStop(1, "hsla(175, 80%, 25%, 0.7)");
      ctx.beginPath();
      ctx.arc(0, 0, baseSize, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Inner highlight
      ctx.beginPath();
      ctx.arc(-baseSize * 0.25, -baseSize * 0.25, baseSize * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(185, 80%, 85%, 0.35)";
      ctx.fill();

      ctx.restore();

      // Burst particles
      for (const p of particles.current) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.alpha = 1 - p.life / p.maxLife;

        if (p.alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.alpha * 0.8})`;
          ctx.fill();

          // Particle glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.alpha * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.alpha * 0.1})`;
          ctx.fill();
        }
      }
      particles.current = particles.current.filter(p => p.life < p.maxLife);

      // Ripple effects
      for (const ripple of ripples.current) {
        ripple.radius += 4;
        ripple.alpha *= 0.955;
        const rx = ripple.x * w;
        const ry = ripple.y * h;

        ctx.beginPath();
        ctx.arc(rx, ry, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(175, 80%, 50%, ${ripple.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rx, ry, ripple.radius * 0.65, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(185, 65%, 55%, ${ripple.alpha * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Third ring
        ctx.beginPath();
        ctx.arc(rx, ry, ripple.radius * 1.3, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(175, 80%, 50%, ${ripple.alpha * 0.15})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
      ripples.current = ripples.current.filter(r => r.alpha > 0.015);

      // Mouse proximity indicator — line from sphere to mouse
      const mdist = Math.sqrt((mxPx - cx) ** 2 + (myPx - cy) ** 2);
      if (mdist > 40 && mdist < 300) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(mxPx, myPx);
        ctx.strokeStyle = `hsla(175, 80%, 50%, ${(1 - mdist / 300) * 0.08})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleClick, handleMouseMove, handleMouseDown, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    />
  );
};

export default KineticSphere;
