import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Dialog } from '../../components/ui/Dialog';
import { LineChartComponent } from '../../components/charts/ChartComponents';
import { StatCard } from '../../components/cards/StatCard';
import { formatEtb, formatDate } from '../../utils/helpers';
import { PAYMENT_METHODS, PAYMENT_STATUSES } from '../../constants';
import { DollarSign } from 'lucide-react';
import { apiClient } from '../../api/client';

const Billings: React.FC = () => {
  const [billings, setBillings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [summary, setSummary] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const limit = 10;

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const [data, summaryData] = await Promise.all([
          apiClient.getBillings((page - 1) * limit, limit),
          apiClient.getBillingSummary(),
        ]);
        setBillings(data);
        setSummary(summaryData);
        setTotal(data.length * page);
      } catch (error) {
        console.error('Error fetching:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [page]);

  const columns = [
    { header: 'Transaction ID', key: 'transaction_id', render: (v: string) => <div className="font-mono text-sm">{v}</div> },
    { header: 'User', key: 'user_id', render: (v: string) => <div className="text-sm">User {v.slice(0, 8)}</div> },
    { header: 'Amount (ETB)', key: 'amount', render: (v: number) => <div className="font-medium">{formatEtb(v)}</div> },
    { header: 'Plan', key: 'plan_type', render: (v: string) => <Badge className="capitalize">{v}</Badge> },
    { header: 'Method', key: 'payment_method', render: (v: string) => <div className="text-sm capitalize">{v}</div> },
    { header: 'Status', key: 'status', render: (v: string) => <Badge variant="status" status={v}>{v}</Badge> },
    { header: 'Date', key: 'created_at', render: (v: string) => <div className="text-sm text-gray-400">{formatDate(v)}</div> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Billings</h2>
        <Button variant="primary" onClick={() => setDialogOpen(true)}><Plus size={20} className="mr-2" /> New Transaction</Button>
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Revenue" value={formatEtb(summary.total_revenue)} icon={<DollarSign size={28} />} />
          <StatCard title="Total Transactions" value={summary.total_transactions} icon={<DollarSign size={28} />} />
          <StatCard title="Pending" value={summary.pending_transactions} icon={<DollarSign size={28} />} />
        </div>
      )}

      <DataTable columns={columns} data={billings} loading={loading} pagination={{ page, limit, total, onPageChange: setPage }} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="New Transaction" submitLabel="Create">
        <div className="space-y-4">
          <Input label="Amount (ETB)" type="number" placeholder="0.00" />
          <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
            <option>Select Plan</option>
            <option>Free</option>
            <option>Premium</option>
          </select>
          <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
            <option>Select Payment Method</option>
            {PAYMENT_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>
      </Dialog>
    </div>
  );
};

export default Billings;
