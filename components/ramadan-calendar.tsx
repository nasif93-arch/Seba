"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Download, ChevronLeft, ChevronRight, Sunrise, Sunset } from "lucide-react";

export function RamadanCalendar() {
  const [currentDay, setCurrentDay] = useState(1);

  // Mock data for 30 days of Ramadan
  const calendarData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    date: `March ${i + 1}, 2026`,
    sehri: "05:12 AM",
    iftar: "06:24 PM",
    dua: "Dua for Day " + (i + 1)
  }));

  return (
    <section id="calendar" className="py-24 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <h2 className="font-serif text-4xl font-bold text-primary dark:text-secondary">Ramadan Calendar</h2>
            <p className="text-muted-foreground mt-2">Full 30-day schedule for Sehri & Iftar</p>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-bold shadow-lg hover:opacity-90 transition-all">
            <Download size={20} />
            Download PDF
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Today's Focus */}
          <div className="lg:col-span-1">
            <div className="bg-primary text-white rounded-[3rem] p-8 shadow-2xl relative overflow-hidden h-full">
              <div className="absolute -top-10 -right-10 opacity-10">
                <CalendarIcon size={200} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="px-4 py-1 rounded-full bg-white/10 text-secondary text-xs font-bold uppercase tracking-widest">
                    Today's Schedule
                  </span>
                  <span className="text-sm font-medium">Ramadan 15</span>
                </div>
                
                <h3 className="font-serif text-3xl font-bold mb-10">Wednesday, March 15</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-primary">
                        <Sunrise size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Sehri Ends</p>
                        <p className="text-xl font-bold">05:12 AM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-accent flex items-center justify-center text-white">
                        <Sunset size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Iftar Starts</p>
                        <p className="text-xl font-bold">06:24 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 p-6 rounded-3xl bg-secondary/10 border border-secondary/20">
                  <h4 className="text-secondary font-bold text-sm mb-2 uppercase tracking-widest">Daily Sunnah</h4>
                  <p className="text-sm text-emerald-100 italic">"Break your fast with dates, for they are blessed."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full List */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-[3rem] border border-secondary/5 shadow-sm overflow-hidden">
              <div className="p-8 border-b flex items-center justify-between bg-accent/30">
                <h3 className="font-bold">Ramadan 1447 AH</h3>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-accent transition-colors"><ChevronLeft size={20} /></button>
                  <button className="p-2 rounded-lg hover:bg-accent transition-colors"><ChevronRight size={20} /></button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b">
                      <th className="px-8 py-4">Day</th>
                      <th className="px-8 py-4">Date</th>
                      <th className="px-8 py-4">Sehri</th>
                      <th className="px-8 py-4">Iftar</th>
                      <th className="px-8 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted">
                    {calendarData.slice(0, 7).map((day) => (
                      <tr key={day.day} className={`hover:bg-accent/20 transition-colors ${day.day === 15 ? "bg-secondary/5" : ""}`}>
                        <td className="px-8 py-4 font-bold text-primary dark:text-secondary">Ramadan {day.day}</td>
                        <td className="px-8 py-4 text-sm">{day.date}</td>
                        <td className="px-8 py-4 text-sm font-medium">{day.sehri}</td>
                        <td className="px-8 py-4 text-sm font-medium">{day.iftar}</td>
                        <td className="px-8 py-4">
                          {day.day < 15 ? (
                            <span className="text-[10px] font-bold uppercase text-emerald-500">Completed</span>
                          ) : day.day === 15 ? (
                            <span className="text-[10px] font-bold uppercase text-secondary animate-pulse">Today</span>
                          ) : (
                            <span className="text-[10px] font-bold uppercase text-muted-foreground">Upcoming</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 text-center border-t">
                <button className="text-sm font-bold text-primary dark:text-secondary hover:underline">
                  View Full 30-Day Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
