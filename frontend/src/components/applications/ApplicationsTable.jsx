import { motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink, Pencil, Trash2, Briefcase } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import EmptyState from '../ui/EmptyState';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ApplicationsTable({ applications, onEdit, onDelete }) {
  if (applications.length === 0) {
    return (
      <div className="card">
        <EmptyState
          icon={Briefcase}
          title="No applications found"
          description="Try adjusting your filters, or add a new application to get started."
        />
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      {/* Desktop table */}
      <table className="hidden md:table w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800 text-left text-xs uppercase tracking-wide text-slate-400">
            <th className="px-5 py-3 font-medium">Company / Role</th>
            <th className="px-5 py-3 font-medium">Location</th>
            <th className="px-5 py-3 font-medium">Type</th>
            <th className="px-5 py-3 font-medium">Applied</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {applications.map((app, i) => (
            <motion.tr
              key={app._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
              className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
            >
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/25 text-primary font-semibold text-xs">
                    {app.company?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-secondary dark:text-white truncate">{app.jobTitle}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{app.company}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                {app.location || '—'}
              </td>
              <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{app.jobType}</td>
              <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                {formatDate(app.appliedDate)}
              </td>
              <td className="px-5 py-3.5">
                <StatusBadge status={app.status} />
              </td>
              <td className="px-5 py-3.5">
                <div className="flex items-center justify-end gap-1">
                  {app.jobLink && (
                    <a
                      href={app.jobLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-700"
                      title="Open job link"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                  <button
                    onClick={() => onEdit(app)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-700"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(app)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-danger dark:hover:bg-red-950/30"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {applications.map((app, i) => (
          <motion.div
            key={app._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
            className="p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/25 text-primary font-semibold text-xs">
                  {app.company?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-secondary dark:text-white truncate">{app.jobTitle}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{app.company}</p>
                </div>
              </div>
              <StatusBadge status={app.status} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mb-3 pl-12">
              {app.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {app.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {formatDate(app.appliedDate)}
              </span>
              <span>{app.jobType}</span>
            </div>
            <div className="flex items-center gap-2 pl-12">
              {app.jobLink && (
                <a
                  href={app.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !px-2.5 !py-1.5"
                >
                  <ExternalLink size={14} />
                </a>
              )}
              <button onClick={() => onEdit(app)} className="btn-ghost !px-2.5 !py-1.5">
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(app)}
                className="btn-ghost !px-2.5 !py-1.5 hover:!text-danger"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
