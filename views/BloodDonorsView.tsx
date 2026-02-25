
import React, { useState } from 'react';
import { User, BloodGroup } from '../types';
import { BANGLA_STRINGS } from '../constants';
import { Search, Phone, MessageSquare, Heart } from 'lucide-react';

interface BloodDonorsViewProps {
  donors: User[];
}

const BloodDonorsView: React.FC<BloodDonorsViewProps> = ({ donors }) => {
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDonors = donors.filter(d => 
    (selectedGroup === 'ALL' || d.bloodGroup === selectedGroup) &&
    (d.name.includes(searchTerm) || d.address.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-red-500 p-2 rounded-xl text-white shadow-lg shadow-red-200">
            <Heart size={24} fill="white" />
        </div>
        <h2 className="text-2xl font-bold">{BANGLA_STRINGS.BLOOD_LIST}</h2>
      </div>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="নাম বা এলাকা দিয়ে খুঁজুন..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <FilterPill label="সব" active={selectedGroup === 'ALL'} onClick={() => setSelectedGroup('ALL')} />
          {Object.values(BloodGroup).map(bg => (
            <FilterPill key={bg} label={bg} active={selectedGroup === bg} onClick={() => setSelectedGroup(bg)} />
          ))}
        </div>
      </div>

      {/* Donor List */}
      <div className="space-y-4">
        {filteredDonors.map(donor => (
          <div key={donor.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-50 dark:border-gray-700 animate-fadeIn">
            <div className="w-14 h-14 bg-red-50 dark:bg-red-950/30 rounded-2xl flex flex-col items-center justify-center border border-red-100 dark:border-red-900">
              <span className="text-lg font-bold text-red-600 leading-none">{donor.bloodGroup}</span>
              <span className="text-[10px] text-red-400 font-bold">GROUP</span>
            </div>
            
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 dark:text-white">{donor.name}</h4>
              <p className="text-xs text-gray-500">{donor.address}</p>
              <p className="text-[10px] text-gray-400 mt-1">শেষ রক্তদান: ৩ মাস আগে</p>
            </div>

            <div className="flex gap-2">
              <a href={`tel:${donor.phone}`} className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors">
                <Phone size={18} />
              </a>
              <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        ))}

        {filteredDonors.length === 0 && (
            <div className="text-center py-20 opacity-40">
                <Heart size={48} className="mx-auto mb-4" />
                <p>দুঃখিত, কোনো রক্তদাতা পাওয়া যায়নি।</p>
            </div>
        )}
      </div>
    </div>
  );
};

const FilterPill: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
      active ? 'bg-red-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-500'
    }`}
  >
    {label}
  </button>
);

export default BloodDonorsView;
