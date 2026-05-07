import { useState, useRef, useEffect, useCallback } from 'react';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import Manifesto from './components/Manifesto';
import WorkItem from './components/WorkItem';
import Marquee from './components/Marquee';
import MagneticButton from './components/MagneticButton';
import VideoModal from './components/VideoModal';
import { AnimatePresence, motion } from 'motion/react';

// Sub-tab component for categories with subcategories
function SubTabs({ tabs, activeTab, onTabChange }: { tabs: { key: string; label: string }[]; activeTab: string; onTabChange: (key: string) => void }) {
  return (
    <div className="flex gap-2 mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-6 py-2 text-[10px] tracking-[3px] uppercase border transition-all duration-300 ${
            activeTab === tab.key
              ? 'border-accent text-accent bg-accent/5'
              : 'border-white/10 text-txt/40 hover:border-white/30 hover:text-txt/70'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Lazy video component: loads metadata after a staggered delay, plays on hover
function LazyVideo({ src, className, delay = 0 }: { src: string; className?: string; delay?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Stagger loading to avoid concurrent large file requests
    const timer = setTimeout(() => {
      setLoaded(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (loaded && videoRef.current) {
      // Load metadata to show thumbnail
      videoRef.current.load();
    }
  }, [loaded]);

  const handleMouseEnter = useCallback(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload={loaded ? "metadata" : "none"}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

const WORK_DATA = {
  agent: [
    {
      title: "库存智能助手",
      subtitle: "OpenClaw + 飞书表格",
      description: "为采购每天节省55分钟，领导查询从5-10分钟降至10秒",
      metrics: [
        { label: "公式更新", value: "46个", unit: "自动完成" },
        { label: "查询提效", value: "30-60x", unit: "倍提升" },
        { label: "月省时间", value: "24", unit: "小时" },
        { label: "ROI", value: "∞", unit: "零工具成本" }
      ],
      features: [
        { icon: "⚡", title: "自动更新公式", desc: "读取6个仓库日更表，批量更新223个跨表引用公式" },
        { icon: "🔍", title: "智能查询", desc: "支持精确查询、跨仓对比、汇总计算、条件筛选4种方式" },
        { icon: "📊", title: "库存测算", desc: "可卖天数、直播备货、补货建议3种测算类型" }
      ],
      caseUrl: "https://github.com/mrlleedaddy/faverlar-portfolio/blob/main/Agent%E6%A1%88%E4%BE%8B1_%E5%BA%93%E5%AD%98%E6%99%BA%E8%83%BD%E5%8A%A9%E6%89%8B.md",
      layout: "hero",
      type: "case"
    }
  ],
  tvc: [
    {
      title: "SCULPTURAL\nFORMS",
      index: "01",
      media: "/videos/tvc/video1.mp4",
      type: "video",
      layout: "left",
      size: "large",
      titlePos: "tl"
    },
    {
      title: "KINETIC\nBEAUTY",
      index: "02",
      media: "/videos/tvc/video2-1.mp4",
      type: "video",
      layout: "right",
      size: "portrait",
      titlePos: "br"
    },
    {
      title: "ETHEREAL\nLIGHT",
      index: "03",
      media: "/videos/tvc/video3.mp4",
      type: "video",
      layout: "center",
      size: "landscape",
      titlePos: "center"
    },
    {
      title: "FLUID\nMOTION",
      index: "04",
      media: "/videos/tvc/video4.mp4",
      type: "video",
      layout: "left",
      size: "portrait",
      titlePos: "tl"
    },
    {
      title: "DIGITAL\nFABRIC",
      index: "05",
      media: "/videos/tvc/video5.mp4",
      type: "video",
      layout: "right",
      size: "large",
      titlePos: "br"
    },
    {
      title: "CHROME\nECHOES",
      index: "06",
      media: "/videos/tvc/video6.mp4",
      type: "video",
      layout: "center",
      size: "landscape",
      titlePos: "center"
    },
    {
      title: "NEURAL\nTEXTURE",
      index: "07",
      media: "/videos/tvc/video7.mp4",
      type: "video",
      layout: "left",
      size: "large",
      titlePos: "tl"
    },
    {
      title: "ANALOG\nDREAM",
      index: "08",
      media: "/videos/tvc/video8.mp4",
      type: "video",
      layout: "right",
      size: "portrait",
      titlePos: "br"
    },
    {
      title: "INFINITE\nVISION",
      index: "09",
      media: "/videos/tvc/video9.mp4",
      type: "video",
      layout: "center",
      size: "large",
      titlePos: "center"
    },
    {
      title: "PRISM\nVOID",
      index: "10",
      media: "/videos/tvc/video10.mp4",
      type: "video",
      layout: "left",
      size: "landscape",
      titlePos: "left-float"
    }
  ],
  bq: [
    {
      title: "SERENE\nWASH",
      index: "01",
      media: "/videos/bq/bq1.mp4",
      type: "video",
      layout: "left",
      size: "landscape",
      titlePos: "tl"
    },
    {
      title: "PURE\nCANVAS",
      index: "02",
      media: "/videos/bq/bq2.mp4",
      type: "video",
      layout: "right",
      size: "portrait",
      titlePos: "br"
    },
    {
      title: "SOFT\nBLEND",
      index: "03",
      media: "/videos/bq/bq3.mp4",
      type: "video",
      layout: "center",
      size: "landscape",
      titlePos: "center"
    }
  ],
  storyboard: [
    // Sub-category: 分镜视频 (Storyboard Videos)
    {
      title: "FRAME\nONE",
      index: "01",
      media: "/videos/storyboard/frame-01.mp4",
      type: "video",
      layout: "left",
      size: "landscape",
      titlePos: "tl",
      label: "分镜视频",
      sub: "videos"
    },
    {
      title: "FRAME\nTWO",
      index: "02",
      media: "/videos/storyboard/frame-02.mp4",
      type: "video",
      layout: "right",
      size: "landscape",
      titlePos: "br",
      label: "分镜视频",
      sub: "videos"
    },
    {
      title: "FRAME\nTHREE",
      index: "03",
      media: "/videos/storyboard/frame-03.mp4",
      type: "video",
      layout: "center",
      size: "landscape",
      titlePos: "center",
      label: "分镜视频",
      sub: "videos"
    },
    {
      title: "FRAME\nTHREE V2",
      index: "03b",
      media: "/videos/storyboard/frame-03v2.mp4",
      type: "video",
      layout: "left",
      size: "landscape",
      titlePos: "tl",
      label: "分镜视频",
      sub: "videos"
    },
    {
      title: "FRAME\nFOUR",
      index: "04",
      media: "/videos/storyboard/frame-04.mp4",
      type: "video",
      layout: "right",
      size: "landscape",
      titlePos: "br",
      label: "分镜视频",
      sub: "videos"
    },
    {
      title: "FRAME\nFIVE",
      index: "05",
      media: "/videos/storyboard/frame-05.mp4",
      type: "video",
      layout: "center",
      size: "landscape",
      titlePos: "center",
      label: "分镜视频",
      sub: "videos"
    },
    {
      title: "FRAME\nSIX",
      index: "06",
      media: "/videos/storyboard/frame-06.mp4",
      type: "video",
      layout: "left",
      size: "landscape",
      titlePos: "tl",
      label: "分镜视频",
      sub: "videos"
    },
    {
      title: "FRAME\nSEVEN",
      index: "07",
      media: "/videos/storyboard/frame-07.mp4",
      type: "video",
      layout: "right",
      size: "landscape",
      titlePos: "br",
      label: "分镜视频",
      sub: "videos"
    },
    {
      title: "FRAME\nEIGHT",
      index: "08",
      media: "/videos/storyboard/frame-08.mp4",
      type: "video",
      layout: "center",
      size: "landscape",
      titlePos: "center",
      label: "分镜视频",
      sub: "videos"
    },
    {
      title: "FRAME\nNINE",
      index: "09",
      media: "/videos/storyboard/frame-09.mp4",
      type: "video",
      layout: "left",
      size: "landscape",
      titlePos: "tl",
      label: "分镜视频",
      sub: "videos"
    },
    {
      title: "FRAME\nNINE V2",
      index: "09b",
      media: "/videos/storyboard/frame-09v2.mp4",
      type: "video",
      layout: "right",
      size: "landscape",
      titlePos: "br",
      label: "分镜视频",
      sub: "videos"
    },
    // Sub-category: 素材图片 (Source Materials)
    {
      title: "PRODUCT\nCOMPOSITE",
      index: "S1",
      media: "/images/storyboard/extract-01.png",
      type: "image",
      layout: "left",
      size: "landscape",
      titlePos: "tl",
      label: "素材提取",
      sub: "assets"
    },
    {
      title: "COSMETIC\nEXTRACT",
      index: "S2",
      media: "/images/storyboard/extract-02.png",
      type: "image",
      layout: "right",
      size: "landscape",
      titlePos: "br",
      label: "素材提取",
      sub: "assets"
    },
    {
      title: "STORYBOARD\nFRAME 01",
      index: "S3",
      media: "/images/storyboard/frame-01.png",
      type: "image",
      layout: "center",
      size: "landscape",
      titlePos: "center",
      label: "分镜稿",
      sub: "assets"
    },
    {
      title: "FACE\nCLOSEUP",
      index: "S4",
      media: "/images/storyboard/closeup-face.png",
      type: "image",
      layout: "left",
      size: "portrait",
      titlePos: "tl",
      label: "特写素材",
      sub: "assets"
    },
    {
      title: "ARM\nTEXTURE",
      index: "S5",
      media: "/images/storyboard/closeup-arm.jpeg",
      type: "image",
      layout: "right",
      size: "portrait",
      titlePos: "br",
      label: "特写素材",
      sub: "assets"
    },
    {
      title: "HAND\nAPPLICATION",
      index: "S6",
      media: "/images/storyboard/closeup-hand-apply.png",
      type: "image",
      layout: "left",
      size: "portrait",
      titlePos: "tl",
      label: "特写素材",
      sub: "assets"
    },
    {
      title: "NECK\nDETAIL",
      index: "S7",
      media: "/images/storyboard/closeup-neck.png",
      type: "image",
      layout: "right",
      size: "portrait",
      titlePos: "br",
      label: "特写素材",
      sub: "assets"
    },
    {
      title: "STORYBOARD\nFRAME 03",
      index: "S8",
      media: "/images/storyboard/frame-03.png",
      type: "image",
      layout: "center",
      size: "landscape",
      titlePos: "center",
      label: "分镜稿",
      sub: "assets"
    },
    {
      title: "STORYBOARD\nFRAME 04",
      index: "S9",
      media: "/images/storyboard/frame-04.png",
      type: "image",
      layout: "left",
      size: "landscape",
      titlePos: "tl",
      label: "分镜稿",
      sub: "assets"
    },
    {
      title: "STORYBOARD\nFRAME 09",
      index: "S10",
      media: "/images/storyboard/frame-09.png",
      type: "image",
      layout: "right",
      size: "landscape",
      titlePos: "br",
      label: "分镜稿",
      sub: "assets"
    },
  ],
  imitation: [
    {
      title: "CASE 1\nORIGINAL",
      index: "01",
      media: "/videos/imitation/case1-original.mp4",
      type: "video",
      layout: "center",
      size: "landscape",
      titlePos: "center",
      label: "原视频",
      sub: "case1"
    },
    {
      title: "AI VERSION\nA",
      index: "02",
      media: "/videos/imitation/case1-ai1.mp4",
      type: "video",
      layout: "left",
      size: "landscape",
      titlePos: "tl",
      label: "AI模仿",
      sub: "case1"
    },
    {
      title: "AI VERSION\nB",
      index: "03",
      media: "/videos/imitation/case1-ai2.mp4",
      type: "video",
      layout: "right",
      size: "landscape",
      titlePos: "br",
      label: "AI模仿",
      sub: "case1"
    },
    {
      title: "AI VERSION\nC",
      index: "04",
      media: "/videos/imitation/case1-ai3.mp4",
      type: "video",
      layout: "left",
      size: "landscape",
      titlePos: "tl",
      label: "AI模仿",
      sub: "case1"
    },
    {
      title: "AI VERSION\nD",
      index: "05",
      media: "/videos/imitation/case1-ai4.mp4",
      type: "video",
      layout: "right",
      size: "landscape",
      titlePos: "br",
      label: "AI模仿",
      sub: "case1"
    },
    // Case 2: 图生图 + 图生视频
    {
      title: "CASE 2\nORIGINAL",
      index: "01",
      media: "/images/imitation/case2-original.png",
      type: "image",
      layout: "center",
      size: "landscape",
      titlePos: "center",
      label: "原图",
      sub: "case2"
    },
    {
      title: "CASE 2\nAI IMAGE",
      index: "02",
      media: "/images/imitation/case2-ai.png",
      type: "image",
      layout: "center",
      size: "landscape",
      titlePos: "center",
      label: "AI图生图",
      sub: "case2"
    },
    {
      title: "CASE 2\nAI VIDEO",
      index: "03",
      media: "/videos/imitation/case2-video.mp4",
      type: "video",
      layout: "center",
      size: "landscape",
      titlePos: "center",
      label: "AI图生视频",
      sub: "case2"
    },
  ],
  salmon: [
    {
      title: "PREMIUM\nTEXTURE",
      index: "01",
      media: "/videos/salmon/salmon1.mp4",
      type: "video",
      layout: "left",
      size: "large",
      titlePos: "tl"
    },
    {
      title: "GELID\nELEGANCE",
      index: "02",
      media: "/videos/salmon/salmon2.mp4",
      type: "video",
      layout: "right",
      size: "portrait",
      titlePos: "br"
    },
    {
      title: "OCEANIC\nRHYTHM",
      index: "03",
      media: "/videos/salmon/salmon3.mp4",
      type: "video",
      layout: "center",
      size: "landscape",
      titlePos: "center"
    },
    {
      title: "CRIMSON\nSLICE",
      index: "04",
      media: "/videos/salmon/salmon4.mp4",
      type: "video",
      layout: "left",
      size: "large",
      titlePos: "tl"
    }
  ],
  fission: [
    {
      title: "REAL\nSTOREFRONT",
      index: "01",
      media: "/images/fission/original.jpg",
      type: "image",
      layout: "center",
      size: "landscape",
      titlePos: "center",
      label: "实拍门头",
      sub: "pipeline"
    },
    {
      title: "AI\nSTOREFRONT",
      index: "02",
      media: "/videos/fission/ai-video.mp4",
      type: "video",
      layout: "center",
      size: "landscape",
      titlePos: "center",
      label: "AI图生视频",
      sub: "pipeline"
    },
  ]
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('tvc');
  const [viewMode, setViewMode] = useState<'home' | 'gallery'>('home');
  const [selectedMedia, setSelectedMedia] = useState<{ media: string; title: string; type: string } | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<string>('assets');
  const showcaseRef = useRef<HTMLElement>(null);

  const allWorks = WORK_DATA[activeCategory as keyof typeof WORK_DATA] || [];
  const hasSubCategories = allWorks.some((w: any) => w.sub);
  const filteredWorks = hasSubCategories
    ? allWorks.filter((w: any) => w.sub === activeSubTab)
    : allWorks;

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    setActiveSubTab(id === 'imitation' ? 'case1' : id === 'fission' ? 'pipeline' : id === 'agent' ? 'inventory' : 'assets');
    setViewMode('gallery');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setViewMode('home');
    setActiveSubTab('assets');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-accent selection:text-white">
      <CustomCursor />
      <Preloader onComplete={() => setLoading(false)} />
      
      {!loading && (
        <main id="smooth-wrapper">
          <div className="noise-overlay" />
          
          <AnimatePresence mode="wait">
            {viewMode === 'home' ? (
              <motion.div
                key="home-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              >
                <Hero />
                
                <div className="py-20">
                  <div className="px-[5vw] mb-12">
                    <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter">Collections</h2>
                    <p className="font-sans text-txt/40 uppercase tracking-widest text-xs mt-4">Select a category to enter the gallery</p>
                  </div>
                  <CategoryNav 
                    activeCategory={activeCategory} 
                    onSelect={handleCategorySelect} 
                  />
                </div>

                <Manifesto />
                
                <footer className="py-[20vh] px-[5vw] flex flex-col items-center text-center">
                  <h2 className="font-display text-[clamp(2rem,5vw,4rem)] mb-10 font-normal uppercase">
                    Ready to redefine reality?
                  </h2>
                  <MagneticButton>
                    Start Project
                  </MagneticButton>
                  <div className="mt-[15vh] w-full flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[2px] uppercase text-white/40 font-medium">
                    <span>© 2026 FAVERLAR. ALL RIGHTS RESERVED.</span>
                    <span>TOKYO — PARIS — VIRTUAL</span>
                  </div>
                </footer>
              </motion.div>
            ) : (
              <motion.div
                key="gallery-view"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="pt-32"
              >
                {/* Gallery Header */}
                <div className="fixed top-0 left-0 w-full z-[100] px-[5vw] py-8 flex justify-between items-end mix-blend-difference">
                  <div>
                    <span className="font-sans text-[10px] tracking-[4px] uppercase text-accent mb-2 block">Viewing Category</span>
                    <h2 className="font-display text-5xl md:text-7xl uppercase">{activeCategory}</h2>
                  </div>
                  <button 
                    onClick={handleBackToHome}
                    className="group flex items-center gap-4 interactive"
                  >
                    <span className="font-sans text-[10px] tracking-[4px] uppercase group-hover:text-accent transition-colors">Back to Home</span>
                    <div className="w-12 h-px bg-white group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
                  </button>
                </div>

                <section className="px-[5vw] pt-[15vh] pb-[20vh]">
                  {hasSubCategories && activeCategory === 'storyboard' && (
                    <SubTabs
                      tabs={[
                        { key: 'assets', label: '素材图片' },
                        { key: 'videos', label: '分镜视频' },
                      ]}
                      activeTab={activeSubTab}
                      onTabChange={setActiveSubTab}
                    />
                  )}
                  {hasSubCategories && (activeCategory === 'imitation' || activeCategory === 'fission') && (
                    <SubTabs
                      tabs={activeCategory === 'imitation' ? [
                        { key: 'case1', label: '案例一' },
                        { key: 'case2', label: '案例二' },
                      ] : [
                        { key: 'pipeline', label: '图生视频' },
                      ]}
                      activeTab={activeSubTab}
                      onTabChange={setActiveSubTab}
                    />
                  )}
                  {filteredWorks.length > 0 ? (
                    activeCategory === 'agent' ? (
                      /* Agent Case: Special layout for case study */
                      <div className="max-w-5xl mx-auto">
                        {filteredWorks.map((work: any, i: number) => (
                          <div key={`agent-${i}`} className="space-y-12">
                            {/* Hero Section */}
                            <div className="text-center space-y-6">
                              <span className="inline-block px-4 py-1.5 text-[10px] tracking-[3px] uppercase bg-accent/20 text-accent border border-accent/30">
                                {work.subtitle}
                              </span>
                              <h3 className="text-4xl md:text-6xl font-display uppercase tracking-widest">{work.title}</h3>
                              <p className="text-lg text-white/60 max-w-2xl mx-auto">{work.description}</p>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {work.metrics.map((m: any, idx: number) => (
                                <div key={idx} className="p-6 border border-white/10 bg-white/5 text-center group hover:border-accent/40 transition-colors">
                                  <div className="text-3xl md:text-4xl font-display text-accent">{m.value}</div>
                                  <div className="text-xs uppercase tracking-widest text-white/40 mt-2">{m.label}</div>
                                  <div className="text-[10px] text-white/30 mt-1">{m.unit}</div>
                                </div>
                              ))}
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {work.features.map((f: any, idx: number) => (
                                <div key={idx} className="p-6 border border-white/10 hover:border-accent/30 transition-colors">
                                  <div className="text-3xl mb-4">{f.icon}</div>
                                  <h4 className="text-lg font-display uppercase tracking-widest mb-2">{f.title}</h4>
                                  <p className="text-sm text-white/50">{f.desc}</p>
                                </div>
                              ))}
                            </div>

                            {/* CTA */}
                            <div className="text-center pt-8">
                              <a
                                href={work.caseUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 border border-accent/50 hover:bg-accent/10 transition-all group"
                              >
                                <span className="text-sm uppercase tracking-widest">查看完整案例文档</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (activeCategory === 'imitation' || activeCategory === 'fission') ? (
                      <div>
                        {activeSubTab === 'case1' ? (
                          /* Case 1: original video hero + AI versions grid */
                          <>
                            {filteredWorks.filter((w: any) => w.label === '原视频').map((work: any, i: number) => (
                              <div 
                                key={`hero-${i}`}
                                className="space-y-6 cursor-pointer group mb-16"
                                onClick={() => setSelectedMedia({ media: work.media, title: work.title, type: work.type })}
                              >
                                <div className="relative overflow-hidden aspect-video bg-white/5 border border-accent/30 group-hover:border-accent/60 transition-colors duration-500 max-w-4xl mx-auto">
                                  {work.type === 'video' ? (
                                    <LazyVideo src={work.media} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" delay={0} />
                                  ) : (
                                    <img src={work.media} alt={work.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                                  )}
                                  {work.type === 'video' && (
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                       <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                                          <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white ml-1" />
                                       </div>
                                    </div>
                                  )}
                                  {work.label && (
                                    <span className="absolute top-4 left-4 px-4 py-1.5 text-[10px] tracking-[3px] uppercase bg-accent/20 backdrop-blur-md text-accent border border-accent/30">{work.label}</span>
                                  )}
                                </div>
                                <div className="flex justify-between items-start pt-2 max-w-4xl mx-auto">
                                  <div>
                                    <h3 className="text-2xl font-display uppercase tracking-widest leading-none group-hover:text-accent transition-colors">{work.title.replace('\n', ' ')}</h3>
                                    <p className="text-[10px] text-white/20 mt-3 uppercase tracking-[4px] font-medium">{activeCategory}</p>
                                  </div>
                                  <span className="font-sans text-[10px] opacity-20 tracking-widest leading-none pt-1">/{work.index}</span>
                                </div>
                              </div>
                            ))}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                              {filteredWorks.filter((w: any) => w.label !== '原视频').map((work: any, i: number) => (
                                <div 
                                  key={`ai-${i}`}
                                  className="space-y-4 cursor-pointer group"
                                  onClick={() => setSelectedMedia({ media: work.media, title: work.title, type: work.type })}
                                >
                                  <div className="relative overflow-hidden aspect-video bg-white/5 border border-white/10 group-hover:border-accent/40 transition-colors duration-500">
                                    {work.type === 'video' ? (
                                      <LazyVideo src={work.media} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" delay={i * 300} />
                                    ) : (
                                      <img src={work.media} alt={work.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                                    )}
                                    {work.type === 'video' && (
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                                            <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-white ml-0.5" />
                                         </div>
                                      </div>
                                    )}
                                    {work.label && (
                                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[8px] tracking-[2px] uppercase bg-black/60 backdrop-blur-md text-white/70 border border-white/10">{work.label}</span>
                                    )}
                                  </div>
                                  <div className="flex justify-between items-start pt-1">
                                    <h3 className="text-sm font-display uppercase tracking-widest leading-none group-hover:text-accent transition-colors">{work.title.replace('\n', ' ')}</h3>
                                    <span className="font-sans text-[9px] opacity-20 tracking-widest leading-none pt-0.5">/{work.index}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          /* Case 2: workflow pipeline - original → AI image → AI video */
                          <div className="max-w-3xl mx-auto space-y-4">
                            {filteredWorks.map((work: any, i: number) => (
                              <div key={`case2-${i}`}>
                                <div 
                                  className="space-y-4 cursor-pointer group"
                                  onClick={() => setSelectedMedia({ media: work.media, title: work.title, type: work.type })}
                                >
                                  <div className="relative overflow-hidden aspect-video bg-white/5 border border-white/10 group-hover:border-accent/40 transition-colors duration-500">
                                    {work.type === 'video' ? (
                                      <LazyVideo src={work.media} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" delay={i * 500} />
                                    ) : (
                                      <img src={work.media} alt={work.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                                    )}
                                    {work.type === 'video' && (
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                                            <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-white ml-1" />
                                         </div>
                                      </div>
                                    )}
                                    {work.label && (
                                      <span className="absolute top-3 left-3 px-3 py-1 text-[9px] tracking-[3px] uppercase bg-black/60 backdrop-blur-md text-white/70 border border-white/10">{work.label}</span>
                                    )}
                                  </div>
                                  <div className="flex justify-between items-start pt-1">
                                    <div>
                                      <h3 className="text-lg font-display uppercase tracking-widest leading-none group-hover:text-accent transition-colors">{work.title.replace('\n', ' ')}</h3>
                                    </div>
                                    <span className="font-sans text-[10px] opacity-20 tracking-widest leading-none pt-1">/{work.index}</span>
                                  </div>
                                </div>
                                {i < filteredWorks.length - 1 && (
                                  <div className="flex justify-center py-2">
                                    <div className="flex flex-col items-center gap-1">
                                      <div className="w-px h-6 bg-gradient-to-b from-accent/40 to-accent/10" />
                                      <span className="text-[9px] tracking-[3px] uppercase text-accent/40">
                                        {i === 0 ? '图生图' : '图生视频'}
                                      </span>
                                      <svg className="w-4 h-4 text-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                      </svg>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
                        {filteredWorks.map((work: any, i: number) => (
                          <div 
                            key={`${activeCategory}-${i}`} 
                            className="space-y-6 cursor-pointer group"
                            onClick={() => setSelectedMedia({ media: work.media, title: work.title, type: work.type })}
                          >
                            <div className="relative overflow-hidden aspect-video bg-white/5 border border-white/10 group-hover:border-accent/40 transition-colors duration-500">
                              {work.type === 'video' ? (
                                <LazyVideo src={work.media} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" delay={i * 500} />
                              ) : (
                                <img src={work.media} alt={work.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                              )}
                              {work.type === 'video' && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                   <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                                      <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-white ml-1" />
                                   </div>
                                </div>
                              )}
                              {work.label && (
                                <span className="absolute top-3 left-3 px-3 py-1 text-[9px] tracking-[3px] uppercase bg-black/60 backdrop-blur-md text-white/70 border border-white/10">{work.label}</span>
                              )}
                            </div>
                            <div className="flex justify-between items-start pt-2">
                              <div>
                                <h3 className="text-lg font-display uppercase tracking-widest leading-none group-hover:text-accent transition-colors">{work.title.replace('\n', ' ')}</h3>
                                <p className="text-[10px] text-white/20 mt-3 uppercase tracking-[4px] font-medium">{activeCategory}</p>
                              </div>
                              <span className="font-sans text-[10px] opacity-20 tracking-widest leading-none pt-1">/{work.index}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    <div className="h-[60vh] flex items-center justify-center">
                      <span className="font-display text-2xl opacity-20 uppercase tracking-widest">Works Coming Soon</span>
                    </div>
                  )}
                </section>

                {selectedMedia?.type === 'video' ? (
                  <VideoModal 
                    isOpen={!!selectedMedia}
                    onClose={() => setSelectedMedia(null)}
                    media={selectedMedia?.media || ''}
                    title={selectedMedia?.title || ''}
                  />
                ) : (
                  <AnimatePresence>
                    {selectedMedia && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center cursor-zoom-out p-8"
                        onClick={() => setSelectedMedia(null)}
                      >
                        <img
                          src={selectedMedia.media}
                          alt={selectedMedia.title}
                          className="max-w-full max-h-full object-contain"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                <footer className="py-20 px-[5vw] border-t border-white/5 bg-bg/50 backdrop-blur-xl">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                     <div className="text-left">
                        <h3 className="font-display text-2xl uppercase mb-2">End of {activeCategory}</h3>
                        <p className="font-sans text-txt/30 text-xs tracking-widest">Explore another series or get in touch</p>
                     </div>
                     <button 
                      onClick={handleBackToHome}
                      className="px-10 py-4 border border-txt/20 hover:border-txt transition-colors font-sans text-xs uppercase tracking-widest interactive"
                     >
                       Explore Other Categories
                     </button>
                  </div>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}
    </div>
  );
}
