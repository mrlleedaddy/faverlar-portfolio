import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-[20vh] px-[10vw]">
      <motion.p
        ref={ref}
        initial={{ opacity: 0.1 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.3] max-w-[80%] text-txt/20 bg-clip-text"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--color-txt) 50%, rgba(244, 240, 234, 0.2) 50%)',
          backgroundSize: '200% 100%',
          backgroundPosition: isInView ? '0 0' : '100% 0',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          transition: 'background-position 1.5s cubic-bezier(0.19, 1, 0.22, 1)',
        }}
      >
        突破数字媒体的平庸法则。我们剥离冗余的装饰，以光影、运动和纯粹的算法结构，重塑高定视觉的深渊与巅峰。
      </motion.p>
    </section>
  );
}
