import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTableProps {
  columns: {
    header: string;
    key: string;
    render?: (value: any, row: any) => React.ReactNode;
  }[];
  data: any[];
  loading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  loading = false,
  pagination,
}) => {
  if (loading) {
    return (
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 text-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 text-center">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700 bg-slate-700">
            {columns.map((column) => (
              <th key={column.key} className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
              {columns.map((column) => (
                <td key={`${idx}-${column.key}`} className="px-6 py-4 text-sm text-gray-300">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700 bg-slate-700/30">
          <span className="text-sm text-gray-400">
            Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
