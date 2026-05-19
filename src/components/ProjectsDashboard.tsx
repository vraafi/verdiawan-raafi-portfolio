import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "nexus",
    name: "NEXUS-DUALBRAIN-AI",
    status: "OPERATIONAL",
    statusColor: "green",
    description:
      "An autonomous AI coding agent capable of generating code across multiple languages via Telegram. Dual-brain architecture routes tasks to specialized LLM cores.",
    tags: ["AI Agent", "Python", "Telegram Bot", "Multi-LLM"],
    testId: "project-card-nexus",
    accentColor: "primary",
    metrics: [
      { label: "UPTIME", value: "99.8%" },
      { label: "LANGUAGES", value: "12+" },
      { label: "REQUESTS", value: "∞" },
    ],
  },
  {
    id: "freelance",
    name: "AUTONOMOUS FREELANCE AGENT SYSTEM",
    status: "IN DEPLOYMENT",
    statusColor: "yellow",
    description:
      "An end-to-end system for freelance platform automation — from proposal generation to delivery tracking. Operates silently across multiple platforms.",
    tags: ["Automation", "Browser Control", "LLM", "Python"],
    testId: "project-card-freelance",
    accentColor: "secondary",
    metrics: [
      { label: "PLATFORMS", value: "3+" },
      { label: "AUTOMATION", value: "95%" },
      { label: "STATUS", value: "ACTIVE" },
    ],
  },
];

