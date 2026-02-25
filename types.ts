
export enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}

export enum SkillType {
  BLOOD = 'রক্তদান',
  RELIEF = 'ত্রাণ',
  MEDICAL = 'চিকিৎসা',
  RESCUE = 'উদ্ধার',
  OTHER = 'অন্যান্য',
}

export enum UrgencyLevel {
  LOW = 'স্বাভাবিক',
  MEDIUM = 'মাঝারি',
  HIGH = 'জরুরি',
  CRITICAL = 'খুবই জরুরি',
}

export interface User {
  id: string;
  name: string;
  phone: string;
  address: string;
  age: number;
  bloodGroup: BloodGroup;
  skills: SkillType[];
  isAvailable: boolean;
  isVolunteer: boolean;
  totalHelps: number;
}

export interface HelpRequest {
  id: string;
  type: SkillType;
  description: string;
  location: string;
  contact: string;
  urgency: UrgencyLevel;
  imageUrl?: string;
  status: 'pending' | 'accepted' | 'completed';
  timestamp: Date;
  requesterId: string;
  volunteerId?: string;
}

export type ViewState = 'HOME' | 'REGISTRATION' | 'LOGIN' | 'HELP_REQUEST' | 'HELP_LIST' | 'BLOOD_DONORS' | 'PROFILE' | 'ADMIN';
