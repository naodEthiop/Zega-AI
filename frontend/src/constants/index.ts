/**
 * Application constants
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const LAWYER_SPECIALIZATIONS = [
  'Commercial Law',
  'Family Law',
  'Criminal Law',
  'Land and Property Law',
  'Labor Law',
  'Constitutional Law',
];

export const DOCUMENT_TYPES = [
  { value: 'lease_agreement', label: 'Lease Agreement' },
  { value: 'business_contract', label: 'Business Contract' },
  { value: 'employment_agreement', label: 'Employment Agreement' },
  { value: 'affidavit', label: 'Affidavit' },
  { value: 'power_of_attorney', label: 'Power of Attorney' },
];

export const PROCEDURE_TYPES = [
  { value: 'business_registration', label: 'Business Registration' },
  { value: 'land_title_transfer', label: 'Land Title Transfer' },
  { value: 'tax_registration', label: 'Tax Registration' },
  { value: 'trade_license_renewal', label: 'Trade License Renewal' },
  { value: 'court_filing_guidance', label: 'Court Filing Guidance' },
];

export const USER_ROLES = [
  { value: 'citizen', label: 'Citizen' },
  { value: 'business_owner', label: 'Business Owner' },
  { value: 'lawyer', label: 'Lawyer' },
  { value: 'admin', label: 'Admin' },
];

export const SUBSCRIPTION_PLANS = ['free', 'premium'];

export const APPOINTMENT_STATUSES = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const PAYMENT_METHODS = [
  { value: 'chapa', label: 'Chapa' },
  { value: 'telebirr', label: 'Telebirr' },
];

export const PAYMENT_STATUSES = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
];

export const USER_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
];

// Tailwind color classes for dark navy sidebar with warm brown accents
export const SIDEBAR_COLOR = 'bg-slate-900';
export const ACTIVE_COLOR = 'bg-amber-600';
export const HOVER_COLOR = 'hover:bg-slate-800';
export const TEXT_PRIMARY = 'text-gray-100';
export const TEXT_SECONDARY = 'text-gray-400';
export const CARD_BG = 'bg-slate-800';
export const BORDER_COLOR = 'border-slate-700';
