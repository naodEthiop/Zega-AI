import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Dialog } from '../../components/ui/Dialog';
import { USER_ROLES, USER_STATUSES, SUBSCRIPTION_PLANS } from '../../constants';
import { formatDate, getStatusColor } from '../../utils/helpers';
import { User } from '../../types';
import { apiClient } from '../../api/client';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const limit = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getUsers(
          (page - 1) * limit,
          limit,
          roleFilter || undefined,
          statusFilter || undefined
        );
        setUsers(data);
        setTotal(data.length * page); // Approximate total
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, roleFilter, statusFilter]);

  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Name',
      key: 'full_name',
      render: (value: string) => <div className="font-medium text-white">{value}</div>,
    },
    {
      header: 'Email',
      key: 'email',
      render: (value: string) => <div className="text-gray-400 text-sm">{value}</div>,
    },
    {
      header: 'Role',
      key: 'role',
      render: (value: string) => <Badge>{value.replace('_', ' ')}</Badge>,
    },
    {
      header: 'Status',
      key: 'status',
      render: (value: string) => <Badge variant="status" status={value}>{value}</Badge>,
    },
    {
      header: 'Plan',
      key: 'subscription_plan',
      render: (value: string) => <div className="text-sm text-gray-300 capitalize">{value}</div>,
    },
    {
      header: 'Created',
      key: 'created_at',
      render: (value: string) => <div className="text-sm text-gray-400">{formatDate(value)}</div>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Users Management</h2>
        <Button variant="primary" onClick={() => setDialogOpen(true)}>
          <Plus size={20} className="mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={18} />}
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-600"
            >
              <option value="">All Roles</option>
              {USER_ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-600"
            >
              <option value="">All Status</option>
              {USER_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        loading={loading}
        pagination={{
          page,
          limit,
          total,
          onPageChange: setPage,
        }}
      />

      {/* Add User Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Add New User"
        submitLabel="Create"
      >
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Enter full name" />
          <Input label="Email" type="email" placeholder="Enter email" />
          <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
            <option>Select Role</option>
            {USER_ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
      </Dialog>
    </div>
  );
};

export default Users;
