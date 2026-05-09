import { motion } from "framer-motion";

const skills = [
  { label: "Python", color: "primary" },
  { label: "Luau", color: "secondary" },
  { label: "LLM Integration", color: "primary" },
  { label: "Google Gemini API", color: "secondary" },
  { label: "Telegram Bot API", color: "primary" },
  { label: "Browser Automation", color: "secondary" },
  { label: "REST API", color: "primary" },
  { label: "Multi-Agent AI", color: "secondary" },
];

const floatVariants = (i: number) => ({
  animate: {
    y: [0, -10, 0, 8, 0],
    x: [0, 4, -4, 2, 0],
    transition: {
      duration: 3 + (i % 4) * 0.8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.3,
    },
  },
});

export default function SkillMatrix() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 relative">
          <div className="inline-block relative">
            <p className="mono-text text-primary/60 text-xs tracking-[0.4em] mb-3 uppercase">
              &gt; SYSTEM.CAPABILITIES
            </p>
            <h2 className="hud-text text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase tracking-widest">
              QUANTUM SKILL MATRIX
            </h2>
            {/* Scanning underline */}
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ x: [-80, 600] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </div>

        {/* Floating skill tags */}
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.label}
              data-testid={`skill-tag-${skill.label.toLowerCase().replace(/\s+/g, "-")}`}
              variants={floatVariants(i)}
              animate="animate"
              whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
              className="relative group cursor-none"
            >
              <div
                className={`glassmorphism px-5 py-2.5 border ${
                  skill.color === "primary"
                    ? "border-primary/40 hover:border-primary/80"
                    : "border-secondary/40 hover:border-secondary/80"
                } transition-all duration-300 relative overflow-hidden`}
              >
                {/* Hover glow background */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    skill.color === "primary" ? "bg-primary/10" : "bg-secondary/10"
                  }`}
                />
                {/* Corner tick marks */}
                <div
                  className={`absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l ${
                    skill.color === "primary" ? "border-primary/60" : "border-secondary/60"
                  }`}
                />
                <div
                  className={`absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r ${
                    skill.color === "primary" ? "border-primary/60" : "border-secondary/60"
                  }`}
                />
                <span
                  className={`mono-text text-sm tracking-widest relative z-10 ${
                    skill.color === "primary"
                      ? "text-primary group-hover:text-white"
                      : "text-secondary group-hover:text-white"
                  } transition-colors duration-300`}
                >
                  {skill.label}
                </span>
              </div>
              {/* Drop glow on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl ${
                  skill.color === "primary" ? "bg-primary/30" : "bg-secondary/30"
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Decorative hex grid */}
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-8 gap-2 opacity-10">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 border border-primary rotate-45"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
