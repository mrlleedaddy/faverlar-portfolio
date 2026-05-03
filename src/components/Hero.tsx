import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const yTranslate = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 门面视频：沉浸式 TVC */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1] }}
        className="absolute inset-0 z-0"
      >
        <video
          src="/videos/tvc/video1.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover grayscale-[20%] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-bg/40 backdrop-blur-[2px]" />
      </motion.div>

      <motion.div
        style={{ y: yTranslate }}
        className="relative z-10 text-center mix-blend-difference"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 0.8 }}
          className="font-sans text-[12px] tracking-[6px] uppercase text-txt mb-6 block"
        >
          Selected AI Works
        </motion.span>
        <h1 className="font-display text-[15vw] md:text-[13vw] leading-[0.8] font-medium uppercase -tracking-[0.04em]">
          FAVERLAR
        </h1>
        <h1 className="font-display text-[15vw] md:text-[13vw] leading-[0.8] font-normal uppercase italic text-accent -tracking-[0.04em]">
          PORTFOLIO
        </h1>
      </motion.div>

      <div className="absolute bottom-10 left-10 md:left-20 z-20">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[2px] uppercase opacity-40">Creative Direction</span>
          <span className="text-[14px] tracking-[4px] uppercase font-medium">TVC & Visual AI</span>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 md:right-20 flex flex-col items-center gap-4 z-20">
        <span className="text-[10px] tracking-[4px] uppercase opacity-50 [writing-mode:vertical-lr]">Scroll</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-full bg-txt"
          />
        </div>
      </div>
    </section>
  );
}
