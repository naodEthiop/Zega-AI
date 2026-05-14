import React from 'react';
import { cn, getStatusColor } from '../../utils/helpers';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'status';
  status?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', status, className }) => {
  if (variant === 'status' && status) {
    return (
      <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-medium', getStatusColor(status), className)}>
        {children}
      </span>
    );
  }

  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-600 text-white', className)}>
      {children}
    </span>
  );
};
