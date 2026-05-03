import { motion } from 'motion/react';

export default function Marquee() {
  const words = ['DIGITAL COUTURE', 'FAVERLAR', 'VISUAL EXPERIMENTS', 'AESTHETICS'];
  
  return (
    <section className="py-[10vh] overflow-hidden border-t border-white/10 mt-[20vh]">
      <motion.div
        animate={{ x: ['0%', '-100%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex">
            {words.map((word, idx) => (
              <h3
                key={idx}
                className="font-display text-[8vw] px-[3vw] text-transparent hover:text-txt transition-colors duration-500"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
              >
                {word}
              </h3>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
