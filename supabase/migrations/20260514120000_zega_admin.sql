-- Zega AI Admin Dashboard - Complete Database Schema
-- Created: May 14, 2026
-- Database: Supabase PostgreSQL

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- USERS TABLE (Core user management with RBAC)
-- ============================================================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  role VARCHAR(50) NOT NULL DEFAULT 'citizen', -- citizen, business_owner, lawyer, admin
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, inactive, suspended
  subscription_plan VARCHAR(50) NOT NULL DEFAULT 'free', -- free, premium
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_status ON public.users(status);
CREATE INDEX idx_users_created_at ON public.users(created_at);

-- ============================================================================
-- LAWYERS TABLE (Lawyer profiles with specializations)
-- ============================================================================
CREATE TABLE public.lawyers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  license_number VARCHAR(100) UNIQUE NOT NULL,
  bar_association VARCHAR(255),
  specializations TEXT[] NOT NULL DEFAULT '{}', -- Array of specializations
  years_of_experience INT DEFAULT 0,
  hourly_rate DECIMAL(10, 2) DEFAULT 0,
  biography TEXT,
  office_address VARCHAR(500),
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, inactive, suspended
  rating DECIMAL(3, 2) DEFAULT 0, -- 0-5 star rating
  total_cases INT DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_lawyers_user_id ON public.lawyers(user_id);
CREATE INDEX idx_lawyers_status ON public.lawyers(status);
CREATE INDEX idx_lawyers_rating ON public.lawyers(rating DESC);
CREATE INDEX idx_lawyers_verified ON public.lawyers(verified);

-- ============================================================================
-- APPOINTMENTS TABLE
-- ============================================================================
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  lawyer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  service_type VARCHAR(255) NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INT DEFAULT 60,
  notes TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'upcoming', -- upcoming, completed, cancelled
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_appointments_client_id ON public.appointments(client_id);
CREATE INDEX idx_appointments_lawyer_id ON public.appointments(lawyer_id);
CREATE INDEX idx_appointments_scheduled_at ON public.appointments(scheduled_at);
CREATE INDEX idx_appointments_status ON public.appointments(status);

-- ============================================================================
-- BILLINGS TABLE (Payment and transaction records)
-- ============================================================================
CREATE TABLE public.billings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'ETB',
  plan_type VARCHAR(50) NOT NULL, -- free, premium, subscription
  payment_method VARCHAR(50) NOT NULL, -- chapa, telebirr, bank_transfer
  transaction_id VARCHAR(100) UNIQUE,
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- paid, pending, failed
  description TEXT,
  invoice_url VARCHAR(500),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_billings_user_id ON public.billings(user_id);
CREATE INDEX idx_billings_status ON public.billings(status);
CREATE INDEX idx_billings_created_at ON public.billings(created_at);
CREATE INDEX idx_billings_payment_method ON public.billings(payment_method);

-- ============================================================================
-- DOCUMENTS TABLE (AI-generated legal documents)
-- ============================================================================
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  document_type VARCHAR(100) NOT NULL, -- lease_agreement, business_contract, etc
  title VARCHAR(255) NOT NULL,
  content TEXT,
  storage_url VARCHAR(500),
  file_size INT, -- in bytes
  ai_generated BOOLEAN DEFAULT TRUE,
  template_id VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'draft', -- draft, finalized, archived
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_documents_user_id ON public.documents(user_id);
CREATE INDEX idx_documents_document_type ON public.documents(document_type);
CREATE INDEX idx_documents_status ON public.documents(status);
CREATE INDEX idx_documents_created_at ON public.documents(created_at);

-- ============================================================================
-- PROCEDURES TABLE (Government procedure requests with AI guidance)
-- ============================================================================
CREATE TABLE public.procedures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  procedure_type VARCHAR(100) NOT NULL, -- business_registration, land_title, etc
  session_id VARCHAR(100) UNIQUE,
  status VARCHAR(50) NOT NULL DEFAULT 'in_progress', -- in_progress, completed, pending_approval
  description TEXT,
  ai_guidance TEXT, -- AI-generated step-by-step guidance
  documents_required TEXT[], -- Array of required document types
  documents_submitted TEXT[], -- Array of submitted document IDs
  lawyer_assigned_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  last_updated TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_procedures_user_id ON public.procedures(user_id);
CREATE INDEX idx_procedures_procedure_type ON public.procedures(procedure_type);
CREATE INDEX idx_procedures_status ON public.procedures(status);
CREATE INDEX idx_procedures_session_id ON public.procedures(session_id);

