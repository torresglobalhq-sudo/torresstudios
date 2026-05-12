import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

const works = [
  { id: 1, title: "Lumina Vision", category: "Web Experience", src: "https://storage.googleapis.com/aistudio-user-content-frontend/2d38df81-f2fe-4318-ae7f-94ad60a28ab7/0bd6de85-e69e-4c72-9c17-a068cd6019ce.jpeg" },
  { id: 2, title: "Aethel Red", category: "Editorial", src: "https://storage.googleapis.com/aistudio-user-content-frontend/2d38df81-f2fe-4318-ae7f-94ad60a28ab7/bf684742-df21-4f1b-bdb2-5813735745dc.jpeg" },
  { id: 3, title: "Noir Collection", category: "Fotografía", src: "https://storage.googleapis.com/aistudio-user-content-frontend/2d38df81-f2fe-4318-ae7f-94ad60a28ab7/0bd6de85-e69e-4c72-9c17-a068cd6019ce.jpeg" },
  { id: 4, title: "Oasis Digital", category: "App Design", src: "https://storage.googleapis.com/aistudio-user-content-frontend/2d38df81-f2fe-4318-ae7f-94ad60a28ab7/bf684742-df21-4f1b-bdb2-5813735745dc.jpeg" },
];

export function Works() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative py-32 bg-[#050505] px-6 z-20 hover-trigger">
      <div className="max-w-7xl mx-auto mb-32 border-b border-white/20 pb-10 flex flex-col md:flex-row justify-between items-end">
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl uppercase leading-none"
          >
            Selected Works
          </motion.h2>
        </div>
        <p className="font-sans text-white/50 max-w-sm mt-6 md:mt-0 text-lg">
          Un enfoque implacable en los detalles. Proyectos que definen marcas y traspasan límites.
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative cursor-pointer" onMouseLeave={() => setHoveredIdx(null)}>
        {works.map((work, idx) => (
          <div 
            key={work.id}
            onMouseEnter={() => setHoveredIdx(idx)}
            className="group relative border-b border-white/10 py-12 md:py-16 flex items-center justify-between"
          >
            <div className="relative z-20 overflow-hidden mix-blend-difference w-full">
               <motion.span 
                 className="block font-display text-5xl md:text-8xl text-transparent text-outline-hover uppercase transition-all duration-500 origin-left"
               >
                  {work.title}
               </motion.span>
               <span className="block font-sans text-sm uppercase tracking-[0.2em] text-[#ff3300] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-0 md:mt-0">
                 {work.category}
               </span>
            </div>
            
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] md:w-[35vw] h-[40vh] md:h-[50vh] z-10 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden scale-y-0 opacity-0 ${hoveredIdx === idx ? 'scale-y-100 opacity-100' : ''}`}
            >
               <div 
                 className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-out scale-150"
                 style={{ 
                   backgroundImage: `url(${work.src})`,
                   transform: hoveredIdx === idx ? 'scale(1)' : 'scale(1.5)',
                   filter: 'grayscale(100%) contrast(1.2)'
                 }}
               />
               <div className="absolute inset-0 bg-brand-red/20 mix-blend-color-burn" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
