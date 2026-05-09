import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Typewriter = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Start delay
    const startTimeout = setTimeout(() => {
      let i = 0;
      timeout = setInterval(() => {
        if (i < text.length) {
          setDisplayText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timeout);
        }
      }, 50); // Typing speed
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timeout) clearInterval(timeout);
    };
  }, [text, delay]);

  return <span>{displayText}<span className="animate-blink">_</span></span>;
};

export default function HeroSection() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Initial name scramble entrance
    if (nameRef.current) {
      const originalText = "VERDIAWAN RAAFI";
      const SCRAMBLE_CHARS = '!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let iteration = 0;
      
      const interval = setInterval(() => {
        if (nameRef.current) {
          nameRef.current.innerText = originalText.split("").map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return originalText[index];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }).join("");
        }

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 4;
      }, 40);
    }
  }, []);

  return (
    <section id="profile" className="min-h-screen relative flex items-center justify-center pt-20 pb-20 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 relative">
        
        {/* Left Column: Avatar */}
        <div className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end relative">
          <div className="relative w-64 h-64 md:w-80 md:h-80 group cursor-none">
            {/* Hexagonal frame using clip-path */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 clip-path-hexagon transition-transform duration-500 group-hover:scale-105"
              style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
            ></div>
            
            {/* Inner avatar container */}
            <div 
              data-testid="profile-avatar"
              className="absolute inset-1 bg-background clip-path-hexagon overflow-hidden flex items-center justify-center"
              style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
            >
              {/* Duotone Filter via CSS mix-blend-mode hack or direct gradients */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00ffff] to-[#9b59b6] mix-blend-color z-10 opacity-60 group-hover:animate-glitch"></div>
              
              {/* Avatar Placeholder */}
              <div className="w-full h-full bg-muted flex items-center justify-center group-hover:animate-glitch">
                <span className="hud-text text-6xl text-primary font-bold tracking-tighter opacity-80">VR</span>
              </div>
              
              <div className="absolute inset-0 scanline opacity-30 z-20"></div>
            </div>
            
            {/* HUD decorators around avatar */}
            <div className="absolute -inset-4 border border-primary/20 rounded-full animate-float" style={{ animationDuration: '8s' }}></div>
            <div className="absolute -inset-8 border border-secondary/10 rounded-full animate-float" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="col-span-1 lg:col-span-7 relative">
          {/* Main Brackets */}
          <div className="absolute -inset-8 pointer-events-none opacity-50">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
          </div>

          <div className="relative z-10 glassmorphism p-8 md:p-12 border-l-2 border-l-primary bg-background/40">
            {/* Status indicators */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-blink glow-cyan"></div>
                <span className="mono-text text-xs text-foreground/60 tracking-widest">SYSTEM ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-blink glow-cyan" style={{ animationDelay: '0.5s' }}></div>
                <span className="mono-text text-xs text-foreground/60 tracking-widest">AI CORE ACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-blink glow-purple" style={{ animationDelay: '1s' }}></div>
                <span className="mono-text text-xs text-foreground/60 tracking-widest">NETWORK NOMINAL</span>
              </div>
            </div>

            {/* Heading */}
            <h1 
              ref={nameRef}
              className="hud-text text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-black leading-none mb-4 text-4xl sm:text-5xl md:text-7xl lg:text-[clamp(3rem,6vw,8rem)]"
              style={{ textShadow: "0 0 30px rgba(0,255,255,0.2)" }}
            >
              VERDIAWAN RAAFI
            </h1>
            
            <h2 className="mono-text text-primary text-xl md:text-2xl mb-8 tracking-widest h-8">
              <Typewriter text="BACK-END DEVELOPER & AI AGENT ENGINEER" delay={1500} />
            </h2>

            <p className="mono-text text-foreground/80 leading-relaxed max-w-2xl text-sm md:text-base border-l border-secondary/30 pl-4 py-2 bg-secondary/5">
              Self-taught developer specialized in Python, REST API integration, and multi-agent AI architectures. Architecting systems that operate autonomously in the dark void.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="glassmorphism hud-text px-6 py-3 text-primary text-sm hover:bg-primary/10 transition-colors border border-primary/50 relative overflow-hidden group">
                <span className="relative z-10">INITIALIZE PROTOCOL</span>
                <div className="absolute inset-0 bg-primary/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