-- ============================================================================
-- MESSAGES TABLE (Direct messaging between users)
-- ============================================================================
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  conversation_id UUID,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_messages_is_read ON public.messages(is_read);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);

-- ============================================================================
-- CONVERSATIONS TABLE (Message thread grouping)
-- ============================================================================
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_one_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  participant_two_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  last_message_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
  last_message_at TIMESTAMP DEFAULT NOW(),
  participant_one_unread INT DEFAULT 0,
  participant_two_unread INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversations_participant_one ON public.conversations(participant_one_id);
CREATE INDEX idx_conversations_participant_two ON public.conversations(participant_two_id);
CREATE INDEX idx_conversations_last_message_at ON public.conversations(last_message_at DESC);

-- ============================================================================
-- ACTIVITY LOG TABLE (For dashboard activity feed)
-- ============================================================================
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action_type VARCHAR(100) NOT NULL, -- document_created, appointment_booked, etc
  resource_type VARCHAR(100), -- user, lawyer, document, appointment
  resource_id VARCHAR(100),
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_action_type ON public.activity_logs(action_type);

-- ============================================================================
-- VECTOR EMBEDDINGS TABLE (For RAG/ChromaDB)
-- ============================================================================
CREATE TABLE public.document_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  embedding VECTOR(384), -- Using 384-dim embeddings (distiluse-base-multilingual-cased-v2)
  chunk_index INT DEFAULT 0,
  chunk_text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_document_embeddings_document_id ON public.document_embeddings(document_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_embeddings ENABLE ROW LEVEL SECURITY;

-- USERS RLS POLICIES
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- LAWYERS RLS POLICIES
CREATE POLICY "Everyone can view verified lawyers" ON public.lawyers
  FOR SELECT USING (verified = TRUE OR auth.uid() = user_id);

CREATE POLICY "Lawyers can update their own profile" ON public.lawyers
  FOR UPDATE USING (auth.uid() = user_id);

-- APPOINTMENTS RLS POLICIES
CREATE POLICY "Users can view their appointments" ON public.appointments
  FOR SELECT USING (
    auth.uid() = client_id OR 
    auth.uid() = lawyer_id OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- DOCUMENTS RLS POLICIES
CREATE POLICY "Users can view their documents" ON public.documents
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can create documents" ON public.documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- MESSAGES RLS POLICIES
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- PROCEDURES RLS POLICIES
CREATE POLICY "Users can view their procedures" ON public.procedures
  FOR SELECT USING (
    auth.uid() = user_id OR
    auth.uid() = lawyer_assigned_id OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- Dashboard statistics view
CREATE OR REPLACE VIEW public.dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM public.users WHERE role = 'citizen') AS total_users,
  (SELECT COUNT(*) FROM public.users WHERE role = 'lawyer' AND status = 'active') AS active_lawyers,
  (SELECT COALESCE(SUM(amount), 0) FROM public.billings WHERE status = 'paid') AS total_revenue,
  (SELECT COUNT(*) FROM public.appointments WHERE status = 'upcoming') AS pending_appointments,
  (SELECT COUNT(*) FROM public.documents) AS total_documents,
  (SELECT COUNT(*) FROM public.procedures WHERE status = 'in_progress') AS active_procedures;

-- Recent activity view
CREATE OR REPLACE VIEW public.recent_activity AS
SELECT
  action_type,
  resource_type,
  description,
  created_at,
  user_id
FROM public.activity_logs
ORDER BY created_at DESC
LIMIT 20;

-- Lawyer ratings view
CREATE OR REPLACE VIEW public.lawyer_ratings AS
SELECT
  l.id,
  l.user_id,
  AVG(
    CASE 
      WHEN a.status = 'completed' THEN 5 
      ELSE 3 
    END
  ) AS average_rating,
  COUNT(a.id) AS total_cases
FROM public.lawyers l
LEFT JOIN public.appointments a ON l.user_id = a.lawyer_id
GROUP BY l.id, l.user_id;

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lawyers_updated_at BEFORE UPDATE ON public.lawyers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_billings_updated_at BEFORE UPDATE ON public.billings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_procedures_updated_at BEFORE UPDATE ON public.procedures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON public.messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Insert sample users (uncomment to use)
-- INSERT INTO public.users (email, full_name, role, status, subscription_plan)
-- VALUES 
--   ('admin@zegaai.com', 'Admin User', 'admin', 'active', 'premium'),
--   ('user1@example.com', 'John Citizen', 'citizen', 'active', 'free'),
--   ('lawyer1@example.com', 'Jane Lawyer', 'lawyer', 'active', 'premium');
