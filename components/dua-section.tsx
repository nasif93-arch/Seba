"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Copy, Check, Share2, Bookmark } from "lucide-react";

interface Dua {
  id: string;
  category: string;
  arabic: string;
  transliteration: string;
  english: string;
  bengali: string;
  reference: string;
}

const DUAS: Dua[] = [
  {
    id: "1",
    category: "Iftar",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration: "Dhahaba az-zama'u wabtallati al-'uruqu wa thabata al-ajru in sha' Allah",
    english: "The thirst is gone, the veins are moistened and the reward is confirmed, if Allah wills.",
    bengali: "পিপাসা মিটেছে, শিরাগুলো সিক্ত হয়েছে এবং ইনশাআল্লাহ সওয়াব নির্ধারিত হয়েছে।",
    reference: "Abu Dawud 2357"
  },
  {
    id: "2",
    category: "Sehri",
    arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
    transliteration: "Wa bisawmi ghadinn nawaitu min shahri ramadan",
    english: "I intend to keep the fast for tomorrow in the month of Ramadan.",
    bengali: "আমি রমজান মাসের আগামীকালের রোজা রাখার নিয়ত করছি।",
    reference: "Traditional"
  },
  {
    id: "3",
    category: "Forgiveness",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni",
    english: "O Allah, You are Forgiving and You love forgiveness, so forgive me.",
    bengali: "হে আল্লাহ! নিশ্চয়ই আপনি ক্ষমাশীল, আপনি ক্ষমা করতে ভালোবাসেন। অতএব আমাকে ক্ষমা করুন।",
    reference: "Tirmidhi 3513"
  }
];

export function DuaSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredDuas = DUAS.filter(dua => 
    dua.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dua.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="duas" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-primary dark:text-secondary">Essential Duas</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A collection of authentic supplications for Ramadan and daily life with translations.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text"
              placeholder="Search by category or meaning..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-accent/50 border-none outline-none focus:ring-2 focus:ring-secondary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredDuas.map((dua, index) => (
            <motion.div
              key={dua.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-[2rem] p-8 border border-secondary/5 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-secondary text-[10px] font-bold uppercase tracking-widest">
                  {dua.category}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full hover:bg-accent text-muted-foreground transition-colors">
                    <Bookmark size={16} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-accent text-muted-foreground transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              <div className="text-right mb-6">
                <p className="font-serif text-2xl leading-loose text-primary dark:text-white dir-rtl">
                  {dua.arabic}
                </p>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Transliteration</p>
                  <p className="text-sm italic text-muted-foreground">{dua.transliteration}</p>
                </div>
                
                <div>
                  <p className="text-xs font-bold text-primary dark:text-emerald-400 uppercase tracking-wider mb-1">English</p>
                  <p className="text-sm leading-relaxed">{dua.english}</p>
                </div>

                <div>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Bengali</p>
                  <p className="text-sm leading-relaxed font-medium">{dua.bengali}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-muted flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-medium">Ref: {dua.reference}</span>
                <button 
                  onClick={() => copyToClipboard(`${dua.arabic}\n\n${dua.english}`, dua.id)}
                  className="flex items-center gap-2 text-xs font-bold text-primary dark:text-secondary hover:underline"
                >
                  {copiedId === dua.id ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === dua.id ? "Copied" : "Copy Dua"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
