import { useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import FilterBar from '../components/applications/FilterBar';
import ApplicationsTable from '../components/applications/ApplicationsTable';
import ApplicationForm from '../components/applications/ApplicationForm';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { TableRowSkeleton } from '../components/ui/Skeleton';
import { applicationService } from '../services/applicationService';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('newest');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await applicationService.getAll({ search, status, sort });
      setApplications(res.applications);
    } catch (err) {
      toast.error('Could not load applications');
    } finally {
      setLoading(false);
    }
  }, [search, status, sort]);

  useEffect(() => {
    const timeout = setTimeout(loadApplications, 300); // debounce search
    return () => clearTimeout(timeout);
  }, [loadApplications]);

  const openAddModal = () => {
    setEditingApp(null);
    setModalOpen(true);
  };

  const openEditModal = (app) => {
    setEditingApp(app);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingApp) {
        await applicationService.update(editingApp._id, data);
        toast.success('Application updated');
      } else {
        await applicationService.create(data);
        toast.success('Application added');
      }
      setModalOpen(false);
      loadApplications();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await applicationService.remove(deleteTarget._id);
      toast.success('Application deleted');
      setDeleteTarget(null);
      loadApplications();
    } catch (err) {
      toast.error('Could not delete application');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-display font-semibold text-secondary dark:text-white">
            Applications
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {applications.length} application{applications.length !== 1 ? 's' : ''} tracked
          </p>
        </div>
        <button onClick={openAddModal} className="btn-primary shrink-0">
          <Plus size={16} /> Add Application
        </button>
      </div>

      <div className="mb-5">
        <FilterBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sort={sort}
          setSort={setSort}
        />
      </div>

      {loading ? (
        <div className="card overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ApplicationsTable
          applications={applications}
          onEdit={openEditModal}
          onDelete={(app) => setDeleteTarget(app)}
        />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingApp ? 'Edit Application' : 'Add Application'}
        size="lg"
      >
        <ApplicationForm
          defaultValues={editingApp}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          submitting={submitting}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete application?"
        message={`This will permanently remove your application to ${deleteTarget?.company || ''}. This can't be undone.`}
        loading={deleting}
      />
    </div>
  );
}