function ProjectCard({ project, onTestClick }: { project: (typeof projects)[0]; onTestClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-12, 12]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isPrimary = project.accentColor === "primary";

  return (
    <motion.div
      ref={cardRef}
      data-testid={project.testId}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative cursor-none group"
    >
      {/* Card glow */}
      <div
        className={`absolute -inset-px rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl ${
          isPrimary ? "bg-primary/20" : "bg-secondary/20"
        }`}
      />

      {/* Main card */}
      <div
        className={`glassmorphism border ${
          isPrimary ? "border-primary/30 group-hover:border-primary/70" : "border-secondary/30 group-hover:border-secondary/70"
        } transition-all duration-500 p-6 md:p-8 relative overflow-hidden h-full`}
        style={{
          boxShadow: isPrimary
            ? "0 0 0 0 rgba(0,255,255,0)"
            : "0 0 0 0 rgba(155,89,182,0)",
        }}
      >
        {/* Corner brackets */}
        <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${isPrimary ? "border-primary/60" : "border-secondary/60"}`} />
        <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${isPrimary ? "border-primary/60" : "border-secondary/60"}`} />
        <div className={`absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 ${isPrimary ? "border-primary/60" : "border-secondary/60"}`} />
        <div className={`absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 ${isPrimary ? "border-primary/60" : "border-secondary/60"}`} />

        {/* Scan line animation on hover */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-px ${isPrimary ? "bg-primary/60" : "bg-secondary/60"} opacity-0 group-hover:opacity-100`}
          animate={{ y: [0, 300, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="mono-text text-[10px] tracking-[0.3em] text-foreground/40 mb-2">
              &gt; AGENT.PROTOCOL
            </p>
            <h3
              className={`hud-text text-lg md:text-xl font-black tracking-wide ${
                isPrimary ? "text-primary" : "text-secondary"
              }`}
            >
              {project.name}
            </h3>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 border text-xs mono-text tracking-widest ${
              project.statusColor === "green"
                ? "border-green-500/50 text-green-400 bg-green-500/5"
                : "border-yellow-500/50 text-yellow-400 bg-yellow-500/5"
            }`}
          >
            <motion.div
              className={`w-1.5 h-1.5 rounded-full ${
                project.statusColor === "green" ? "bg-green-400" : "bg-yellow-400"
              }`}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {project.status}
          </div>
        </div>

        {/* Metrics bar */}
        <div className="grid grid-cols-3 gap-2 mb-6 p-3 bg-background/30 border border-white/5">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className={`hud-text text-sm font-bold ${isPrimary ? "text-primary" : "text-secondary"}`}>
                {m.value}
              </p>
              <p className="mono-text text-[9px] text-foreground/40 tracking-widest mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="mono-text text-foreground/70 text-sm leading-relaxed mb-6 border-l-2 border-white/10 pl-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`mono-text text-[10px] px-2 py-0.5 tracking-widest border ${
                isPrimary
                  ? "border-primary/20 text-primary/70 bg-primary/5"
                  : "border-secondary/20 text-secondary/70 bg-secondary/5"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action button */}
        <button
          onClick={onTestClick}
          data-testid={`btn-view-${project.id}`}
          className={`w-full glassmorphism border py-2.5 hud-text text-xs tracking-[0.3em] uppercase transition-all duration-300 relative overflow-hidden group/btn ${
            isPrimary
              ? "border-primary/40 text-primary hover:border-primary hover:bg-primary/5"
              : "border-secondary/40 text-secondary hover:border-secondary hover:bg-secondary/5"
          }`}
        >
          <span className="relative z-10">TEST LIVE PLAYGROUND</span>
          <div
            className={`absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ${
              isPrimary ? "bg-primary/10" : "bg-secondary/10"
            }`}
          />
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectsDashboard() {
  const [showPlayground, setShowPlayground] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const handleOpenPlayground = () => {
    setShowPlayground(true);
    setIframeLoading(true);
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="mono-text text-primary/60 text-xs tracking-[0.4em] mb-3 uppercase">
            &gt; ACTIVE.DEPLOYMENTS
          </p>
          <h2 className="hud-text text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary uppercase tracking-widest">
            AI DASHBOARD
          </h2>
          <div className="mt-4 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-secondary to-transparent" />
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onTestClick={handleOpenPlayground} />
          ))}
        </div>
      </div>

      {/* Glassmorphic Cyber Playground Modal */}
      <AnimatePresence>
        {showPlayground && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-6"
            style={{ cursor: "default" }}
          >
            {/* Sci-Fi Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="w-full max-w-6xl h-[85vh] bg-[#030712]/80 border border-primary/40 relative flex flex-col shadow-[0_0_50px_rgba(0,255,255,0.15)] rounded-lg overflow-hidden"
            >
              {/* Grid Background Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10" />

              {/* Corner Sci-Fi Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />

              {/* Modal Header */}
              <div className="px-6 py-4 bg-background/50 border-b border-primary/20 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full absolute" />
                  <h3 className="hud-text text-sm md:text-base font-bold text-primary tracking-widest uppercase">
                    &gt; NEXUS_AGENT_CORE.TESTBENCH
                  </h3>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowPlayground(false)}
                  className="mono-text text-xs text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/80 bg-red-950/10 px-3 py-1.5 transition-all duration-300 uppercase tracking-widest"
                >
                  [ X CLOSE TESTBENCH ]
                </button>
              </div>

              {/* Live Iframe Body */}
              <div className="flex-grow w-full relative bg-[#060814]/40 z-10 overflow-hidden">
                {/* Simulated Cyber Loader */}
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 gap-4">
                    <div className="w-16 h-16 border-2 border-t-cyan-400 border-r-cyan-400 border-b-transparent border-l-transparent rounded-full animate-spin" />
                    <div className="mono-text text-xs text-primary/80 tracking-[0.3em] uppercase animate-pulse">
                      Initializing Nominal Agent Protocols...
                    </div>
                    <div className="mono-text text-[10px] text-foreground/40 tracking-wider">
                      ESTABLISHING SECURE API GATEWAY CHANNELS
                    </div>
                  </div>
                )}

                <iframe
                  src="https://live-agent-outreach-gdyw8i9p8tyyoxvuxcy6wl.streamlit.app/?embed=true"
                  title="Nexus AI Agent Playground"
                  className="w-full h-full border-0"
                  onLoad={() => setIframeLoading(false)}
                />
              </div>

              {/* Status bar */}
              <div className="px-6 py-2 bg-background/80 border-t border-primary/20 flex items-center justify-between text-[10px] mono-text text-foreground/40 z-10">
                <span>SYSTEM STATUS: OPERATIONAL</span>
                <span className="hidden sm:inline">URL: live-agent-outreach.pages.dev</span>
                <span>SECURE CDP CONNECTION: TRUE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
