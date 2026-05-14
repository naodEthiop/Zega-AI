import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <Navbar />

        {/* Page content */}
        <div className="flex-1 overflow-auto pt-16">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
