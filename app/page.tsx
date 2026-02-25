import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { PrayerTimes } from "@/components/prayer-times";
import { RamadanCalendar } from "@/components/ramadan-calendar";
import { QuranSection } from "@/components/quran-section";
import { DuaSection } from "@/components/dua-section";
import { Tasbih } from "@/components/tasbih";
import { ExtraFeatures } from "@/components/extra-features";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <PrayerTimes />
      <QuranSection />
      <RamadanCalendar />
      <DuaSection />
      <Tasbih />
      <ExtraFeatures />
      <Footer />
    </main>
  );
}
