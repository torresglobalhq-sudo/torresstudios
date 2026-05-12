/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import Lenis from "lenis";
import { Loader } from "./components/Loader";
import { CustomCursor } from "./components/CustomCursor";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { SelectedWorks } from "./components/SelectedWorks";
import { Footer } from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  return (
    <>
      <div className="grain-overlay" />
      <CustomCursor />
      <Navigation />
      
      {loading && <Loader onComplete={handleLoaderComplete} />}

      <main className={`relative transition-opacity duration-1000 ${loading ? 'h-screen overflow-hidden opacity-0' : 'opacity-100'}`}>
        <Hero />
        <About />
        <Services />
        <SelectedWorks />
        <Footer />
      </main>
    </>
  );
}
