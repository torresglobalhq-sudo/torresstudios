import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background Video */}
      <motion.div
         style={{ y: imageY }}
         className="absolute inset-0 z-0 scale-105"
      >
         <motion.video
           autoPlay
           muted
           loop
           playsInline
           className="absolute inset-0 w-full h-full object-cover"
           style={{
             filter: "contrast(1.1) saturate(0.8) brightness(0.8) hue-rotate(-10deg)"
           }}
           src="https://res.cloudinary.com/dnzcvhw8x/video/upload/Nuevo_proyecto_2_3EDFD55_xlrcpj.mp4"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 2.5, ease: "easeInOut" }}
         />
      </motion.div>

      {/* Extreme Grain overlay */}
      <div 
        className="absolute inset-0 z-[1] opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
        }}
      />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)] pointer-events-none" />

      {/* Main text container (offset alignment) */}
      <motion.div 
        style={{ y: textY }}
        className="absolute inset-0 z-[10] flex flex-col items-start justify-end pb-[15vh] md:pb-[20vh] select-none pointer-events-none px-4 md:px-8 mix-blend-difference"
      >
        <div className="flex flex-col w-full">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="font-bold text-[8vw] md:text-[9vw] leading-[0.8] tracking-tighter text-white uppercase text-left"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              CREANDO
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-2 md:mt-2 ml-[4vw] md:ml-[6vw]">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
              className="font-bold text-[8vw] md:text-[9vw] leading-[0.8] tracking-tighter text-white uppercase text-outline-hover text-left"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              LO IMPOSIBLE
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Small subtext bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-[10] pointer-events-auto mix-blend-difference"
      >
         <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/50 max-w-[200px] leading-relaxed">
           Diseño web y fotografía que no piden permiso.
         </p>
      </motion.div>

    </section>
  );
}
