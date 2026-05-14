import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">My Profile</h2>

      <Card>
        <CardHeader title="Profile Information" />
        <CardContent>
          <div className="space-y-4">
            <Input label="Full Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="your@email.com" />
            <Input label="Phone" type="tel" placeholder="+251..." />
            <Input label="Organization" placeholder="Your organization" />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <textarea className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" rows={4} placeholder="Tell us about yourself" />
            </div>
            <Button variant="primary">Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Change Password" />
        <CardContent>
          <div className="space-y-4">
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Input label="Confirm Password" type="password" />
            <Button variant="primary">Update Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
