import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<"" | "hovering" | "text-mode">("");

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isPointer = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.hover-trigger');

      const isText = 
          window.getComputedStyle(target).cursor === "text" || 
          target.tagName.toLowerCase() === "p" || 
          target.tagName.toLowerCase() === "h1" ||
          target.tagName.toLowerCase() === "h2" ||
          target.tagName.toLowerCase() === "h3";
          
      if (isPointer) {
        setCursorState("hovering");
      } else if (isText) {
        setCursorState("text-mode");
      } else {
        setCursorState("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${cursorState}`}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      style={{
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}
