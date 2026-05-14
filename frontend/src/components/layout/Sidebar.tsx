import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  FileText,
  GraduationCap,
  MessageCircle,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { SIDEBAR_COLOR, ACTIVE_COLOR, HOVER_COLOR, TEXT_PRIMARY } from '../../constants';
import { cn } from '../../utils/helpers';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <Users size={20} />, label: 'Users', href: '/users' },
  { icon: <Briefcase size={20} />, label: 'Lawyers', href: '/lawyers' },
  { icon: <DollarSign size={20} />, label: 'Billings', href: '/billings' },
  { icon: <Calendar size={20} />, label: 'Appointments', href: '/appointments' },
  { icon: <FileText size={20} />, label: 'Documents', href: '/documents' },
  { icon: <GraduationCap size={20} />, label: 'Procedures', href: '/government-procedures' },
  { icon: <MessageCircle size={20} />, label: 'Messages', href: '/messages' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/signin');
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 text-gray-300 hover:text-white bg-slate-800 rounded-lg"
        >
          {expanded ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-700 shadow-xl',
          'flex flex-col overflow-y-auto',
          'md:translate-x-0 transition-transform duration-300 z-40',
          expanded ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <Link to="/" className="text-2xl font-bold text-amber-600">
            Zega AI
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <div key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => setExpanded(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    'text-sm font-medium',
                    isActive
                      ? `${ACTIVE_COLOR} text-white`
                      : `text-gray-300 ${HOVER_COLOR}`
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.children && (
                    <ChevronDown
                      size={16}
                      className={cn(
                        'ml-auto transition-transform',
                        openSubmenu === item.label && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Submenu */}
                {item.children && openSubmenu === item.label && (
                  <div className="ml-8 mt-2 space-y-2 border-l-2 border-slate-700 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={cn(
                          'block px-4 py-2 rounded-lg transition-all duration-200',
                          'text-xs font-medium',
                          location.pathname === child.href
                            ? `${ACTIVE_COLOR} text-white`
                            : 'text-gray-400 hover:text-gray-200'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700 p-4 space-y-2">
          <Link
            to="/profile"
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
              'text-sm font-medium text-gray-300 hover:bg-slate-800',
              location.pathname === '/profile' && `${ACTIVE_COLOR} text-white`
            )}
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium text-gray-300 hover:bg-red-900/30 hover:text-red-400"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setExpanded(false)}
        />
      )}
    </>
  );
};
