/**
 * Type definitions for Zega AI Admin Dashboard
 */

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: 'citizen' | 'business_owner' | 'lawyer' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  subscription_plan: 'free' | 'premium';
  created_at: string;
  updated_at: string;
}

export interface Lawyer {
  id: string;
  user_id: string;
  specializations: string[];
  license_number: string;
  bar_association?: string;
  years_of_experience: number;
  hourly_rate: number;
  biography?: string;
  office_address?: string;
  status: 'active' | 'inactive';
  rating: number;
  total_cases: number;
  created_at: string;
  updated_at: string;
}

export interface Billing {
  id: string;
  user_id: string;
  amount: number;
  plan_type: 'free' | 'premium';
  payment_method: 'chapa' | 'telebirr';
  transaction_id: string;
  status: 'paid' | 'pending' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  lawyer_id: string;
  service_type: string;
  scheduled_at: string;
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  document_type: 'lease_agreement' | 'business_contract' | 'employment_agreement' | 'affidavit' | 'power_of_attorney';
  title: string;
  content: string;
  storage_url?: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}

export interface Procedure {
  id: string;
  user_id: string;
  procedure_type: 'business_registration' | 'land_title_transfer' | 'tax_registration' | 'trade_license_renewal' | 'court_filing_guidance';
  session_id: string;
  description: string;
  status: 'in_progress' | 'completed';
  ai_guidance?: string;
  documents_required?: string[];
  created_at: string;
  updated_at: string;
  last_updated: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Conversation {
  participant_id: string;
  participant_name: string;
  participant_avatar?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
  is_online: boolean;
}

export interface DashboardStats {
  total_users: number;
  active_lawyers: number;
  total_revenue: number;
  pending_cases: number;
  total_documents: number;
  total_appointments: number;
  active_procedures: number;
}

export interface Token {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
}
