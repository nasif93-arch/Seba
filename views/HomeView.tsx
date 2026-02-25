
import React from 'react';
import { ShieldAlert, Users, Droplets, MapPin, Bell, ChevronRight, LayoutDashboard } from 'lucide-react';
import { ViewState } from '../types';
import { BANGLA_STRINGS } from '../constants';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
  requestsCount: number;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate, requestsCount }) => {
  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <section className="text-center py-6 bg-gradient-to-b from-emerald-50 to-transparent dark:from-emerald-950/20 rounded-3xl p-6">
        <img 
          src="https://picsum.photos/seed/volunteer/200/200" 
          alt="Organization" 
          className="w-32 h-32 mx-auto rounded-full border-4 border-emerald-500 shadow-xl mb-4 object-cover"
        />
        <p className="text-lg text-emerald-800 dark:text-emerald-400 font-medium leading-relaxed px-4">
          "{BANGLA_STRINGS.MISSION}"
        </p>
      </section>

      {/* Emergency Button */}
      <section>
        <button 
          onClick={() => onNavigate('HELP_REQUEST')}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-6 rounded-3xl flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all emergency-glow group"
        >
          <div className="p-3 bg-red-500/30 rounded-full group-hover:rotate-12 transition-transform">
            <ShieldAlert size={36} fill="white" />
          </div>
          <div className="text-left">
            <span className="block text-2xl font-bold">{BANGLA_STRINGS.EMERGENCY_HELP}</span>
            <span className="text-sm text-red-100 opacity-80">দ্রুত সহায়তার জন্য এখানে চাপুন</span>
          </div>
        </button>
      </section>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl flex flex-col items-center text-center">
          <span className="text-3xl font-bold text-emerald-600">{requestsCount}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">সক্রিয় সাহায্য</span>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl flex flex-col items-center text-center">
          <span className="text-3xl font-bold text-blue-600">১২০+</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">স্বেচ্ছাসেবক</span>
        </div>
      </div>

      {/* Quick Access Grid */}
      <section className="space-y-4">
        <h3 className="font-bold text-xl px-2 flex items-center gap-2">
            <ChevronRight className="text-emerald-500" /> কুইক এক্সেস
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <QuickIcon icon={<Users />} label="নিবন্ধন" color="bg-orange-100 text-orange-600" onClick={() => onNavigate('REGISTRATION')} />
          <QuickIcon icon={<Droplets />} label="রক্তদান" color="bg-red-100 text-red-600" onClick={() => onNavigate('BLOOD_DONORS')} />
          <QuickIcon icon={<MapPin />} label="আশেপাশে" color="bg-indigo-100 text-indigo-600" onClick={() => onNavigate('HELP_LIST')} />
          <QuickIcon icon={<Bell />} label="সতর্কবার্তা" color="bg-yellow-100 text-yellow-600" onClick={() => {}} />
          <QuickIcon icon={<LayoutDashboard />} label="অ্যাডমিন" color="bg-purple-100 text-purple-600" onClick={() => onNavigate('ADMIN')} />
          <QuickIcon icon={<ShieldAlert />} label="নিয়ম" color="bg-gray-100 text-gray-600" onClick={() => {}} />
        </div>
      </section>

      {/* Featured Notification */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900 flex gap-4 items-center">
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-600">
            <Bell size={24} />
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-sm">বন্যা সতর্কতা!</h4>
            <p className="text-xs text-gray-500">সিলেট অঞ্চলে আমাদের বিশেষ ত্রাণ কার্যক্রম চলছে। যুক্ত হোন আজই।</p>
        </div>
      </div>
    </div>
  );
};

const QuickIcon: React.FC<{ icon: React.ReactNode; label: string; color: string; onClick: () => void }> = ({ icon, label, color, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-50 dark:border-gray-700 active:bg-gray-50 transition-colors"
  >
    <div className={`p-3 rounded-xl ${color}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </div>
    <span className="text-xs font-semibold">{label}</span>
  </button>
);

export default HomeView;
