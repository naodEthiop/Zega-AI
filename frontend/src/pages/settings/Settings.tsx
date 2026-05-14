import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Toggle } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>

      <Card>
        <CardHeader title="Notifications" />
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive email updates</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">SMS Alerts</p>
                <p className="text-sm text-gray-400">Receive SMS notifications</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Privacy" />
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Profile Visibility</p>
                <p className="text-sm text-gray-400">Make profile visible to others</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Danger Zone" />
        <CardContent>
          <Button variant="danger">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
