import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API call to request password reset
      // await apiClient.forgotPassword(email);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader title="Reset Password" />
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 bg-red-600/20 border border-red-600 rounded text-red-200 text-sm">{error}</div>}

              <p className="text-gray-400 text-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />

              <Button variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <Button
                variant="secondary"
                className="w-full"
                onClick={() => navigate('/signin')}
              >
                <ArrowLeft size={16} className="mr-2" /> Back to Sign In
              </Button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-green-600/20 border border-green-600 rounded text-green-200">
                Check your email for a password reset link. It may take a few minutes to arrive.
              </div>
              <Button variant="primary" className="w-full" onClick={() => navigate('/signin')}>
                Return to Sign In
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
