const STATUS_STYLES = {
  Applied: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
  'Under Review': 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
  Interview: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400',
  Offer: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  Rejected: 'bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400',
};

const STATUS_DOT = {
  Applied: 'bg-blue-500',
  'Under Review': 'bg-amber-500',
  Interview: 'bg-purple-500',
  Offer: 'bg-emerald-500',
  Rejected: 'bg-red-500',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`badge ${STATUS_STYLES[status] || STATUS_STYLES.Applied}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status] || STATUS_DOT.Applied}`} />
      {status}
    </span>
  );
}

export const STATUS_OPTIONS = ['Applied', 'Under Review', 'Interview', 'Offer', 'Rejected'];
export const STATUS_COLORS = {
  Applied: '#3B82F6',
  'Under Review': '#F59E0B',
  Interview: '#A855F7',
  Offer: '#10B981',
  Rejected: '#EF4444',
};
