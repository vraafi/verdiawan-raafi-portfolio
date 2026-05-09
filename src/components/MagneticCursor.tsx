import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    
    if (!dot || !ring) return;

    // Set initial position
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const ctx = gsap.context(() => {
      const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
      const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
      
      const xToRing = gsap.quickTo(ring, "x", { duration: 0.6, ease: "power3" });
      const yToRing = gsap.quickTo(ring, "y", { duration: 0.6, ease: "power3" });

      const onMouseMove = (e: MouseEvent) => {
        xToDot(e.clientX);
        yToDot(e.clientY);
        xToRing(e.clientX);
        yToRing(e.clientY);
      };

      const onMouseDown = () => {
        gsap.to(dot, { scale: 0.8, duration: 0.1 });
        gsap.to(ring, { scale: 0.8, backgroundColor: "rgba(0, 255, 255, 0.1)", duration: 0.2 });
      };

      const onMouseUp = () => {
        gsap.to(dot, { scale: 1, duration: 0.1 });
        gsap.to(ring, { scale: 1, backgroundColor: "transparent", duration: 0.2 });
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[10000] mix-blend-screen glow-cyan"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
