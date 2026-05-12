import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function History() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 800]);

  return (
    <section ref={containerRef} className="py-32 bg-[#050505] relative overflow-hidden">
      
      {/* Massive Marquee */}
      <div className="mb-32 flex flex-col gap-4 overflow-hidden py-10 mix-blend-difference pointer-events-none select-none">
        <motion.div style={{ x: x1 }} className="flex whitespace-nowrap">
          <span className="font-display text-[12vw] text-white opacity-20 pr-10 uppercase">DISRUPTIVE VISION • CREATIVE FLUX • </span>
          <span className="font-display text-[12vw] text-white opacity-20 uppercase">DISRUPTIVE VISION • CREATIVE FLUX • </span>
        </motion.div>
        
        <motion.div style={{ x: x2, marginLeft: '-50%' }} className="flex whitespace-nowrap">
          <span className="font-serif italic text-[10vw] text-transparent text-outline pr-10">PIXEL PERFECT • TIMELESS ESSENCE • </span>
          <span className="font-serif italic text-[10vw] text-transparent text-outline">PIXEL PERFECT • TIMELESS ESSENCE • </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-20">
        <div className="md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-sans text-sm uppercase tracking-[0.3em] text-[#ff3300] mb-6 block">Nuestra Historia</h2>
            <h3 className="font-display text-5xl md:text-7xl text-white uppercase leading-[0.9]">
              El Legado de <br/>
              La Excelencia
            </h3>
            <p className="font-script text-4xl mt-6 text-white/40 transform -rotate-2">desde el primer cuadro</p>
          </motion.div>
        </div>

        <div className="md:w-1/2 flex flex-col justify-center">
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1, delay: 0.3 }}
             className="font-sans text-xl md:text-2xl text-white/70 leading-relaxed font-light mb-10 text-balance"
          >
            Empezamos en un pequeño estudio, integrando líneas de código con el arte de capturar la luz. Una visión nacía de la necesidad absoluta de perfección.
          </motion.p>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1, delay: 0.5 }}
             className="font-sans text-lg text-white/40 leading-relaxed max-w-md"
          >
             Llevamos nuestra lente de lo local a lo global. Transformación en una boutique de experiencias. No solo hacemos páginas web, construimos universos digitales de alto calibre.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-16 h-16 rounded-full border border-white/20 mt-12 flex items-center justify-center hover-trigger"
          >
            <span className="block w-2 h-2 bg-[#ff3300] rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
