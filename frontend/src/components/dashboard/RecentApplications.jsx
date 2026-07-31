import { motion } from 'framer-motion';
import { Building2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';
import EmptyState from '../ui/EmptyState';

export default function RecentApplications({ applications = [] }) {
  if (applications.length === 0) {
    return (
      <div className="card">
        <EmptyState
          icon={Building2}
          title="No applications yet"
          description="Applications you add will show up here."
        />
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-semibold text-secondary dark:text-white text-sm">Recent Applications</h3>
        <Link
          to="/app/applications"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all <ArrowUpRight size={13} />
        </Link>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {applications.map((app, i) => (
          <motion.div
            key={app._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/25 text-primary font-semibold text-sm">
              {app.company?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-secondary dark:text-white truncate">
                {app.jobTitle}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{app.company}</p>
            </div>
            <StatusBadge status={app.status} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
