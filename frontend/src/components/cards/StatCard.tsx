import React from 'react';
import { Card, CardContent } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className={onClick ? 'cursor-pointer hover:bg-slate-700/50 transition-colors' : ''}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {change && (
            <p className={`text-xs mt-2 ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {change.isPositive ? '↑' : '↓'} {change.value}% from last period
            </p>
          )}
        </div>
        <div className="text-amber-600 opacity-50">{icon}</div>
      </div>
    </Card>
  );
};
