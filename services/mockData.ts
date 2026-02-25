
import { User, BloodGroup, SkillType, HelpRequest, UrgencyLevel } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'আব্দুর রহমান',
    phone: '01712345678',
    address: 'ঢাকা, বাংলাদেশ',
    age: 28,
    bloodGroup: BloodGroup.O_POSITIVE,
    skills: [SkillType.BLOOD, SkillType.RELIEF],
    isAvailable: true,
    isVolunteer: true,
    totalHelps: 12,
    lastDonated: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
  },
  {
    id: 'u2',
    name: 'কারিম হাসান',
    phone: '01887654321',
    address: 'চট্টগ্রাম, বাংলাদেশ',
    age: 32,
    bloodGroup: BloodGroup.B_POSITIVE,
    skills: [SkillType.MEDICAL, SkillType.RESCUE],
    isAvailable: false,
    isVolunteer: true,
    totalHelps: 8,
    lastDonated: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
  }
];

export const mockHelpRequests: HelpRequest[] = [
  {
    id: 'h1',
    type: SkillType.MEDICAL,
    description: 'আমার দাদী অসুস্থ, জরুরি অক্সিজেন প্রয়োজন।',
    location: 'মিরপুর ২, ঢাকা',
    contact: '01912112233',
    urgency: UrgencyLevel.CRITICAL,
    status: 'pending',
    timestamp: new Date(),
    requesterId: 'u3',
  },
  {
    id: 'h2',
    type: SkillType.RELIEF,
    description: 'বন্যা কবলিত এলাকায় শুকনো খাবারের সাহায্য প্রয়োজন।',
    location: 'সিলেট সদর',
    contact: '01511112222',
    urgency: UrgencyLevel.HIGH,
    status: 'pending',
    timestamp: new Date(),
    requesterId: 'u4',
  }
];
