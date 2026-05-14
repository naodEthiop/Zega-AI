import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  title,
  children,
  onSubmit,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">{children}</div>

        <div className="flex gap-2 justify-end p-6 border-t border-slate-700">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          {onSubmit && (
            <Button variant="primary" onClick={onSubmit}>
              {submitLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
