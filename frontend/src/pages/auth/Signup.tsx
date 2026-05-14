import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../api/client';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'citizen',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.register(formData.email, formData.password, formData.full_name, formData.role);
      if (response.access_token) {
        apiClient.setToken(response.access_token);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader title="Create Account" />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-600/20 border border-red-600 rounded text-red-200 text-sm">{error}</div>}

            <Input
              label="Full Name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Your name"
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-amber-600 focus:ring-1 ring-amber-600"
                required
              >
                <option value="citizen">Citizen</option>
                <option value="business_owner">Business Owner</option>
                <option value="lawyer">Lawyer</option>
              </select>
            </div>
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password"
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm password"
              required
            />
            <Button variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/signin" className="text-amber-600 hover:text-amber-500">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
