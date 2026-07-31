import { motion } from 'framer-motion';

export default function StatCard({ label, value, icon: Icon, tint, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className="card p-5 transition-shadow hover:shadow-glow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1.5">{label}</p>
          <p className="text-2xl font-bold font-display text-secondary dark:text-white tabular-nums">
            {value}
          </p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}>
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  );
}
