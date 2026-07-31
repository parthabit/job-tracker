import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, CalendarCheck, Award, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import StatCard from '../components/dashboard/StatCard';
import RecentApplications from '../components/dashboard/RecentApplications';
import { CardSkeleton, TableRowSkeleton } from '../components/ui/Skeleton';
import Modal from '../components/ui/Modal';
import ApplicationForm from '../components/applications/ApplicationForm';
import { applicationService } from '../services/applicationService';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, appsRes] = await Promise.all([
        applicationService.getStats(),
        applicationService.getAll({ sort: 'newest' }),
      ]);
      setStats(statsRes.stats);
      setRecent(appsRes.applications.slice(0, 5));
    } catch (err) {
      toast.error('Could not load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAdd = async (data) => {
    setSubmitting(true);
    try {
      await applicationService.create(data);
      toast.success('Application added');
      setModalOpen(false);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not add application');
    } finally {
      setSubmitting(false);
    }
  };

  const cards = stats
    ? [
        { label: 'Total Applications', value: stats.total, icon: FileText, tint: 'bg-primary-50 text-primary dark:bg-primary-900/25' },
        { label: 'Interviews Scheduled', value: stats.interview, icon: CalendarCheck, tint: 'bg-purple-50 text-purple-600 dark:bg-purple-950/30' },
        { label: 'Offers Received', value: stats.offer, icon: Award, tint: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30' },
        { label: 'Rejected', value: stats.rejected, icon: XCircle, tint: 'bg-red-50 text-danger dark:bg-red-950/30' },
        { label: 'Pending', value: stats.pending, icon: Clock, tint: 'bg-amber-50 text-amber-600 dark:bg-amber-950/30' },
      ]
    : [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-display font-semibold text-secondary dark:text-white">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here's an overview of your job search progress.
          </p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary shrink-0">
          <Plus size={16} /> Quick Add
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
          : cards.map((c, i) => <StatCard key={c.label} {...c} delay={i * 0.05} />)}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {loading ? (
          <div className="card overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </div>
        ) : (
          <RecentApplications applications={recent} />
        )}
      </motion.div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Application" size="lg">
        <ApplicationForm onSubmit={handleAdd} onCancel={() => setModalOpen(false)} submitting={submitting} />
      </Modal>
    </div>
  );
}
