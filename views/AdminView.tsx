
import React from 'react';
import { HelpRequest, User } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Users, ShieldAlert, CheckCircle } from 'lucide-react';

interface AdminViewProps {
  requests: HelpRequest[];
  users: User[];
}

const AdminView: React.FC<AdminViewProps> = ({ requests, users }) => {
  const stats = [
    { label: 'মোট স্বেচ্ছাসেবক', value: users.length, icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'মোট সাহায্যকারী', value: requests.length, icon: <Activity />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'পেন্ডিং রিকোয়েস্ট', value: requests.filter(r => r.status === 'pending').length, icon: <ShieldAlert />, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'সফল সেবা', value: requests.filter(r => r.status === 'completed' || r.status === 'accepted').length, icon: <CheckCircle />, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const chartData = [
    { name: 'ত্রাণ', value: requests.filter(r => r.type === require('../types').SkillType.RELIEF).length },
    { name: 'চিকিৎসা', value: requests.filter(r => r.type === require('../types').SkillType.MEDICAL).length },
    { name: 'রক্তদান', value: requests.filter(r => r.type === require('../types').SkillType.BLOOD).length },
    { name: 'উদ্ধার', value: requests.filter(r => r.type === require('../types').SkillType.RESCUE).length },
  ];

  const COLORS = ['#059669', '#3b82f6', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8 pb-10">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        অ্যাডমিন ড্যাশবোর্ড
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map(s => (
          <div key={s.label} className={`${s.bg} p-4 rounded-2xl flex flex-col gap-2 shadow-sm`}>
            <div className={s.color}>{React.cloneElement(s.icon as React.ReactElement, { size: 20 })}</div>
            <div className="text-2xl font-black text-gray-800">{s.value}</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold mb-6 text-gray-500 text-xs uppercase tracking-widest">সেবার ধরন অনুযায়ী বিশ্লেষণ</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
              <YAxis hide />
              <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Volunteers List */}
      <div className="space-y-4">
          <h3 className="font-bold text-lg px-2">নতুন স্বেচ্ছাসেবকবৃন্দ</h3>
          <div className="space-y-3">
              {users.map(u => (
                  <div key={u.id} className="bg-white dark:bg-gray-800 p-3 rounded-2xl flex items-center justify-between border border-gray-50 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <img src={`https://picsum.photos/seed/${u.id}/40/40`} className="w-10 h-10 rounded-xl" alt="" />
                        <div>
                            <div className="font-bold text-sm">{u.name}</div>
                            <div className="text-[10px] text-gray-400">{u.address}</div>
                        </div>
                      </div>
                      <div className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">অ্যাক্টিভ</div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default AdminView;
