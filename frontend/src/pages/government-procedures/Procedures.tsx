import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Dialog } from '../../components/ui/Dialog';
import { PROCEDURE_TYPES } from '../../constants';
import { formatDate } from '../../utils/helpers';
import { apiClient } from '../../api/client';

const Procedures: React.FC = () => {
  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const limit = 10;

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getProcedures(
          (page - 1) * limit,
          limit,
          typeFilter || undefined,
          statusFilter || undefined
        );
        setProcedures(data);
        setTotal(data.length * page);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [page, typeFilter, statusFilter]);

  const columns = [
    { header: 'Session ID', key: 'session_id', render: (v: string) => <div className="font-mono text-sm">{v.slice(0, 12)}</div> },
    { header: 'User', key: 'user_id', render: (v: string) => <div className="text-sm">User {v.slice(0, 8)}</div> },
    { header: 'Type', key: 'procedure_type', render: (v: string) => <Badge className="capitalize">{v.replace(/_/g, ' ')}</Badge> },
    { header: 'Status', key: 'status', render: (v: string) => <Badge variant="status" status={v}>{v.replace(/_/g, ' ')}</Badge> },
    { header: 'Last Updated', key: 'last_updated', render: (v: string) => <div className="text-sm text-gray-400">{formatDate(v)}</div> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Government Procedures</h2>
        <Button variant="primary" onClick={() => setDialogOpen(true)}><Plus size={20} className="mr-2" /> New Request</Button>
      </div>

      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
              <option value="">All Types</option>
              {PROCEDURE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
              <option value="">All Status</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <DataTable columns={columns} data={procedures} loading={loading} pagination={{ page, limit, total, onPageChange: setPage }} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="New Procedure Request" submitLabel="Create">
        <div className="space-y-4">
          <Input label="User ID" placeholder="User ID" />
          <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
            <option>Select Procedure Type</option>
            {PROCEDURE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <textarea className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white min-h-24" placeholder="Describe the procedure request" />
        </div>
      </Dialog>
    </div>
  );
};

export default Procedures;
