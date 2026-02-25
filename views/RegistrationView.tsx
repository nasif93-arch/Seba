
import React, { useState } from 'react';
import { User, SkillType, BloodGroup } from '../types';
import { BANGLA_STRINGS } from '../constants';
import { ArrowLeft, Check } from 'lucide-react';

interface RegistrationViewProps {
  onComplete: (user: User) => void;
  onCancel: () => void;
}

const RegistrationView: React.FC<RegistrationViewProps> = ({ onComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    age: '',
    bloodGroup: BloodGroup.A_POSITIVE,
    skills: [] as SkillType[],
  });

  const [step, setStep] = useState(1);

  const toggleSkill = (skill: SkillType) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = () => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      age: parseInt(formData.age),
      bloodGroup: formData.bloodGroup,
      skills: formData.skills,
      isAvailable: true,
      isVolunteer: true,
      totalHelps: 0,
    };
    onComplete(newUser);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl max-w-sm mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">{BANGLA_STRINGS.VOLUNTEER_JOIN}</h2>
      </div>

      <div className="flex gap-2 mb-8">
          <div className={`h-2 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
          <div className={`h-2 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
          <div className={`h-2 flex-1 rounded-full transition-all ${step >= 3 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
      </div>

      {step === 1 && (
        <div className="space-y-4 animate-fadeIn">
          <InputField label={BANGLA_STRINGS.NAME} value={formData.name} onChange={v => setFormData({...formData, name: v})} placeholder="আপনার পুরো নাম" />
          <InputField label={BANGLA_STRINGS.MOBILE} value={formData.phone} onChange={v => setFormData({...formData, phone: v})} placeholder="০১xxxxxxxxx" type="tel" />
          <button 
            disabled={!formData.name || !formData.phone}
            onClick={() => setStep(2)} 
            className="w-full bg-emerald-600 text-white p-4 rounded-xl font-bold mt-6 disabled:opacity-50"
          >
            পরবর্তী ধাপ
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-fadeIn">
          <InputField label={BANGLA_STRINGS.ADDRESS} value={formData.address} onChange={v => setFormData({...formData, address: v})} placeholder="বাসার ঠিকানা / এলাকা" />
          <InputField label={BANGLA_STRINGS.AGE} value={formData.age} onChange={v => setFormData({...formData, age: v})} placeholder="আপনার বয়স" type="number" />
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500">{BANGLA_STRINGS.BLOOD_GROUP}</label>
            <select 
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-none outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.bloodGroup}
              onChange={e => setFormData({...formData, bloodGroup: e.target.value as BloodGroup})}
            >
              {Object.values(BloodGroup).map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
          <button onClick={() => setStep(3)} className="w-full bg-emerald-600 text-white p-4 rounded-xl font-bold mt-6">
            পরবর্তী ধাপ
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <label className="text-sm font-semibold text-gray-500">{BANGLA_STRINGS.SKILLS}</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(SkillType).map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`p-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                  formData.skills.includes(skill) 
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30' 
                  : 'border-gray-100 text-gray-600'
                }`}
              >
                <span className="text-sm">{skill}</span>
                {formData.skills.includes(skill) && <Check size={16} />}
              </button>
            ))}
          </div>
          <button 
            onClick={handleSubmit} 
            className="w-full bg-emerald-600 text-white p-4 rounded-xl font-bold shadow-lg hover:bg-emerald-700 active:scale-95 transition-all"
          >
            {BANGLA_STRINGS.REGISTER}
          </button>
        </div>
      )}
    </div>
  );
};

const InputField: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-500">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-none outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400"
    />
  </div>
);

export default RegistrationView;
