import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-secondary px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-sm"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/25 text-primary">
          <Compass size={28} strokeWidth={1.75} />
        </div>
        <h1 className="text-5xl font-display font-bold text-secondary dark:text-white mb-2">404</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          This page took a wrong turn somewhere. Let's get you back on track.
        </p>
        <Link to="/" className="btn-primary inline-flex">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </motion.div>
    </div>
  );
}
