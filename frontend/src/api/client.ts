/**
 * API client for backend communication
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, Token } from '../constants';

class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.clearToken();
          window.location.href = '/signin';
        }
        return Promise.reject(error);
      }
    );

    this.token = this.getToken();
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<Token> {
    const response = await this.client.post('/auth/login', { email, password });
    const token = response.data.access_token;
    this.setToken(token);
    return response.data;
  }

  async register(email: string, password: string, full_name: string, role: string = 'citizen'): Promise<Token> {
    const response = await this.client.post('/auth/register', {
      email,
      password,
      full_name,
      role,
    });
    const token = response.data.access_token;
    this.setToken(token);
    return response.data;
  }

  async logout(): Promise<void> {
    this.clearToken();
  }

  // User endpoints
  async getUsers(skip: number = 0, limit: number = 10, role?: string, status?: string) {
    const response = await this.client.get('/users', {
      params: { skip, limit, role, status },
    });
    return response.data;
  }

  async getUser(userId: string) {
    const response = await this.client.get(`/users/${userId}`);
    return response.data;
  }

  async updateUser(userId: string, data: any) {
    const response = await this.client.put(`/users/${userId}`, data);
    return response.data;
  }

  async deleteUser(userId: string) {
    const response = await this.client.delete(`/users/${userId}`);
    return response.data;
  }

  // Lawyer endpoints
  async getLawyers(skip: number = 0, limit: number = 10, specialization?: string, status?: string) {
    const response = await this.client.get('/lawyers', {
      params: { skip, limit, specialization, status },
    });
    return response.data;
  }

  async getLawyer(lawyerId: string) {
    const response = await this.client.get(`/lawyers/${lawyerId}`);
    return response.data;
  }

  async updateLawyer(lawyerId: string, data: any) {
    const response = await this.client.put(`/lawyers/${lawyerId}`, data);
    return response.data;
  }

  async getLawyerSpecializations() {
    const response = await this.client.get('/lawyers/specializations');
    return response.data;
  }

  // Billing endpoints
  async getBillings(skip: number = 0, limit: number = 10, status?: string, userId?: string) {
    const response = await this.client.get('/billings', {
      params: { skip, limit, status, user_id: userId },
    });
    return response.data;
  }

  async createBilling(data: any) {
    const response = await this.client.post('/billings', data);
    return response.data;
  }

  async getBillingSummary() {
    const response = await this.client.get('/billings/summary');
    return response.data;
  }

  async getMonthlyRevenue() {
    const response = await this.client.get('/billings/revenue/monthly');
    return response.data;
  }

  // Appointment endpoints
  async getAppointments(skip: number = 0, limit: number = 10, status?: string, lawyerId?: string, clientId?: string) {
    const response = await this.client.get('/appointments', {
      params: { skip, limit, status, lawyer_id: lawyerId, client_id: clientId },
    });
    return response.data;
  }

  async createAppointment(data: any) {
    const response = await this.client.post('/appointments', data);
    return response.data;
  }

  async getAppointment(appointmentId: string) {
    const response = await this.client.get(`/appointments/${appointmentId}`);
    return response.data;
  }

  async updateAppointment(appointmentId: string, data: any) {
    const response = await this.client.put(`/appointments/${appointmentId}`, data);
    return response.data;
  }

  // Document endpoints
  async getDocuments(skip: number = 0, limit: number = 10, documentType?: string, userId?: string) {
    const response = await this.client.get('/documents', {
      params: { skip, limit, document_type: documentType, user_id: userId },
    });
    return response.data;
  }

  async createDocument(data: any) {
    const response = await this.client.post('/documents', data);
    return response.data;
  }

  async getDocument(documentId: string) {
    const response = await this.client.get(`/documents/${documentId}`);
    return response.data;
  }

  async deleteDocument(documentId: string) {
    const response = await this.client.delete(`/documents/${documentId}`);
    return response.data;
  }

  // Procedure endpoints
  async getProcedures(skip: number = 0, limit: number = 10, procedureType?: string, status?: string, userId?: string) {
    const response = await this.client.get('/procedures', {
      params: { skip, limit, procedure_type: procedureType, status, user_id: userId },
    });
    return response.data;
  }

  async createProcedure(data: any) {
    const response = await this.client.post('/procedures', data);
    return response.data;
  }

  async getProcedure(procedureId: string) {
    const response = await this.client.get(`/procedures/${procedureId}`);
    return response.data;
  }

  async updateProcedure(procedureId: string, data: any) {
    const response = await this.client.put(`/procedures/${procedureId}`, data);
    return response.data;
  }

  async getProcedureTypes() {
    const response = await this.client.get('/procedures/types');
    return response.data;
  }

  // Message endpoints
  async getConversations(userId: string) {
    const response = await this.client.get(`/messages/conversations/${userId}`);
    return response.data;
  }

  async getMessages(conversationId: string, skip: number = 0, limit: number = 50) {
    const response = await this.client.get(`/messages/${conversationId}`, {
      params: { skip, limit },
    });
    return response.data;
  }

  async sendMessage(data: any) {
    const response = await this.client.post('/messages', data);
    return response.data;
  }

  async markMessageAsRead(messageId: string) {
    const response = await this.client.put(`/messages/${messageId}/read`);
    return response.data;
  }

  // Dashboard endpoints
  async getDashboardStats() {
    const response = await this.client.get('/dashboard/stats');
    return response.data;
  }

  async getRecentActivity() {
    const response = await this.client.get('/dashboard/recent-activity');
    return response.data;
  }

  async getRevenueAnalytics() {
    const response = await this.client.get('/dashboard/revenue/analytics');
    return response.data;
  }

  async getCasesAnalytics() {
    const response = await this.client.get('/dashboard/cases/analytics');
    return response.data;
  }

  // Token management
  private setToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.token = token;
  }

  private getToken(): string | null {
    return localStorage.getItem('access_token') || null;
  }

  private clearToken(): void {
    localStorage.removeItem('access_token');
    this.token = null;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export const apiClient = new ApiClient();
