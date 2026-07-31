import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  User,
  X,
  Target,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/applications', label: 'Applications', icon: Briefcase },
  { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/app/profile', label: 'Profile', icon: User },
];

function SidebarContent({ onNavigate, onClose, showClose }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Target size={18} strokeWidth={2.25} />
          </div>
          <span className="font-display font-semibold text-secondary dark:text-white text-lg">
            TrackHire
          </span>
        </div>
        {showClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-primary-50 text-primary dark:bg-primary-900/25 dark:text-primary-300'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-secondary dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-white'
              }`
            }
          >
            <item.icon size={18} strokeWidth={2} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs text-slate-400">TrackHire v1.0</p>
      </div>
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:shrink-0 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-secondary-800">
        <SidebarContent showClose={false} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-secondary/50 backdrop-blur-sm lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-secondary-800 shadow-card lg:hidden"
            >
              <SidebarContent onNavigate={onClose} onClose={onClose} showClose />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
