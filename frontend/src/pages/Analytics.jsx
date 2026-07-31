import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Target as TargetIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { applicationService } from '../services/applicationService';
import { STATUS_COLORS } from '../components/ui/StatusBadge';
import Skeleton from '../components/ui/Skeleton';

function ChartCard({ title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="card p-5"
    >
      <h3 className="font-semibold text-secondary dark:text-white text-sm">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-2">{subtitle}</p>}
      <div className="mt-3">{children}</div>
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-secondary-800 px-3 py-2 shadow-card text-xs">
        <p className="font-medium text-secondary dark:text-white">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || p.fill }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await applicationService.getCharts();
        setCharts(res.charts);
      } catch (err) {
        toast.error('Could not load analytics');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card p-5">
            <Skeleton className="h-4 w-40 mb-4" />
            <Skeleton className="h-56 w-full" />
          </div>
        ))}
      </div>
    );
  }

  const hasData = charts?.statusDistribution?.length > 0;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-display font-semibold text-secondary dark:text-white">Analytics</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Insights into your job search performance over time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-5 flex items-center gap-4"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/25 text-primary">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold font-display text-secondary dark:text-white">
              {charts?.interviewRate ?? 0}%
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Applications → Interview rate</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card p-5 flex items-center gap-4"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-accent">
            <TargetIcon size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold font-display text-secondary dark:text-white">
              {charts?.successRate ?? 0}%
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Interview → Offer success rate</p>
          </div>
        </motion.div>
      </div>

      {!hasData ? (
        <div className="card p-10 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Add a few applications to start seeing charts here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ChartCard title="Applications per Month" subtitle="Last 6 months" delay={0.1}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={charts.applicationsPerMonth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94A3B8" axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(37,99,235,0.06)' }} />
                <Bar dataKey="applications" fill="#2563EB" radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Status Distribution" subtitle="Where your applications stand" delay={0.15}>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={charts.statusDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {charts.statusDistribution.map((entry, i) => (
                    <Cell key={i} fill={STATUS_COLORS[entry.name] || '#94A3B8'} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </div>
  );
}
