import MagneticCursor from "@/components/MagneticCursor";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import SkillMatrix from "@/components/SkillMatrix";
import ProjectsDashboard from "@/components/ProjectsDashboard";
import CryptoTicker from "@/components/CryptoTicker";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden" style={{ cursor: "none" }}>
      {/* Custom magnetic cursor */}
      <MagneticCursor />

      {/* Full-screen video background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Replace videoSrc with your 8K CGI quantum robot video URL, then uncomment the video element */}
        {/* <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="YOUR_VIDEO_URL_HERE" type="video/mp4" />
        </video> */}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/80" />

        {/* Animated SVG grid lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.04 }}
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="cyan" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 scanline pointer-events-none"
          style={{ opacity: 0.03 }}
        />

        {/* Moving scan line */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none"
          style={{ animation: "scanAnim 8s linear infinite" }}
        />
      </div>

      {/* Navigation */}
      <NavBar />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <div className="glassmorphism px-6 py-1 border border-primary/20">
              <span className="mono-text text-[10px] text-primary/50 tracking-[0.4em]">
                &gt; INITIALIZING MODULE
              </span>
            </div>
          </div>
        </div>

        <SkillMatrix />

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <div className="glassmorphism px-6 py-1 border border-secondary/20">
              <span className="mono-text text-[10px] text-secondary/50 tracking-[0.4em]">
                &gt; LOADING PROJECTS
              </span>
            </div>
          </div>
        </div>

        <ProjectsDashboard />

        {/* Footer */}
        <footer className="relative z-10 border-t border-primary/10 py-10">
          <div className="container mx-auto px-6 text-center">
            <p className="mono-text text-foreground/30 text-xs tracking-[0.3em]">
              &gt; VERDIAWAN.RAAFI — BACK-END DEVELOPER & AI AGENT ENGINEER
            </p>
            <p className="mono-text text-foreground/20 text-[10px] tracking-[0.2em] mt-2">
              SYSTEM BUILD v2.0.26 — ALL AGENTS NOMINAL
            </p>
          </div>
        </footer>
      </main>

      {/* Live crypto ticker */}
      <CryptoTicker />
    </div>
  );
}
