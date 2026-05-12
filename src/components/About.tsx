import { motion } from "motion/react";
import { PhysicsBalls } from "./PhysicsBalls";

export function About() {
  const introText = "Torres nació en Irapuato con una convicción: ".split(" ");
  const introHighlight = "las marcas locales merecen diseño de nivel mundial.".split(" ");

  return (
    <section id="about" className="relative py-32 md:py-56 bg-black text-white px-6 md:px-12 z-20 overflow-hidden">
      <PhysicsBalls />
      <div className="relative z-10 pointer-events-none max-w-[85vw] mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-32">
        <div className="md:w-1/3">
           <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
              <h2 className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-50 mb-6">01 — The Studio</h2>
              <div className="w-full h-[1px] bg-white/20 mb-10" />
           </motion.div>
        </div>
        
        <div className="md:w-2/3">
          <motion.h3
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             transition={{ staggerChildren: 0.05 }}
             className="font-display font-medium text-4xl md:text-5xl lg:text-7xl leading-[1] tracking-tighter"
          >
            {introText.map((word, i) => (
              <span key={`1-${i}`} className="inline-block overflow-hidden pb-2">
                <motion.span 
                  className="inline-block mr-3"
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="text-white/40 inline-block overflow-hidden pb-2">
              {introHighlight.map((word, i) => (
                <span key={`2-${i}`} className="inline-block overflow-hidden">
                  <motion.span 
                    className="inline-block mr-3"
                    variants={{
                      hidden: { y: "100%", opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h3>
          
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
             className="mt-16 md:mt-24 max-w-2xl flex flex-col gap-6"
          >
            <p className="font-sans text-sm md:text-base leading-relaxed text-white/50">
              Somos velocidad sin sacrificar el arte. Obsesión por los detalles que nadie nota pero todos sienten. Cada proyecto es una declaración.
            </p>
            <p className="font-sans text-sm md:text-base leading-relaxed text-white/50">
              No trabajamos con cualquiera. Trabajamos con quienes quieren ser recordados.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
