
import React from 'react';
import { Home, List, Droplets, User, ShieldAlert } from 'lucide-react';
import { ViewState } from './types';

export const BANGLA_STRINGS = {
  APP_NAME: 'সেবাবন্ধু',
  MISSION: 'মানবিক প্রয়োজনে আমরা আপনার পাশে সবসময়। আপনার সেবা আমাদের লক্ষ্য।',
  EMERGENCY_HELP: 'জরুরি সাহায্য',
  VOLUNTEER_JOIN: 'স্বেচ্ছাসেবক হিসেবে যোগ দিন',
  QUICK_STATS: 'পরিসংখ্যান',
  ACTIVE_REQUESTS: 'চলমান সাহায্যের তালিকা',
  BLOOD_LIST: 'রক্তদাতার তালিকা',
  PROFILE: 'আমার প্রোফাইল',
  ADMIN_PANEL: 'অ্যাডমিন প্যানেল',
  NAME: 'নাম',
  MOBILE: 'মোবাইল নাম্বার',
  ADDRESS: 'ঠিকানা',
  AGE: 'বয়স',
  BLOOD_GROUP: 'রক্তের গ্রুপ',
  SKILLS: 'দক্ষতা নির্বাচন',
  REGISTER: 'নিবন্ধন করুন',
  LOGIN: 'লগইন করুন',
  PHONE_HINT: '১১ ডিজিটের মোবাইল নাম্বার দিন',
  ERROR_REQUIRED: 'এই ঘরটি পূরণ করা আবশ্যক',
  SUCCESS_REGISTER: 'নিবন্ধন সফল হয়েছে!',
  HELP_TYPE: 'সাহায্যের ধরন',
  HELP_DESCRIPTION: 'সমস্যার বিবরণ',
  HELP_LOCATION: 'লোকেশন',
  HELP_CONTACT: 'যোগাযোগ নাম্বার',
  HELP_URGENCY: 'জরুরিতার মাত্রা',
  HELP_SUBMIT: 'সাহায্যের আবেদন পাঠান',
  HELP_ACCEPT: 'সাহায্য করতে চাই',
  STATUS_AVAILABLE: 'উপলব্ধ',
  STATUS_BUSY: 'ব্যস্ত',
  AVAILABILITY: 'বর্তমান অবস্থা',
};

export const NAV_ITEMS = [
  { id: 'HOME' as ViewState, label: 'হোম', icon: <Home size={20} /> },
  { id: 'HELP_LIST' as ViewState, label: 'সাহায্য', icon: <List size={20} /> },
  { id: 'BLOOD_DONORS' as ViewState, label: 'রক্ত', icon: <Droplets size={20} /> },
  { id: 'PROFILE' as ViewState, label: 'প্রোফাইল', icon: <User size={20} /> },
];
