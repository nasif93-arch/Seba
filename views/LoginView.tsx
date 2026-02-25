
import React, { useState } from 'react';
import { User } from '../types';
import { BANGLA_STRINGS } from '../constants';
import { mockUsers } from '../services/mockData';
import { Phone, Lock, ChevronRight } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: User) => void;
  onRegister: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onRegister }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = mockUsers.find(u => u.phone === phone);
    if (user) {
      onLogin(user);
    } else {
      setError('এই নাম্বারটি খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক নাম্বার দিন অথবা নতুন একাউন্ট খুলুন।');
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16" />
        
        <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl mx-auto flex items-center justify-center text-emerald-600 mb-6">
                <Lock size={40} />
            </div>
            <h2 className="text-3xl font-extrabold">{BANGLA_STRINGS.LOGIN}</h2>
            <p className="text-gray-500 mt-2">আপনার ফোন নাম্বার দিয়ে প্রবেশ করুন</p>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">{BANGLA_STRINGS.MOBILE}</label>
                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="tel"
                        value={phone}
                        onChange={e => { setPhone(e.target.value); setError(''); }}
                        placeholder="০১xxxxxxxxx"
                        className={`w-full pl-12 pr-4 py-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-emerald-500'}`}
                    />
                </div>
                {error && <p className="text-xs text-red-500 px-2 font-medium">{error}</p>}
            </div>

            <button 
                onClick={handleLogin}
                className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-emerald-700 active:scale-95 transition-all"
            >
                শুরু করি
                <ChevronRight size={20} />
            </button>
        </div>

        <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 mb-4">আপনার কি একাউন্ট নেই?</p>
            <button 
                onClick={onRegister}
                className="text-emerald-600 font-bold hover:underline"
            >
                নতুন একাউন্ট খুলুন
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
