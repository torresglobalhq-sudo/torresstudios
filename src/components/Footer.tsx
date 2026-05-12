import { motion } from "motion/react";
import { Magnetic } from "./Magnetic";

export function Footer() {
  return (
    <footer className="relative bg-black text-white z-20">
      
      {/* PARTNERS SECTION */}
      <div className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-[85vw] mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-24">
            
            <div className="md:w-1/2">
                <h2 className="font-display font-medium text-5xl md:text-[5rem] lg:text-[7rem] uppercase tracking-tighter leading-[0.85] text-white">
                    ¿Listo para <br/> ser parte <br/> de Torres?
                </h2>
            </div>
            
            <div className="md:w-1/2 flex flex-col gap-10">
                <p className="font-sans text-lg md:text-2xl leading-relaxed text-white/70">
                   No buscamos clientes. Buscamos aliados. Marcas que entiendan que el diseño no es un gasto — es la diferencia entre ser ignorado y ser inevitable.
                </p>

                <p className="font-sans text-base md:text-xl leading-relaxed text-white/40">
                   Si llegaste hasta aquí, probablemente ya sabes que nos necesitas.
                </p>

                <Magnetic>
                  <button 
                    onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                    className="self-start font-sans text-xs uppercase tracking-[0.2em] hover-trigger px-10 py-5 bg-white text-black hover:bg-[#ff3300] hover:text-white transition-colors duration-300 rounded-full mt-4"
                  >
                      Hablemos
                  </button>
                </Magnetic>
            </div>

        </div>
      </div>

      {/* CONTACTO SECTION */}
      <div id="contacto" className="relative py-20 md:py-32 px-6 md:px-12 bg-[#050505] border-t border-white/10 hover-trigger">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,51,0,0.1)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
        
        <div className="max-w-[85vw] mx-auto flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
            
            <div className="md:w-1/3">
                <h2 className="font-display font-medium text-6xl md:text-[6rem] uppercase tracking-tighter leading-[0.85] mb-6">
                    El primer paso <br/>
                    <span className="text-white/30">es tuyo.</span>
                </h2>

                <p className="font-sans text-sm md:text-base leading-relaxed text-white/50 max-w-sm mt-8">
                    Cuéntanos tu proyecto. Respondemos en menos de 24 horas.
                    <br/><br/>
                    O escríbenos directamente a:
                    <br/>
                    <a 
                      href="mailto:alexander@torresglobal.partners" 
                      className="text-white hover:text-[#ff3300] hover-trigger transition-colors"
                    >
                      alexander@torresglobal.partners
                    </a>
                </p>
            </div>

            <div className="md:w-2/3 w-full pl-0 md:pl-20">

                <form 
                  action="https://formspree.io/f/xwvyyoaq"
                  method="POST"
                  className="flex flex-col gap-10 w-full"
                >

                    <input
                      type="hidden"
                      name="_next"
                      value="https://torresstudios.vercel.app"
                    />

                    <div className="w-full relative group">
                        <input 
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            required
                            className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors hover-trigger hover:border-white/50"
                        />
                    </div>

                    <div className="w-full relative group">
                        <input 
                            type="email"
                            name="email"
                            placeholder="Correo"
                            required
                            className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors hover-trigger hover:border-white/50"
                        />
                    </div>

                    <div className="w-full relative group">
                        <textarea 
                            name="message"
                            placeholder="Mensaje"
                            rows={4}
                            required
                            className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors resize-none hover-trigger hover:border-white/50"
                        ></textarea>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        type="submit"
                        className="self-start md:self-end font-sans text-xs uppercase tracking-[0.2em] px-10 py-5 bg-[#ff3300] text-white hover:bg-white hover:text-black transition-colors duration-300 rounded-full mt-8 hover-trigger"
                    >
                        Enviar mensaje
                    </motion.button>

                </form>

            </div>
        </div>

        <div className="max-w-[85vw] mx-auto mt-32 md:mt-48 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-40">
            © {new Date().getFullYear()} Torres Agency.
          </p>

          <div className="flex gap-8 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-60">
            
            <a 
              href="https://instagram.com/weare.torres"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-trigger hover:text-[#ff3300] transition-colors"
            >
              O encuéntranos en Instagram: @weare.torres
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
}