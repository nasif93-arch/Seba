"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Quote, RefreshCw, Share2 } from "lucide-react";

interface Ayah {
  text: string;
  number: number;
  surah: {
    name: string;
    englishName: string;
    number: number;
  };
}

export function QuranSection() {
  const [ayah, setAyah] = useState<Ayah | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAyah = async () => {
    try {
      setLoading(true);
      // Fetch a random Ayah
      const randomAyah = Math.floor(Math.random() * 6236) + 1;
      const res = await fetch(`https://api.alquran.cloud/v1/ayah/${randomAyah}/en.asad`);
      const data = await res.json();
      setAyah(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAyah();
  }, []);

  return (
    <section id="quran" className="py-24 bg-primary text-white islamic-pattern overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary shadow-lg">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold">Daily Ayah</h2>
                <p className="text-emerald-200 text-sm">Spiritual guidance for your day</p>
              </div>
            </div>
            
            <button 
              onClick={fetchAyah}
              disabled={loading}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <motion.div
            key={ayah?.number}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white/5 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 border border-white/10 shadow-2xl"
          >
            <Quote className="absolute top-10 left-10 text-secondary/20 h-20 w-20" />
            
            <div className="relative z-10 text-center">
              {loading ? (
                <div className="h-40 flex items-center justify-center">
                  <div className="animate-pulse text-emerald-200">Loading wisdom...</div>
                </div>
              ) : (
                <>
                  <p className="font-serif text-2xl md:text-3xl leading-relaxed mb-10 italic">
                    "{ayah?.text}"
                  </p>
                  
                  <div className="flex flex-col items-center">
                    <div className="h-px w-20 bg-secondary/30 mb-6"></div>
                    <h4 className="text-xl font-bold text-secondary">{ayah?.surah.englishName}</h4>
                    <p className="text-emerald-300 text-sm uppercase tracking-[0.2em] mt-1">
                      Surah {ayah?.surah.number} : Ayah {ayah?.number}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="absolute bottom-10 right-10">
              <button className="flex items-center gap-2 text-xs font-bold text-emerald-300 hover:text-white transition-colors">
                <Share2 size={14} />
                Share Ayah
              </button>
            </div>
          </motion.div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white">
                <Quote size={18} />
              </div>
              <div>
                <h5 className="font-bold text-sm">Daily Hadith</h5>
                <p className="text-xs text-emerald-200 mt-1">"The best among you are those who learn the Quran and teach it."</p>
              </div>
            </div>
            
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                <BookOpen size={18} />
              </div>
              <div>
                <h5 className="font-bold text-sm">Reading Progress</h5>
                <p className="text-xs text-emerald-200 mt-1">You have read 5 Juz this Ramadan. Keep it up!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
