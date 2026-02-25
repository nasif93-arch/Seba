"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Heart, Info, ChevronRight, ExternalLink } from "lucide-react";

export function ExtraFeatures() {
  const [zakatAmount, setZakatAmount] = useState<number>(0);
  const [wealth, setWealth] = useState<string>("");

  const calculateZakat = (val: string) => {
    setWealth(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setZakatAmount(num * 0.025);
    } else {
      setZakatAmount(0);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Zakat Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-[3rem] p-10 border border-secondary/10 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary shadow-lg">
                <Calculator size={24} />
              </div>
              <h2 className="font-serif text-3xl font-bold">Zakat Calculator</h2>
            </div>
            
            <p className="text-muted-foreground mb-8 text-sm">
              Calculate your Zakat easily. Zakat is 2.5% of your total qualifying wealth that has been in your possession for a lunar year.
            </p>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Total Wealth (Cash, Gold, Investments)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary">$</span>
                  <input 
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-4 rounded-2xl bg-accent/50 border-none outline-none focus:ring-2 focus:ring-secondary transition-all text-xl font-bold"
                    value={wealth}
                    onChange={(e) => calculateZakat(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-primary text-white relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-2">Estimated Zakat Amount</p>
                  <h3 className="text-4xl font-serif font-bold text-secondary">${zakatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-10">
                  <Calculator size={150} />
                </div>
              </div>
              
              <button className="w-full py-4 rounded-2xl bg-secondary text-primary font-bold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <Heart size={20} fill="currentColor" />
                Pay Zakat via Charity
              </button>
            </div>
          </motion.div>

          {/* Blog / Tips Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-3xl font-bold">Ramadan Insights</h2>
              <button className="text-sm font-bold text-primary dark:text-secondary flex items-center gap-1 hover:underline">
                View All Articles <ChevronRight size={16} />
              </button>
            </div>

            <BlogCard 
              title="Health Guide: Staying Hydrated"
              excerpt="Tips and tricks to maintain your hydration levels during the long fasting hours of Ramadan."
              category="Health"
              date="Feb 20, 2026"
            />
            
            <BlogCard 
              title="Spiritual Preparation for Ramadan"
              excerpt="How to prepare your heart and mind for the most blessed month of the year."
              category="Spirituality"
              date="Feb 15, 2026"
            />
            
            <BlogCard 
              title="Quick & Healthy Iftar Recipes"
              excerpt="Nutritious meal ideas that are easy to prepare and perfect for breaking your fast."
              category="Food"
              date="Feb 10, 2026"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ title, excerpt, category, date }: { title: string; excerpt: string; category: string; date: string }) {
  return (
    <div className="group bg-card p-6 rounded-[2rem] border border-secondary/5 shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">
          {category}
        </span>
        <span className="text-[10px] text-muted-foreground font-medium">{date}</span>
      </div>
      <h3 className="text-xl font-bold group-hover:text-primary dark:group-hover:text-secondary transition-colors mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{excerpt}</p>
      <div className="flex items-center gap-1 text-xs font-bold text-primary dark:text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
        Read More <ExternalLink size={12} />
      </div>
    </div>
  );
}
