# Ramadan Pro 🌙

A comprehensive, modern, production-ready Ramadan companion website built with Next.js 15, Tailwind CSS, and Firebase.

## 🚀 Features

- **Live Prayer Times**: Real-time Fajr, Dhuhr, Asr, Maghrib, and Isha times using Aladhan API.
- **Ramadan Countdown**: Beautiful countdown timer to the holy month.
- **Digital Tasbih**: Interactive counter with local storage persistence.
- **Quran & Hadith**: Daily Ayah and Hadith for spiritual guidance.
- **Essential Duas**: Categorized supplications with Arabic, English, and Bengali translations.
- **Ramadan Calendar**: 30-day schedule for Sehri and Iftar.
- **Zakat Calculator**: Easy-to-use tool for calculating Zakat (2.5%).
- **Dark/Light Mode**: Full support for system and manual theme switching.
- **Responsive Design**: Mobile-first approach with smooth animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend**: [Firebase](https://firebase.google.com/) (Auth + Firestore)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api)

## 📦 Setup Instructions

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env.local` file based on `.env.example` and add your Firebase credentials.
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open the app**: Navigate to `http://localhost:3000`.

## 🚢 Deployment Guide

### Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com/).
3. Add your environment variables in the Vercel dashboard.
4. Click **Deploy**.

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`.
2. Login: `firebase login`.
3. Initialize: `firebase init hosting`.
4. Build the app: `npm run build`.
5. Deploy: `firebase deploy`.

## 📄 License
This project is licensed under the MIT License.
