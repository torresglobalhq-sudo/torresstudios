import { motion } from "motion/react";
import { useState } from "react";
import { Magnetic } from "./Magnetic";

const services = [
  { 
    id: "01", 
    title: "Diseño Web", 
    desc: "No construimos sitios. Construimos experiencias que convierten visitantes en clientes. Rápido, preciso, sin plantillas.", 
    cta: "Quiero mi sitio",
    src: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: "02", 
    title: "Fotografía", 
    desc: "Imágenes que detienen el scroll. Cada toma captura lo que las palabras no pueden decir.", 
    cta: null,
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: "03", 
    title: "Contenido Visual", 
    desc: "Videos cinematográficos para tu marca. Sin semanas de producción. Sin presupuestos imposibles. Solo resultados.", 
    cta: null,
    src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop" 
  },
];

export function Services() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="servicios" className="relative py-32 md:py-48 bg-black text-white px-6 md:px-12 z-20 hover-trigger">
      <div className="max-w-[85vw] mx-auto border-t border-white/20 pt-10 mb-20 flex flex-col md:flex-row justify-between items-start md:items-end">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-5xl md:text-7xl uppercase tracking-tighter"
        >
          Lo que hacemos.
        </motion.h2>
        <span className="font-sans text-xs uppercase tracking-[0.2em] opacity-50 mt-6 md:mt-0">02 — Servicios</span>
      </div>

      <div 
        className="max-w-[85vw] mx-auto relative cursor-pointer"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {services.map((service, idx) => (
          <div 
            key={service.id}
            onMouseEnter={() => setHoveredIdx(idx)}
            className="group relative border-b border-white/10 py-10 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden gap-6 md:gap-0"
          >
            {/* Background Hover Effect */}
            <div 
              className="absolute inset-0 bg-[#0a0a0a] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
            />

            <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 w-full mix-blend-difference pointer-events-none">
               <span className="font-sans text-sm md:text-lg opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                 {service.id}
               </span>
               <h3 className="font-display font-medium text-4xl md:text-7xl tracking-tighter uppercase transition-transform duration-500 origin-left md:group-hover:translate-x-4">
                 {service.title}
               </h3>
               
               <div className="md:ml-auto md:max-w-xs flex flex-col items-start gap-4 transition-all duration-300 transform md:translate-y-4 md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100">
                 <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed normal-case pointer-events-auto">
                   {service.desc}
                 </p>
                 {service.cta && (
                   <Magnetic>
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                       }}
                       className="font-sans pointer-events-auto text-[10px] md:text-xs uppercase tracking-[0.2em] border border-white/30 rounded-full px-6 py-2 hover:bg-[#ff3300] hover:text-white hover:border-[#ff3300] transition-colors duration-300"
                     >
                       {service.cta}
                     </button>
                   </Magnetic>
                 )}
               </div>
            </div>
            
            {/* Hover Image Reveal centered (hidden on mobile for better UX) */}
            <div 
              className={`hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[45vh] z-10 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${hoveredIdx === idx ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
              style={{ transformOrigin: 'center' }}
            >
               <div 
                 className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-out brightness-75"
                 style={{ 
                   backgroundImage: `url(${service.src})`,
                   transform: hoveredIdx === idx ? 'scale(1)' : 'scale(1.2)',
                 }}
               />
            </div>
          </div>
        ))}
      </div>

      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 1, delay: 0.5 }}
         className="max-w-[85vw] mx-auto mt-40 text-center border-b border-white/20 pb-24"
      >
        <p className="font-display text-4xl md:text-6xl text-white/80 tracking-tight uppercase leading-[0.9]">
          Tu competencia ya nos contactó. <br/><br/><span className="text-[#ff3300]">¿Tú qué esperas?</span>
        </p>
      </motion.div>
    </section>
  );
}
