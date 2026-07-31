import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { STATUS_OPTIONS } from '../ui/StatusBadge';

const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'];

function toDateInput(value) {
  if (!value) return '';
  return new Date(value).toISOString().split('T')[0];
}

export default function ApplicationForm({ defaultValues, onSubmit, onCancel, submitting }) {
  const buildDefaults = (values) => {
    const merged = {
      company: '',
      jobTitle: '',
      location: '',
      jobType: 'Full-time',
      salary: '',
      status: 'Applied',
      appliedDate: toDateInput(new Date()),
      interviewDate: '',
      jobLink: '',
      notes: '',
      ...values,
    };
    merged.appliedDate = toDateInput(values?.appliedDate) || toDateInput(new Date());
    merged.interviewDate = toDateInput(values?.interviewDate);
    return merged;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: buildDefaults(defaultValues),
  });

  useEffect(() => {
    reset(buildDefaults(defaultValues));
  }, [defaultValues, reset]);

  const submit = (data) => {
    const payload = { ...data };
    if (!payload.interviewDate) delete payload.interviewDate;
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Company *</label>
          <input
            className="input"
            placeholder="e.g. Acme Corp"
            {...register('company', { required: 'Company is required' })}
          />
          {errors.company && <p className="text-xs text-danger mt-1">{errors.company.message}</p>}
        </div>
        <div>
          <label className="label">Job Title *</label>
          <input
            className="input"
            placeholder="e.g. Frontend Engineer"
            {...register('jobTitle', { required: 'Job title is required' })}
          />
          {errors.jobTitle && <p className="text-xs text-danger mt-1">{errors.jobTitle.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Location</label>
          <input className="input" placeholder="e.g. Bengaluru, India" {...register('location')} />
        </div>
        <div>
          <label className="label">Job Type</label>
          <select className="input" {...register('jobType')}>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Salary (optional)</label>
          <input className="input" placeholder="e.g. ₹12–15 LPA" {...register('salary')} />
        </div>
        <div>
          <label className="label">Status</label>
          <select className="input" {...register('status')}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Applied Date</label>
          <input type="date" className="input" {...register('appliedDate')} />
        </div>
        <div>
          <label className="label">Interview Date (optional)</label>
          <input type="date" className="input" {...register('interviewDate')} />
        </div>
      </div>

      <div>
        <label className="label">Job Link</label>
        <input
          className="input"
          placeholder="https://..."
          {...register('jobLink', {
            pattern: {
              value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}([/\w .-]*)*\/?.*$/i,
              message: 'Enter a valid URL',
            },
          })}
        />
        {errors.jobLink && <p className="text-xs text-danger mt-1">{errors.jobLink.message}</p>}
      </div>

      <div>
        <label className="label">Notes</label>
        <textarea
          className="input min-h-[90px] resize-y"
          placeholder="Any details you want to remember…"
          {...register('notes')}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? 'Saving…' : defaultValues?._id ? 'Save Changes' : 'Add Application'}
        </button>
      </div>
    </form>
  );
}
