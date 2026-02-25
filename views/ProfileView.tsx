
import React, { useState } from 'react';
import { User } from '../types';
import { BANGLA_STRINGS } from '../constants';
import { Settings, LogOut, Award, Calendar, ToggleLeft, ToggleRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  const [isAvailable, setIsAvailable] = useState(user.isAvailable);

  return (
    <div className="space-y-8 pb-10">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
            <Settings className="text-gray-300" />
        </div>
        <div className="relative inline-block mb-4">
          <img 
            src={`https://picsum.photos/seed/${user.id}/150/150`} 
            alt={user.name} 
            className="w-24 h-24 rounded-3xl border-4 border-emerald-500 mx-auto object-cover"
          />
          <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 p-1.5 rounded-xl shadow-lg">
            <ShieldCheck className="text-emerald-500" size={20} />
          </div>
        </div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-500 text-sm mb-4">{user.address}</p>
        
        <div className="flex justify-center gap-6 border-t border-gray-50 dark:border-gray-700 pt-6">
          <div>
            <span className="block text-xl font-bold text-emerald-600">{user.totalHelps}</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">সাহায্য করেছেন</span>
          </div>
          <div className="w-px bg-gray-100 dark:bg-gray-700 h-10" />
          <div>
            <span className="block text-xl font-bold text-red-600">{user.bloodGroup}</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">রক্তের গ্রুপ</span>
          </div>
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl flex items-center justify-between shadow-sm border border-emerald-50">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${isAvailable ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'}`}>
            <HeartHandshake size={24} />
          </div>
          <div>
            <h4 className="font-bold">{BANGLA_STRINGS.AVAILABILITY}</h4>
            <p className="text-xs text-gray-500">{isAvailable ? BANGLA_STRINGS.STATUS_AVAILABLE : BANGLA_STRINGS.STATUS_BUSY}</p>
          </div>
        </div>
        <button onClick={() => setIsAvailable(!isAvailable)} className="transition-all scale-150 text-emerald-600">
          {isAvailable ? <ToggleRight size={32} /> : <div className="text-gray-300"><ToggleLeft size={32} /></div>}
        </button>
      </div>

      {/* Menu Options */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm overflow-hidden">
        <ProfileMenuItem icon={<Award />} label="আমার অর্জন ও ব্যাজ" />
        <ProfileMenuItem icon={<Calendar />} label="সেবার ইতিহাস" />
        <ProfileMenuItem icon={<LogOut />} label="লগ আউট" color="text-red-500" onClick={onLogout} />
      </div>
    </div>
  );
};

const ProfileMenuItem: React.FC<{ icon: React.ReactNode; label: string; color?: string; onClick?: () => void }> = ({ icon, label, color = "text-gray-600 dark:text-gray-300", onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-50 dark:border-gray-700 last:border-0 transition-colors"
  >
    <div className={`${color}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 20 })}
    </div>
    <span className={`flex-1 text-left font-medium ${color}`}>{label}</span>
    <ChevronRight size={16} className="text-gray-300" />
  </button>
);

const ChevronRight: React.FC<{ size?: number; className?: string }> = ({ size = 16, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m9 18 6-6-6-6"/>
    </svg>
);

export default ProfileView;
