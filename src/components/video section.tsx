import { motion } from "motion/react";

export function VideoSection() {
  return (
    <section className="w-full bg-black px-4 md:px-10 py-24">

      <div className="mb-10">
        <p className="text-white/40 uppercase tracking-[0.3em] text-xs">
          Motion
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[28px]"
      >

        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(.85) contrast(1.1) saturate(.9)"
          }}
        >
          <source
            src="/videos/showreel.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/10" />

      </motion.div>

    </section>
  );
}