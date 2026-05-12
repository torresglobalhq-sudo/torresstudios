import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Quickly animate 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 1600); // Hold at 100 for a bit longer to see animation
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 12) + 4, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const torresText = "TORRES".split('');
  const studiosText = "STUDIOS".split('');

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <div className="fixed inset-0 z-[1000] pointer-events-none">
          {/* Top Half */}
          <motion.div
            exit={{ y: "-100%", skewY: 2 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-full h-[50vh] bg-[#b32400] overflow-hidden flex items-end justify-center pb-1 md:pb-2"
          >
            {/* Ambient Moving Glows */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], x: ["-10%", "15%", "-10%"], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_150%,rgba(255,80,0,0.9)_0%,transparent_50%)] pointer-events-none mix-blend-screen"
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], x: ["10%", "-20%", "10%"], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_150%,rgba(255,120,50,0.7)_0%,transparent_60%)] pointer-events-none mix-blend-screen"
            />
            
            {/* Vignette / Shadows */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_100%,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
            
            {/* Grain Overlay */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
            
            <motion.div 
              className="flex z-10 drop-shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, filter: "blur(10px)", y: 20 }}
              animate={{ scale: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {torresText.map((char, index) => (
                <motion.h1
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white uppercase text-[8vw] md:text-[6vw] leading-none tracking-tight"
                  style={{ fontFamily: "'Barbra', sans-serif", fontWeight: 400, transformOrigin: "bottom center" }}
                >
                  {char}
                </motion.h1>
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom Half */}
          <motion.div
            exit={{ y: "100%", skewY: 2 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#b32400] overflow-hidden flex items-start justify-center pt-1 md:pt-2"
          >
            {/* Ambient Moving Glows */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], x: ["-10%", "15%", "-10%"], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_-50%,rgba(255,80,0,0.9)_0%,transparent_50%)] pointer-events-none mix-blend-screen"
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], x: ["10%", "-20%", "10%"], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_-50%,rgba(255,120,50,0.7)_0%,transparent_60%)] pointer-events-none mix-blend-screen"
            />

            {/* Vignette / Shadows */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
            
            {/* Grain Overlay */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
            
            <div className="flex z-10 drop-shadow-2xl overflow-hidden mt-1 md:mt-2">
              {studiosText.map((char, index) => (
                <motion.h1
                  key={index}
                  initial={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                  animate={{ 
                    opacity: progress > 30 ? 1 : 0, 
                    y: progress > 30 ? 0 : -40,
                    filter: progress > 30 ? "blur(0px)" : "blur(10px)"
                  }}
                  transition={{ duration: 0.8, delay: (index * 0.05) + (progress > 30 ? 0 : 999), ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans font-bold text-white uppercase text-[5vw] md:text-[3vw] leading-none tracking-[0.2em]"
                  style={{ transformOrigin: "top center" }}
                >
                  {char}
                </motion.h1>
              ))}
            </div>
            
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex flex-col items-end">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex items-start"
               >
                 <span className="text-white font-sans text-5xl md:text-7xl font-light tracking-tighter tabular-nums">
                   {progress}
                 </span>
                 <span className="text-[#ff7832] font-sans text-lg md:text-xl ml-1 mt-1 font-bold">
                   %
                 </span>
               </motion.div>
               <motion.div 
                 className="h-[2px] bg-white/20 mt-2 rounded-full overflow-hidden w-24 md:w-32 flex justify-end"
               >
                 <motion.div 
                   className="h-full bg-white"
                   initial={{ width: "0%" }}
                   animate={{ width: `${progress}%` }}
                   transition={{ ease: "linear" }}
                 />
               </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
