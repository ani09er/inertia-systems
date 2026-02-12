import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const clicking = useRef(false);
  const hovering = useRef(false);

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const onDown = () => {
      clicking.current = true;
      if (dotRef.current) dotRef.current.classList.add("cursor-click");
      if (ringRef.current) ringRef.current.classList.add("cursor-click");
    };

    const onUp = () => {
      clicking.current = false;
      if (dotRef.current) dotRef.current.classList.remove("cursor-click");
      if (ringRef.current) ringRef.current.classList.remove("cursor-click");
    };

    const onEnterInteractive = () => {
      hovering.current = true;
      if (ringRef.current) ringRef.current.classList.add("cursor-hover");
      if (dotRef.current) dotRef.current.classList.add("cursor-hover");
    };

    const onLeaveInteractive = () => {
      hovering.current = false;
      if (ringRef.current) ringRef.current.classList.remove("cursor-hover");
      if (dotRef.current) dotRef.current.classList.remove("cursor-hover");
    };

    const onLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    // Track interactive elements
    const addHoverListeners = () => {
      const els = document.querySelectorAll("a, button, [role='button'], input, textarea, select, [data-cursor-hover], canvas");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
      return els;
    };

    let els = addHoverListeners();
    const observer = new MutationObserver(() => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      els = addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop — ring trails the dot
    let animId: number;
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    // Hide default cursor
    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "custom-cursor-hide";
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      observer.disconnect();
      document.documentElement.style.cursor = "";
      const s = document.getElementById("custom-cursor-hide");
      if (s) s.remove();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ opacity: 0 }}
      />
      {/* Ring — trails behind */}
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ opacity: 0 }}
      />
    </>
  );
};

export default CustomCursor;
