
import React, { useState } from 'react';
import { HelpRequest, UrgencyLevel, SkillType } from '../types';
import { BANGLA_STRINGS } from '../constants';
import { MapPin, Phone, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { formatTimeAgo } from '../utils';

interface HelpListViewProps {
  requests: HelpRequest[];
  onAccept: (id: string) => void;
}

const HelpListView: React.FC<HelpListViewProps> = ({ requests, onAccept }) => {
  const [filter, setFilter] = useState<SkillType | 'ALL'>('ALL');

  const filteredRequests = filter === 'ALL' 
    ? requests 
    : requests.filter(r => r.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{BANGLA_STRINGS.ACTIVE_REQUESTS}</h2>
        <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
            {filteredRequests.length} টি অনুরোধ
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <FilterButton label="সব" active={filter === 'ALL'} onClick={() => setFilter('ALL')} />
        {Object.values(SkillType).map(skill => (
          <FilterButton 
            key={skill} 
            label={skill} 
            active={filter === skill} 
            onClick={() => setFilter(skill)} 
          />
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map(req => (
          <div 
            key={req.id} 
            className={`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border-l-8 transition-transform active:scale-[0.98] ${
                req.urgency === UrgencyLevel.CRITICAL ? 'border-red-500' :
                req.urgency === UrgencyLevel.HIGH ? 'border-orange-500' : 'border-blue-500'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300">
                {req.type}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={12} />
                <span>{formatTimeAgo(new Date(req.timestamp))}</span>
              </div>
            </div>

            <p className="font-semibold text-lg mb-4 line-clamp-2 leading-snug">
              {req.description}
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={16} className="text-emerald-500" />
                <span>{req.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={16} className="text-emerald-500" />
                <span>{req.contact}</span>
              </div>
            </div>

            {req.status === 'accepted' ? (
                <div className="w-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 p-3 rounded-xl flex items-center justify-center gap-2 font-bold">
                    <CheckCircle2 size={18} />
                    <span>সাহায্য গ্রহণ করা হয়েছে</span>
                </div>
            ) : (
                <button 
                    onClick={() => onAccept(req.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                    <AlertTriangle size={18} />
                    {BANGLA_STRINGS.HELP_ACCEPT}
                </button>
            )}
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="text-center py-20 opacity-50">
              <p className="text-lg">এই মুহূর্তে কোনো অনুরোধ নেই।</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
      active 
      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none scale-105' 
      : 'bg-white dark:bg-gray-800 text-gray-500 border border-gray-100 dark:border-gray-700'
    }`}
  >
    {label}
  </button>
);

export default HelpListView;
