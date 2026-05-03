import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface WorkItemProps {
  title: string;
  category: string;
  index: string;
  media: string;
  type: 'video' | 'image';
  className?: string;
  layout?: 'left' | 'right' | 'center';
  size?: 'large' | 'portrait' | 'landscape';
  titlePos?: 'tl' | 'br' | 'center' | 'left-float';
}

export default function WorkItem({
  title,
  category,
  index,
  media,
  type,
  layout = 'left',
  size = 'large',
  titlePos = 'tl',
}: WorkItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const titleY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const sizeClasses = {
    large: 'w-full md:w-[70vw] h-[60vh] md:h-[85vh]',
    portrait: 'w-full md:w-[40vw] h-[75vh] md:h-[100vh]',
    landscape: 'w-full md:w-[85vw] h-[55vh] md:h-[65vh]',
  };

  const layoutClasses = {
    left: 'justify-start pl-[5vw]',
    right: 'justify-end pr-[5vw]',
    center: 'justify-center',
  };

  const titlePositions = {
    tl: '-top-[8%] left-[5%]',
    br: '-bottom-[8%] right-[5%] text-right',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center',
    'left-float': 'left-[-15%] top-1/4',
  };

  return (
    <div
      ref={containerRef}
      className={`flex items-center relative py-[15vh] ${layoutClasses[layout]}`}
    >
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className={`relative overflow-hidden interactive group ${sizeClasses[size]}`}
      >
        <motion.div className="w-full h-full overflow-hidden">
          {type === 'video' ? (
            <div className="relative w-full h-full bg-white/[0.03] overflow-hidden group">
              <video
                key={media}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src={media} type={media.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
              </video>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-[10px] tracking-widest uppercase opacity-60">Source: {media.split('/').pop()}</span>
              </div>
            </div>
          ) : (
            <img
              src={media}
              alt={title}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
            />
          )}
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: titleY }}
        className={`absolute z-10 pointer-events-none mix-blend-difference hidden md:block ${titlePositions[titlePos as keyof typeof titlePositions] || titlePositions.tl}`}
      >
        <h2 className="font-display text-[7vw] md:text-[9vw] font-normal leading-[0.8] tracking-tighter uppercase whitespace-pre-wrap">
          {title}
        </h2>
        <div className="mt-8 flex items-center gap-6">
          <span className="text-accent text-[12px] uppercase tracking-[4px]">{index}</span>
          <div className="h-px w-20 bg-accent/30" />
          <span className="font-sans text-[12px] tracking-[4px] uppercase text-txt/60">
            {category}
          </span>
        </div>
      </motion.div>

      {/* Mobile Title */}
      <div className="md:hidden mt-8 px-[5vw]">
        <h2 className="font-display text-4xl uppercase leading-tight">{title}</h2>
        <span className="font-sans text-[10px] tracking-widest uppercase text-accent mt-4 block">
           {index} / {category}
        </span>
      </div>
    </div>
  );
}
