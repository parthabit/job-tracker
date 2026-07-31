import { Toaster as HotToaster } from 'react-hot-toast';

export default function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: 'var(--toast-bg, #fff)',
          color: 'var(--toast-fg, #0F172A)',
          borderRadius: '0.875rem',
          border: '1px solid rgba(15,23,42,0.06)',
          boxShadow: '0 8px 24px -8px rgba(15,23,42,0.15)',
          fontSize: '0.875rem',
          padding: '10px 14px',
        },
        success: {
          iconTheme: { primary: '#10B981', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#EF4444', secondary: '#fff' },
        },
      }}
    />
  );
}
