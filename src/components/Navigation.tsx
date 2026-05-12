import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Magnetic } from "./Magnetic";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    // Add small delay to let menu close transition start
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Top Left - Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="fixed top-6 left-6 md:top-10 md:left-10 z-[5000] mix-blend-difference hover-trigger cursor-pointer"
        onClick={() => scrollTo('hero')}
      >
        <span className="font-medium text-2xl tracking-tight uppercase" style={{ fontFamily: "'Barbra', sans-serif", fontWeight: 400 }}>
          Torres
        </span>
      </motion.div>

      {/* Top Right - Menu */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="fixed top-6 right-6 md:top-10 md:right-10 z-[5000] mix-blend-difference"
      >
        <Magnetic>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="font-sans text-xs uppercase tracking-[0.2em] hover-trigger px-4 py-2 bg-transparent hover:bg-white hover:text-black rounded-full transition-all duration-300"
          >
            {isOpen ? 'Cerrar' : 'Menu'}
          </button>
        </Magnetic>
      </motion.div>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[4000] bg-[#050505] flex flex-col items-center justify-center p-6"
          >
            <nav className="flex flex-col gap-6 md:gap-10 text-center">
              {[
                { name: 'Inicio', id: 'hero' },
                { name: 'El Estudio', id: 'about' },
                { name: 'Servicios', id: 'servicios' },
                { name: 'Portafolio', id: 'portafolio' },
                { name: 'Contacto', id: 'contacto' }
              ].map((item, i) => (
                <div key={item.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button 
                      onClick={() => scrollTo(item.id)}
                      className="font-display font-medium uppercase tracking-tighter text-4xl md:text-6xl text-white/80 hover:text-white transition-colors duration-300"
                    >
                      {item.name}
                    </button>
                  </motion.div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
