import { motion } from 'framer-motion';
import { Briefcase, CalendarCheck, Award, Clock } from 'lucide-react';

const MOCK_ROWS = [
  { company: 'Nimbus Labs', role: 'Frontend Engineer Intern', status: 'Interview', color: 'purple' },
  { company: 'Orbit Systems', role: 'Backend Developer', status: 'Applied', color: 'blue' },
  { company: 'Fieldstone', role: 'Full Stack Engineer', status: 'Offer', color: 'emerald' },
  { company: 'Quarry Health', role: 'Software Engineer I', status: 'Under Review', color: 'amber' },
];

const COLOR_MAP = {
  purple: 'bg-purple-50 text-purple-600',
  blue: 'bg-blue-50 text-blue-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
};

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto max-w-4xl rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-secondary-800 shadow-card overflow-hidden"
    >
      {/* Fake browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-4 text-xs text-slate-400">trackhire.app/app/dashboard</span>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Briefcase, label: 'Applications', value: '24', tint: 'bg-primary-50 text-primary' },
            { icon: CalendarCheck, label: 'Interviews', value: '6', tint: 'bg-purple-50 text-purple-600' },
            { icon: Award, label: 'Offers', value: '2', tint: 'bg-emerald-50 text-emerald-600' },
            { icon: Clock, label: 'Pending', value: '14', tint: 'bg-amber-50 text-amber-600' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-100 dark:border-slate-700 p-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.tint} mb-3`}>
                <s.icon size={15} />
              </div>
              <p className="text-lg font-bold font-display text-secondary dark:text-white">{s.value}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 text-xs font-medium text-slate-500 dark:text-slate-400">
            Recent Applications
          </div>
          {MOCK_ROWS.map((r) => (
            <div
              key={r.company}
              className="flex items-center justify-between px-4 py-3 border-b border-slate-50 dark:border-slate-800 last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/25 text-primary text-xs font-semibold">
                  {r.company[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-secondary dark:text-white truncate">{r.role}</p>
                  <p className="text-[11px] text-slate-400 truncate">{r.company}</p>
                </div>
              </div>
              <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${COLOR_MAP[r.color]}`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
