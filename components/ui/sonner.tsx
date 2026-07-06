'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster(props: React.ComponentProps<typeof SonnerToaster>) {
  return (
    <SonnerToaster
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[#1a1a30] group-[.toaster]:text-white group-[.toaster]:border group-[.toaster]:border-white/10 group-[.toaster]:shadow-2xl',
          description: 'group-[.toast]:text-white/50',
          actionButton:
            'group-[.toast]:bg-indigo-600 group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-white/10 group-[.toast]:text-white/50',
        },
      }}
      {...props}
    />
  );
}
