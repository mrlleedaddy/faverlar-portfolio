import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: string;
  title: string;
}

export default function VideoModal({ isOpen, onClose, media, title }: VideoModalProps) {
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-[90vw] max-h-[85vh] flex flex-col justify-center"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-10">
              <div className="text-left">
                <span className="text-[10px] tracking-[4px] uppercase text-accent mb-2 block">Cinematic View</span>
                <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider">{title.replace('\n', ' ')}</h3>
              </div>
              
              <div className="flex items-center gap-6">
                <button
                  onClick={toggleMute}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all duration-300"
                >
                  {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Video Container */}
            <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
               <video
                ref={videoRef}
                autoPlay
                controls
                className="max-w-full max-h-full shadow-2xl rounded-sm"
              >
                <source src={media} type={media.toLowerCase().endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
              </video>
            </div>

            {/* Footer info */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center opacity-30">
              <span className="text-[10px] tracking-[6px] uppercase font-sans">Press ESC to exit</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
