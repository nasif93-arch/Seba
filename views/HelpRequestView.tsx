
import React, { useState } from 'react';
import { SkillType, UrgencyLevel, HelpRequest } from '../types';
import { BANGLA_STRINGS } from '../constants';
import { MapPin, Phone, MessageSquare, Camera, Send } from 'lucide-react';

interface HelpRequestViewProps {
  onSubmit: (request: HelpRequest) => void;
}

const HelpRequestView: React.FC<HelpRequestViewProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: SkillType.OTHER,
    description: '',
    location: '',
    contact: '',
    urgency: UrgencyLevel.MEDIUM,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: HelpRequest = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'pending',
      timestamp: new Date(),
      requesterId: 'currentUser', // Mock
    };
    onSubmit(newRequest);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{BANGLA_STRINGS.EMERGENCY_HELP}</h2>
        <p className="text-gray-500 text-sm mt-2">সঠিক তথ্য দিয়ে আমাদের সহায়তা করতে দিন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{BANGLA_STRINGS.HELP_TYPE}</label>
            <div className="grid grid-cols-2 gap-2">
                {Object.values(SkillType).map(type => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, type})}
                        className={`p-3 rounded-xl text-sm font-bold border-2 transition-all ${
                            formData.type === type ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-50 bg-gray-50 dark:bg-gray-900 text-gray-500'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{BANGLA_STRINGS.HELP_DESCRIPTION}</label>
            <textarea 
                rows={3}
                required
                placeholder="সমস্যার বিস্তারিত লিখুন..."
                className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none outline-none focus:ring-2 focus:ring-red-500"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{BANGLA_STRINGS.HELP_LOCATION}</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        type="text" required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 text-sm border-none outline-none"
                        placeholder="আপনার এলাকা"
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{BANGLA_STRINGS.HELP_CONTACT}</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        type="tel" required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 text-sm border-none outline-none"
                        placeholder="মোবাইল নাম্বার"
                        value={formData.contact}
                        onChange={e => setFormData({...formData, contact: e.target.value})}
                    />
                </div>
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{BANGLA_STRINGS.HELP_URGENCY}</label>
            <div className="flex gap-2">
                {[UrgencyLevel.LOW, UrgencyLevel.MEDIUM, UrgencyLevel.HIGH, UrgencyLevel.CRITICAL].map(u => (
                    <button
                        key={u}
                        type="button"
                        onClick={() => setFormData({...formData, urgency: u})}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                            formData.urgency === u 
                            ? 'bg-red-600 text-white shadow-lg shadow-red-200' 
                            : 'bg-gray-50 dark:bg-gray-900 text-gray-500'
                        }`}
                    >
                        {u}
                    </button>
                ))}
            </div>
        </div>

        <div className="pt-4 flex gap-4">
            <button type="button" className="p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-500">
                <Camera />
            </button>
            <button 
                type="submit"
                className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
            >
                <Send size={20} />
                {BANGLA_STRINGS.HELP_SUBMIT}
            </button>
        </div>
      </form>
    </div>
  );
};

export default HelpRequestView;
