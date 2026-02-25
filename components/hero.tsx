"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Sunrise, Sunset } from "lucide-react";
import { format, differenceInSeconds, addDays, isAfter } from "date-fns";

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Mock Ramadan date for 2026 (approx March 1)
  const ramadanDate = new Date("2026-03-01T00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const diff = differenceInSeconds(ramadanDate, now);
      
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (60 * 60 * 24)),
          hours: Math.floor((diff / (60 * 60)) % 24),
          minutes: Math.floor((diff / 60) % 60),
          seconds: Math.floor(diff % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-white islamic-pattern">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl font-bold leading-tight md:text-7xl">
              Ramadan <span className="text-secondary tracking-widest">Kareem</span>
            </h1>
            <p className="mt-6 text-lg text-emerald-100/80 max-w-lg">
              May this holy month bring peace, prosperity, and spiritual growth to you and your family. 
              Stay connected with your faith with our comprehensive Ramadan companion.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20">
                <div className="rounded-full bg-secondary p-2 text-secondary-foreground">
                  <Sunrise size={24} />
                </div>
                <div>
                  <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Sehri Ends</p>
                  <p className="text-xl font-bold">05:12 AM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20">
                <div className="rounded-full bg-accent p-2 text-white">
                  <Sunset size={24} />
                </div>
                <div>
                  <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Iftar Starts</p>
                  <p className="text-xl font-bold">06:24 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-emerald-200">
              <MapPin size={16} />
              <span className="text-sm font-medium">Dhaka, Bangladesh (Auto-detected)</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative">
              {/* Mosque SVG Background */}
              <div className="absolute -inset-10 opacity-20 blur-3xl bg-secondary rounded-full animate-pulse"></div>
              
              <div className="relative rounded-[3rem] border-4 border-secondary/30 bg-white/5 p-8 backdrop-blur-xl text-center shadow-2xl">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-6">Countdown to Ramadan</h2>
                
                <div className="grid grid-cols-4 gap-4 md:gap-8">
                  <CountdownItem value={timeLeft.days} label="Days" />
                  <CountdownItem value={timeLeft.hours} label="Hours" />
                  <CountdownItem value={timeLeft.minutes} label="Mins" />
                  <CountdownItem value={timeLeft.seconds} label="Secs" />
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-sm italic text-emerald-200">
                    "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous."
                  </p>
                  <p className="mt-2 text-xs font-bold text-secondary">— Surah Al-Baqarah 183</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Moon SVG */}
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 190C149.706 190 190 149.706 190 100C190 50.2944 149.706 10 100 10C83.3333 10 67.5 14.5 53.8889 22.3333C81.6667 34.5 100 62.5 100 95C100 135 70 167.5 30 175C48.3333 184.5 73.3333 190 100 190Z" fill="#d4af37"/>
        </svg>
      </div>
    </section>
  );
}

function CountdownItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-6xl font-serif font-bold text-secondary">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-widest text-emerald-300 font-bold mt-1">
        {label}
      </div>
    </div>
  );
}
