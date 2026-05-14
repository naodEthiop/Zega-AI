import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '../../utils/helpers';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const getPageTitle = (path: string): string => {
    const titles: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/users': 'Users Management',
      '/lawyers': 'Lawyers Management',
      '/billings': 'Billings',
      '/appointments': 'Appointments',
      '/documents': 'Documents',
      '/government-procedures': 'Government Procedures',
      '/messages': 'Messages',
      '/profile': 'Profile',
      '/settings': 'Settings',
    };
    return titles[path] || 'Admin Dashboard';
  };

  return (
    <nav className={cn(
      'fixed top-0 right-0 left-0 md:left-64 h-16 bg-slate-800 border-b border-slate-700',
      'flex items-center justify-between px-6 shadow-lg z-30'
    )}>
      <h1 className="text-xl font-semibold text-white">
        {getPageTitle(location.pathname)}
      </h1>

      <div className="flex items-center gap-4">
        {/* You can add user profile, notifications, etc. here */}
      </div>
    </nav>
  );
};
