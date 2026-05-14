import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, DollarSign, AlertCircle, FileText, Calendar, Zap } from 'lucide-react';
import { StatCard } from '../../components/cards/StatCard';
import { BarChartComponent, LineChartComponent, PieChartComponent } from '../../components/charts/ChartComponents';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { DashboardStats } from '../../types';
import { apiClient } from '../../api/client';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiClient.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading dashboard...</div>;
  }

  // Mock data for charts (would come from API)
  const monthlyUsersData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 500 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 700 },
    { name: 'May', value: 800 },
    { name: 'Jun', value: 900 },
  ];

  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 5000 },
    { name: 'Mar', value: 6000 },
    { name: 'Apr', value: 7000 },
    { name: 'May', value: 8000 },
    { name: 'Jun', value: 9000 },
  ];

  const caseDistribution = [
    { name: 'Commercial', value: 120 },
    { name: 'Family', value: 85 },
    { name: 'Criminal', value: 65 },
    { name: 'Property', value: 110 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats?.total_users || 0}
          icon={<Users size={28} />}
          change={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Lawyers"
          value={stats?.active_lawyers || 0}
          icon={<TrendingUp size={28} />}
          change={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Total Revenue (ETB)"
          value={`${(stats?.total_revenue || 0).toLocaleString()}`}
          icon={<DollarSign size={28} />}
          change={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pending Cases"
          value={stats?.pending_cases || 0}
          icon={<AlertCircle size={28} />}
          change={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Documents Generated"
          value={stats?.total_documents || 0}
          icon={<FileText size={28} />}
        />
        <StatCard
          title="Appointments Booked"
          value={stats?.total_appointments || 0}
          icon={<Calendar size={28} />}
        />
        <StatCard
          title="Active Procedures"
          value={stats?.active_procedures || 0}
          icon={<Zap size={28} />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartComponent
          title="Monthly Users Growth"
          data={monthlyUsersData}
          dataKey="value"
        />
        <LineChartComponent
          title="Revenue Trends"
          data={revenueData}
          dataKey="value"
          color="#d97706"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartComponent
          title="Cases by Type"
          data={caseDistribution}
          dataKey="value"
        />

        {/* Recent Activity */}
        <Card>
          <CardHeader title="Recent Activity" />
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 pb-3 border-b border-slate-700">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-medium text-white">New user registered</p>
                  <p className="text-xs text-gray-400">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-slate-700">
                <div className="w-2 h-2 mt-2 rounded-full bg-amber-500" />
                <div>
                  <p className="text-sm font-medium text-white">Appointment scheduled</p>
                  <p className="text-xs text-gray-400">12 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-slate-700">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium text-white">Document generated</p>
                  <p className="text-xs text-gray-400">28 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-purple-500" />
                <div>
                  <p className="text-sm font-medium text-white">Payment received</p>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
