
import React, { useState, useEffect } from 'react';
import { ViewState, User, HelpRequest, SkillType } from './types';
import { NAV_ITEMS, BANGLA_STRINGS } from './constants';
import { mockUsers, mockHelpRequests } from './services/mockData';
import HomeView from './views/HomeView';
import RegistrationView from './views/RegistrationView';
import LoginView from './views/LoginView';
import HelpListView from './views/HelpListView';
import BloodDonorsView from './views/BloodDonorsView';
import ProfileView from './views/ProfileView';
import HelpRequestView from './views/HelpRequestView';
import AdminView from './views/AdminView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allRequests, setAllRequests] = useState<HelpRequest[]>(mockHelpRequests);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Persistence check (simulated)
  useEffect(() => {
    const savedUser = localStorage.getItem('seba_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('seba_user', JSON.stringify(user));
    setCurrentView('HOME');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('seba_user');
    setCurrentView('LOGIN');
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <HomeView 
          onNavigate={setCurrentView} 
          requestsCount={allRequests.length} 
        />;
      case 'REGISTRATION':
        return <RegistrationView onComplete={handleLogin} onCancel={() => setCurrentView('HOME')} />;
      case 'LOGIN':
        return <LoginView onLogin={handleLogin} onRegister={() => setCurrentView('REGISTRATION')} />;
      case 'HELP_LIST':
        return <HelpListView requests={allRequests} onAccept={(id) => {
          setAllRequests(prev => prev.map(r => r.id === id ? {...r, status: 'accepted' as const} : r));
        }} />;
      case 'BLOOD_DONORS':
        return <BloodDonorsView donors={mockUsers.filter(u => u.skills.includes(SkillType.BLOOD))} />;
      case 'PROFILE':
        return currentUser ? 
          <ProfileView user={currentUser} onLogout={handleLogout} /> : 
          <LoginView onLogin={handleLogin} onRegister={() => setCurrentView('REGISTRATION')} />;
      case 'HELP_REQUEST':
        return <HelpRequestView onSubmit={(req) => {
          setAllRequests([req, ...allRequests]);
          setCurrentView('HELP_LIST');
        }} />;
      case 'ADMIN':
        return <AdminView requests={allRequests} users={mockUsers} />;
      default:
        return <HomeView onNavigate={setCurrentView} requestsCount={allRequests.length} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} pb-24 transition-colors duration-300`}>
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-emerald-600 text-white shadow-lg p-4 flex justify-between items-center rounded-b-2xl">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('HOME')}>
          <div className="bg-white p-1 rounded-full text-emerald-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">{BANGLA_STRINGS.APP_NAME}</h1>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-emerald-700/50 rounded-lg">
                {darkMode ? '☀️' : '🌙'}
            </button>
            {currentUser?.name && (
                <div className="hidden sm:block text-sm">সুপ্রভাত, {currentUser.name.split(' ')[0]}</div>
            )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto px-4 py-6 animate-fadeIn">
        {renderView()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 pb-safe shadow-2xl z-50 rounded-t-3xl">
        <div className="max-w-md mx-auto flex justify-around p-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                currentView === item.id ? 'text-emerald-600 scale-110 font-semibold' : 'text-gray-400 dark:text-gray-500 hover:text-emerald-400'
              }`}
            >
              <div className={`p-2 rounded-xl ${currentView === item.id ? 'bg-emerald-50 dark:bg-emerald-900/30' : ''}`}>
                {item.icon}
              </div>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
