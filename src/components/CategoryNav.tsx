import { motion } from 'motion/react';

interface Category {
  id: string;
  name: string;
  label: string;
}

const CATEGORIES: Category[] = [
  { id: 'agent', name: 'AI Agent赋能', label: 'Agent Cases' },
  { id: 'tvc', name: 'TVC', label: 'Commercial Works' },
  { id: 'bq', name: 'AI千川背景替换', label: 'BG Replacement' },
  { id: 'storyboard', name: '店播分镜素材', label: 'Storyboard Assets' },
  { id: 'imitation', name: '千川素材模仿', label: 'Imitation' },
  { id: 'salmon', name: '鲑鱼气垫原创', label: 'Original Content' },
  { id: 'fission', name: '品牌门头裂变', label: 'Storefront Fission' },
];

export default function CategoryNav({ onSelect, activeCategory }: { onSelect: (id: string) => void, activeCategory: string }) {
  return (
    <section className="py-20 px-[5vw] border-b border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            whileHover={{ y: -5 }}
            className={`flex flex-col text-left p-6 border transition-all duration-500 interactive ${
              activeCategory === cat.id 
                ? 'bg-txt text-bg border-txt' 
                : 'bg-transparent text-txt/40 border-white/10 hover:border-accent hover:text-txt'
            }`}
          >
            <span className="text-[10px] tracking-widest uppercase mb-1">{cat.label}</span>
            <span className="font-display text-lg leading-tight uppercase">{cat.name}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
