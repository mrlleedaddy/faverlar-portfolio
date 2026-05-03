import { motion, useSpring, useMotionValue } from 'motion/react';
import { useRef } from 'react';

export default function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Limits the movement to 40px
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-10 cursor-pointer"
    >
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="w-[180px] h-[180px] rounded-full border border-accent flex items-center justify-center relative overflow-hidden group interactive"
      >
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0 bg-accent z-0 group-hover:h-full group-hover:top-0 group-hover:bottom-auto transition-all duration-500 ease-expo"
        />
        <span className="relative z-10 font-sans text-[12px] tracking-[2px] uppercase text-txt">
          {children}
        </span>
      </motion.div>
    </div>
  );
}
