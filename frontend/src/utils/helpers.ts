/**
 * Utility functions
 */

export const formatEtb = (amount: number): string => {
  return new Intl.NumberFormat('am-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('am-ET', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatDateTime = (date: string | Date): string => {
  return new Intl.DateTimeFormat('am-ET', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const truncateText = (text: string, length: number = 50): string => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes
    .filter((c) => typeof c === 'string' && c.length > 0)
    .join(' ');
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    upcoming: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-purple-100 text-purple-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};
