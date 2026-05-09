import { useState, useRef } from "react";
import gsap from "gsap";

const navItems = [
  { id: "profile", label: "PROFILE", preview: "System Identity & Core Specs" },
  { id: "skills", label: "SKILLS", preview: "Quantum Skill Matrix & Frameworks" },
  { id: "projects", label: "PROJECTS", preview: "Active Agent Deployments" },
  { id: "ai-dashboard", label: "AI DASHBOARD", preview: "Live System Telemetry" },
];

const SCRAMBLE_CHARS = '!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function NavBar() {
  const [tooltip, setTooltip] = useState<{ show: boolean, text: string, x: number, y: number }>({ show: false, text: '', x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, label: string, preview: string) => {
    const el = e.currentTarget;
    let iteration = 0;
    
    // Simple text scramble animation
    const interval = setInterval(() => {
      el.innerText = label.split("").map((char, index) => {
        if (index < iteration) {
          return label[index];
        }
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join("");

      if (iteration >= label.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3; // speed of decipher
    }, 30);
    
    // Set tooltip
    const rect = el.getBoundingClientRect();
    setTooltip({
      show: true,
      text: preview,
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, label: string) => {
    e.currentTarget.innerText = label;
    setTooltip(prev => ({ ...prev, show: false }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 glassmorphism border-b border-primary/30 py-4 px-6 flex justify-between items-center">
        <div className="absolute top-0 left-0 w-4 h-4 bg-primary hud-bracket-tl"></div>
        <div className="absolute top-0 right-0 w-4 h-4 bg-primary hud-bracket-tr"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-primary hud-bracket-bl"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary hud-bracket-br"></div>
        
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-blink glow-cyan"></div>
          <span className="hud-text text-primary text-sm font-bold tracking-widest">SYS.VR</span>
        </div>

        <ul className="flex gap-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                data-testid={`nav-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={(e) => handleMouseEnter(e, item.label, item.preview)}
                onMouseLeave={(e) => handleMouseLeave(e, item.label)}
                className="hud-text text-foreground/80 hover:text-primary transition-colors duration-300 text-sm tracking-widest relative px-2 py-1"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Floating Tooltip */}
      {tooltip.show && (
        <div 
          className="fixed z-[100] glassmorphism px-4 py-2 border-primary/50 pointer-events-none transform -translate-x-1/2"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          <p className="mono-text text-xs text-primary/80 uppercase tracking-widest">
            <span className="text-secondary/80 mr-2">{'>'}</span>
            {tooltip.text}
          </p>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 border-t border-l border-primary/50 rotate-45"></div>
        </div>
      )}
    </>
  );
}
