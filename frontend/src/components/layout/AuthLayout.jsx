import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex bg-surface dark:bg-secondary">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-secondary">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(37,99,235,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.25), transparent 40%)',
          }}
        />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Target size={20} strokeWidth={2.25} />
            </div>
            <span className="font-display font-semibold text-xl">TrackHire</span>
          </Link>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-display font-semibold leading-snug mb-3"
            >
              Every application,
              <br />
              organized in one place.
            </motion.h2>
            <p className="text-slate-300 text-sm max-w-sm">
              Track applications, interviews, and offers with a dashboard built for job seekers who
              apply seriously.
            </p>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} TrackHire. All rights reserved.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Target size={18} strokeWidth={2.25} />
            </div>
            <span className="font-display font-semibold text-secondary dark:text-white text-lg">
              TrackHire
            </span>
          </Link>
          <h1 className="text-2xl font-display font-semibold text-secondary dark:text-white mb-1.5">
            {title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">{subtitle}</p>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
