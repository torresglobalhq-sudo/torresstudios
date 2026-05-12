import { motion, useScroll, useTransform, useVelocity, useSpring, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";

const projects = [
  {
    id: "01",
    title: "Silla Metal",
    category: "Industrial Design",
    src: "/fonts/sillametal.jpeg", 
    colSpan: "md:col-span-7",
    aspectRatio: "aspect-[4/3] md:aspect-[16/10]",
    description: "Una silla de metal con diseño contemporáneo y líneas industriales, ideal para espacios minimalistas."
  },
  {
    id: "02",
    title: "Ave Volando",
    category: "Photography",
    src: "/fonts/avevolando.jpeg",
    colSpan: "md:col-span-5",
    aspectRatio: "aspect-[3/4] md:aspect-[4/5]",
    description: "Un momento de gracia pura capturado mientras el ave despliega sus alas en pleno vuelo."
  },
  {
    id: "03",
    title: "Lago Serial",
    category: "Landscape",
    src: "/fonts/lago.jpeg",
    colSpan: "md:col-span-4",
    aspectRatio: "aspect-[3/4] md:aspect-[4/5]",
    description: "Un paisaje sereno que refleja la inmensidad y quietud del agua."
  },
  {
    id: "04",
    title: "Jardín Botánico",
    category: "Nature",
    src: "/fonts/jardin.jpeg",
    colSpan: "md:col-span-8",
    aspectRatio: "aspect-[16/9] md:aspect-[16/10]",
    description: "La naturaleza en su estado más puro, una colección de vida y color."
  },
  {
    id: "05",
    title: "Árbol Solitario",
    category: "Fine Art",
    src: "/fonts/arbol.jpeg",
    colSpan: "md:col-span-6",
    aspectRatio: "aspect-square",
    description: "La resiliencia de la naturaleza representada en un único árbol en el horizonte."
  },
  {
    id: "06",
    title: "Resplandor",
    category: "Light & Shadow",
    src: "/fonts/resplandor.jpeg",
    colSpan: "md:col-span-6",
    aspectRatio: "aspect-square md:aspect-[4/3]",
    description: "Un juego visual donde el resplandor de la luz crea volúmenes imposibles."
  },
  {
     id: "07",
     title: "Anochecer",
     category: "Landscape",
     src: "/fonts/anochecer.jpeg",
     colSpan: "md:col-span-12",
     aspectRatio: "aspect-[16/9] md:aspect-[21/9]",
     description: "Los últimos rayos del sol despidiendo el día en tonos cálidos."
  },
  {
     id: "08",
     title: "Estrellas",
     category: "Astrophotography",
     src: "/fonts/estrellas.jpeg",
     colSpan: "md:col-span-7",
     aspectRatio: "aspect-[16/9] md:aspect-[16/10]",
     description: "Mirar al firmamento para entender nuestra escala en el universo infinito."
  },
  {
     id: "09",
     title: "Brillo Oscuro",
     category: "Abstract",
     src: "/fonts/brillo oscuro.jpeg",
     colSpan: "md:col-span-5",
     aspectRatio: "aspect-[4/3] md:aspect-[4/5]",
     description: "Texturas que absorben y reflejan la luz, creando un aura de misterio y elegancia."
  }
];

function ProjectCard({ project, onClick }: { project: any, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const skewY = useTransform(smoothVelocity, [-2000, 2000], ["-2deg", "2deg"]);
  const scale = useTransform(smoothVelocity, [-2000, 0, 2000], [0.95, 1, 0.95]);
  const borderRadius = useTransform(smoothVelocity, [-2000, 0, 2000], ["40px", "0px", "40px"]);

  // Camera lens distortion effect
  const imgScale = useTransform(smoothVelocity, [-2000, 0, 2000], [1.15, 1, 1.15]);
  const imgBlur = useTransform(smoothVelocity, [-2000, 0, 2000], ["3px", "0px", "3px"]);

  return (
    <motion.div 
      ref={ref}
      style={{ skewY, scale, borderRadius }}
      className={`${project.colSpan} ${project.aspectRatio} relative group overflow-hidden bg-[#111] cursor-pointer`}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y, scale: imgScale, filter: useTransform(imgBlur, (blur) => `blur(${blur}) brightness(0.9)`) }}
      >
        <img 
          src={project.src} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-105 opacity-100 md:opacity-80 md:group-hover:opacity-100 filter grayscale-0 md:grayscale md:group-hover:grayscale-0" 
        />
      </motion.div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none" />

      {/* Info */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none">
        <div className="translate-y-0 opacity-100 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 mb-3 block">
            {project.category}
          </span>
          <h3 className="font-display font-medium text-4xl md:text-6xl uppercase tracking-tighter text-white leading-none">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  return (
    <section id="portafolio" className="relative py-32 bg-black text-white px-6 md:px-12 z-20 hover-trigger">
      <div className="max-w-[85vw] mx-auto border-t border-white/20 pt-10 mb-20 flex flex-col md:flex-row justify-between items-start md:items-end">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-5xl md:text-7xl uppercase tracking-tighter"
        >
          Selected Works
        </motion.h2>
        <span className="font-sans text-xs uppercase tracking-[0.2em] opacity-50 mt-6 md:mt-0">03 — Portafolio</span>
      </div>

      <div className="max-w-[85vw] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[6000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
               initial={{ y: 50, scale: 0.95 }}
               animate={{ y: 0, scale: 1 }}
               exit={{ y: 20, scale: 0.95 }}
               transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
               className="relative w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row bg-[#0a0a0a] rounded-2xl overflow-hidden cursor-default shadow-2xl border border-white/10"
               onClick={(e) => e.stopPropagation()}
            >
               <div className="w-full md:w-2/3 h-[40vh] md:h-auto min-h-[40vh] relative bg-black">
                 <img src={selectedProject.src} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover" />
               </div>
               <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center gap-6">
                 <div>
                   <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 block mb-2">
                     {selectedProject.category}
                   </span>
                   <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-white">
                     {selectedProject.title}
                   </h3>
                 </div>
                 <div className="h-[1px] w-full bg-white/10" />
                 <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed">
                   {selectedProject.description}
                 </p>
                 <button 
                   onClick={() => setSelectedProject(null)}
                   className="mt-8 self-start font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] border border-white/30 rounded-full px-6 py-2 hover:bg-white hover:text-black transition-colors duration-300"
                 >
                   Cerrar
                 </button>
               </div>
               
               <button 
                 onClick={() => setSelectedProject(null)}
                 className="absolute top-4 right-4 text-white/50 hover:text-white p-2 z-10 transition-colors bg-black/50 backdrop-blur-md rounded-full"
               >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
