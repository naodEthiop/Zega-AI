import React, { useState, useEffect } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Dialog } from '../../components/ui/Dialog';
import { formatDate, formatDateTime } from '../../utils/helpers';
import { APPOINTMENT_STATUSES } from '../../constants';
import { apiClient } from '../../api/client';

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewType, setViewType] = useState<'table' | 'calendar'>('table');

  const limit = 10;

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getAppointments((page - 1) * limit, limit);
        setAppointments(data);
        setTotal(data.length * page);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [page]);

  const columns = [
    { header: 'Appointment ID', key: 'id', render: (v: string) => <div className="font-mono text-sm">{v.slice(0, 12)}</div> },
    { header: 'Client', key: 'client_id', render: (v: string) => <div className="text-sm">Client {v.slice(0, 8)}</div> },
    { header: 'Lawyer', key: 'lawyer_id', render: (v: string) => <div className="text-sm">Lawyer {v.slice(0, 8)}</div> },
    { header: 'Service', key: 'service_type', render: (v: string) => <div className="text-sm capitalize">{v.replace(/_/g, ' ')}</div> },
    { header: 'Scheduled', key: 'scheduled_at', render: (v: string) => <div className="text-sm">{formatDateTime(v)}</div> },
    { header: 'Status', key: 'status', render: (v: string) => <Badge variant="status" status={v}>{v}</Badge> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Appointments</h2>
        <div className="flex gap-2">
          <Button variant={viewType === 'table' ? 'primary' : 'secondary'} onClick={() => setViewType('table')} size="sm">Table</Button>
          <Button variant={viewType === 'calendar' ? 'primary' : 'secondary'} onClick={() => setViewType('calendar')} size="sm"><CalendarIcon size={16} /></Button>
          <Button variant="primary" onClick={() => setDialogOpen(true)}><Plus size={20} className="mr-2" /> Add</Button>
        </div>
      </div>

      {viewType === 'table' && (
        <DataTable columns={columns} data={appointments} loading={loading} pagination={{ page, limit, total, onPageChange: setPage }} />
      )}

      {viewType === 'calendar' && (
        <Card>
          <CardContent>
            <div className="text-center py-12 text-gray-400">Calendar view coming soon</div>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="Add Appointment" submitLabel="Create">
        <div className="space-y-4">
          <Input label="Client ID" placeholder="Client ID" />
          <Input label="Lawyer ID" placeholder="Lawyer ID" />
          <Input label="Service Type" placeholder="Service type" />
          <Input label="Scheduled Date/Time" type="datetime-local" />
          <Input label="Notes" placeholder="Additional notes" />
        </div>
      </Dialog>
    </div>
  );
};

export default Appointments;
