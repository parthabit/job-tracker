import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { STATUS_OPTIONS } from '../ui/StatusBadge';

export default function FilterBar({ search, setSearch, status, setStatus, sort, setSort }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by company or job title…"
          className="input pl-10"
        />
      </div>

      <div className="relative">
        <SlidersHorizontal
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="input pl-9 pr-8 appearance-none cursor-pointer sm:w-44"
        >
          <option value="All">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <ArrowUpDown
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input pl-9 pr-8 appearance-none cursor-pointer sm:w-44"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="company">Company A–Z</option>
        </select>
      </div>
    </div>
  );
}
