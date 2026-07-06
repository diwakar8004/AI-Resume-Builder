'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CreateDocumentModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCreate = () => {
    // In a real app, this would call an API, then redirect
    setOpen(false);
    router.push('/editor/new');
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0D0D20] border border-white/10 rounded-2xl p-6 z-50 shadow-2xl focus:outline-none">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-bold text-white font-['Outfit']">
              Create New Resume
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>
          
          <div className="space-y-4 mb-8">
            <p className="text-white/60 text-sm">
              Start with a blank canvas or import your existing LinkedIn profile to get a head start.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={handleCreate}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                boxShadow: '0 4px 16px rgba(79,70,229,0.35)',
              }}
            >
              <Plus className="w-4 h-4" />
              Start Blank Resume
            </button>
            <Dialog.Close asChild>
              <button className="w-full py-3.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                Cancel
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
