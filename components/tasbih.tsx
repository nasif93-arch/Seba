"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { RotateCcw, Plus, Fingerprint } from "lucide-react";

export function Tasbih() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const controls = useAnimation();

  useEffect(() => {
    const saved = localStorage.getItem("tasbih_count");
    if (saved) setCount(parseInt(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasbih_count", count.toString());
  }, [count]);

  const increment = async () => {
    setCount(prev => prev + 1);
    await controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.1 }
    });
    
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const reset = () => {
    if (confirm("Reset counter?")) {
      setCount(0);
    }
  };

  const progress = (count % target) / target * 100;

  return (
    <section id="tasbih" className="py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-card rounded-[3rem] p-8 shadow-2xl border border-secondary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Fingerprint size={120} />
          </div>
          
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary dark:text-secondary">Digital Tasbih</h2>
            <p className="text-muted-foreground text-sm mt-2">Keep track of your Dhikr</p>
          </div>

          <div className="relative flex flex-col items-center">
            {/* Progress Circle */}
            <svg className="w-64 h-64 -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted/20"
              />
              <motion.circle
                cx="128"
                cy="128"
                r="110"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={691}
                strokeDashoffset={691 - (691 * progress) / 100}
                className="text-secondary"
                transition={{ type: "spring", stiffness: 50 }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div 
                animate={controls}
                className="text-7xl font-serif font-bold text-primary dark:text-white"
              >
                {count}
              </motion.div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2">
                Total Count
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between gap-4">
            <button 
              onClick={reset}
              className="p-4 rounded-2xl bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
            >
              <RotateCcw size={24} />
            </button>
            
            <button 
              onClick={increment}
              className="flex-1 h-20 rounded-3xl gold-gradient text-white shadow-xl shadow-secondary/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <Plus size={32} strokeWidth={3} />
              <span className="text-xl font-bold">Tap to Count</span>
            </button>
          </div>
          
          <div className="mt-8 flex justify-center gap-2">
            {[33, 99, 100, 1000].map(t => (
              <button
                key={t}
                onClick={() => setTarget(t)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  target === t ? "bg-primary text-secondary" : "bg-muted text-muted-foreground"
                }`}
              >
                Target: {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
