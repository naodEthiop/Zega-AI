import React, { useState, useEffect } from 'react';
import { Plus, Download, Search } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Dialog } from '../../components/ui/Dialog';
import { DOCUMENT_TYPES } from '../../constants';
import { formatDate } from '../../utils/helpers';
import { apiClient } from '../../api/client';

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const limit = 10;

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getDocuments((page - 1) * limit, limit, typeFilter || undefined);
        setDocuments(data);
        setTotal(data.length * page);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [page, typeFilter]);

  const filtered = documents.filter((d: any) =>
    d.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Title', key: 'title', render: (v: string) => <div className="font-medium">{v}</div> },
    { header: 'Type', key: 'document_type', render: (v: string) => <Badge className="capitalize">{v.replace(/_/g, ' ')}</Badge> },
    { header: 'Size', key: 'file_size', render: (v: number) => <div className="text-sm">{(v / 1024).toFixed(2)} KB</div> },
    { header: 'Created', key: 'created_at', render: (v: string) => <div className="text-sm text-gray-400">{formatDate(v)}</div> },
    { header: 'Action', key: 'id', render: (v: string) => <Button variant="secondary" size="sm"><Download size={16} /></Button> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Documents</h2>
        <Button variant="primary" onClick={() => setDialogOpen(true)}><Plus size={20} className="mr-2" /> Generate</Button>
      </div>

      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
              <option value="">All Types</option>
              {DOCUMENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      <DataTable columns={columns} data={filtered} loading={loading} pagination={{ page, limit, total, onPageChange: setPage }} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="Generate Document" submitLabel="Generate">
        <div className="space-y-4">
          <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
            <option>Select Document Type</option>
            {DOCUMENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <Input label="Document Title" placeholder="Enter title" />
          <textarea className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white min-h-24" placeholder="Enter document content" />
        </div>
      </Dialog>
    </div>
  );
};

export default Documents;
