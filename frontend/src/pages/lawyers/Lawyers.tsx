import React, { useState, useEffect } from 'react';
import { Plus, Search, Star } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Dialog } from '../../components/ui/Dialog';
import { LAWYER_SPECIALIZATIONS } from '../../constants';
import { formatDate } from '../../utils/helpers';
import { Lawyer } from '../../types';
import { apiClient } from '../../api/client';

const Lawyers: React.FC = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const limit = 10;

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getLawyers(
          (page - 1) * limit,
          limit,
          specializationFilter || undefined
        );
        setLawyers(data);
        setTotal(data.length * page);
      } catch (error) {
        console.error('Error fetching lawyers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, [page, specializationFilter]);

  const columns = [
    {
      header: 'Name',
      key: 'user_id',
      render: (value: string) => <div className="font-medium text-white">Lawyer Name</div>,
    },
    {
      header: 'Specialization',
      key: 'specializations',
      render: (value: string[]) => (
        <div className="flex gap-1 flex-wrap">
          {value?.slice(0, 2).map((spec, idx) => (
            <Badge key={idx} className="text-xs">{spec}</Badge>
          ))}
        </div>
      ),
    },
    {
      header: 'License',
      key: 'license_number',
      render: (value: string) => <div className="text-sm text-gray-300">{value}</div>,
    },
    {
      header: 'Experience',
      key: 'years_of_experience',
      render: (value: number) => <div className="text-sm text-gray-300">{value} years</div>,
    },
    {
      header: 'Rating',
      key: 'rating',
      render: (value: number) => (
        <div className="flex items-center gap-1 text-amber-500">
          <Star size={14} fill="currentColor" />
          <span className="text-sm">{value.toFixed(1)}</span>
        </div>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (value: string) => <Badge variant="status" status={value}>{value}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Lawyers Management</h2>
        <Button variant="primary" onClick={() => setDialogOpen(true)}>
          <Plus size={20} className="mr-2" />
          Add Lawyer
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by name or license..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-600"
            >
              <option value="">All Specializations</option>
              {LAWYER_SPECIALIZATIONS.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-600">
              <option>All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <DataTable
        columns={columns}
        data={lawyers}
        loading={loading}
        pagination={{
          page,
          limit,
          total,
          onPageChange: setPage,
        }}
      />

      {/* Add Lawyer Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Add New Lawyer"
        submitLabel="Create"
      >
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Enter full name" />
          <Input label="License Number" placeholder="Enter license number" />
          <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
            <option>Select Specialization</option>
            {LAWYER_SPECIALIZATIONS.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <Input label="Years of Experience" type="number" placeholder="Enter years" />
          <Input label="Hourly Rate (ETB)" type="number" placeholder="Enter rate" />
        </div>
      </Dialog>
    </div>
  );
};

export default Lawyers;
