"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, ChevronRight, Bell, BellOff } from "lucide-react";
import { getPrayerTimes, AladhanResponse } from "@/lib/api";

export function PrayerTimes() {
  const [data, setData] = useState<AladhanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Dhaka");
  const [country, setCountry] = useState("Bangladesh");
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTimes() {
      try {
        setLoading(true);
        const res = await getPrayerTimes(city, country);
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTimes();
  }, [city, country]);

  const toggleNotification = (prayer: string) => {
    setNotifications(prev => 
      prev.includes(prayer) ? prev.filter(p => p !== prayer) : [...prev, prayer]
    );
  };

  if (loading) return <div className="py-20 text-center">Loading prayer times...</div>;

  const prayers = [
    { name: "Fajr", time: data?.data.timings.Fajr },
    { name: "Sunrise", time: data?.data.timings.Sunrise },
    { name: "Dhuhr", time: data?.data.timings.Dhuhr },
    { name: "Asr", time: data?.data.timings.Asr },
    { name: "Maghrib", time: data?.data.timings.Maghrib },
    { name: "Isha", time: data?.data.timings.Isha },
  ];

  return (
    <section id="prayer-times" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-4xl font-bold text-primary dark:text-secondary">Prayer Times</h2>
            <p className="text-muted-foreground mt-2 flex items-center gap-2">
              <MapPin size={16} /> {city}, {country}
            </p>
          </div>
          
          <div className="flex gap-2">
            <select 
              className="bg-accent rounded-lg px-4 py-2 text-sm font-medium outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="Dhaka">Dhaka</option>
              <option value="London">London</option>
              <option value="New York">New York</option>
              <option value="Dubai">Dubai</option>
              <option value="Mecca">Mecca</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {prayers.map((prayer, index) => (
            <motion.div
              key={prayer.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-3xl p-6 border transition-all group ${
                prayer.name === "Maghrib" 
                ? "bg-primary text-white border-primary shadow-xl scale-105 z-10" 
                : "bg-card hover:border-secondary/50"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-bold uppercase tracking-widest ${
                  prayer.name === "Maghrib" ? "text-secondary" : "text-muted-foreground"
                }`}>
                  {prayer.name}
                </span>
                <button 
                  onClick={() => toggleNotification(prayer.name)}
                  className={`p-1.5 rounded-full transition-colors ${
                    prayer.name === "Maghrib" 
                    ? "bg-white/10 hover:bg-white/20" 
                    : "bg-accent hover:bg-secondary/20"
                  }`}
                >
                  {notifications.includes(prayer.name) 
                    ? <Bell size={14} className={prayer.name === "Maghrib" ? "text-secondary" : "text-primary"} /> 
                    : <BellOff size={14} className="text-muted-foreground" />
                  }
                </button>
              </div>
              
              <div className="text-3xl font-serif font-bold mb-1">
                {prayer.time}
              </div>
              
              {prayer.name === "Maghrib" && (
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-secondary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  Next Prayer: Iftar
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 p-8 rounded-[2rem] bg-accent/50 border border-secondary/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-secondary shadow-lg">
              <Clock size={32} />
            </div>
            <div>
              <h3 className="font-bold text-xl">Hijri Date</h3>
              <p className="text-muted-foreground">{data?.data.date.hijri.day} {data?.data.date.hijri.month.en} {data?.data.date.hijri.year}</p>
            </div>
          </div>
          
          <button className="flex items-center gap-2 font-bold text-primary dark:text-secondary hover:underline group">
            View Full Monthly Calendar
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
