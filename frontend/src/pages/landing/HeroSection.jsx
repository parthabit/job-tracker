import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target,
  Menu,
  X,
  ArrowRight,
  LayoutDashboard,
  Search,
  BarChart3,
  Bell,
  ShieldCheck,
  Smartphone,
  ChevronDown,
  Star,
  Check,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: 'Unified dashboard',
    description: 'See every application, interview, and offer in one clean, organized view.',
  },
  {
    icon: Search,
    title: 'Smart search & filters',
    description: 'Find any application instantly by company, role, or status in a click.',
  },
  {
    icon: BarChart3,
    title: 'Visual analytics',
    description: 'Track your interview rate and offer rate with charts that update in real time.',
  },
  {
    icon: Bell,
    title: 'Stay on top of deadlines',
    description: 'Never miss an interview — applied dates and interview dates, side by side.',
  },
  {
    icon: ShieldCheck,
    title: 'Private & secure',
    description: 'Your data is yours. Protected with encrypted passwords and JWT authentication.',
  },
  {
    icon: Smartphone,
    title: 'Works everywhere',
    description: 'A fully responsive experience across desktop, tablet, and mobile.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Ananya Sharma',
    role: 'Final-year CS student, VIT',
    quote:
      'I applied to 60+ internships this season. TrackHire is the only reason I didn\'t lose track of who I\'d already followed up with.',
  },
  {
    name: 'Marcus Chen',
    role: 'New Grad, Software Engineer',
    quote:
      'The analytics view made me realize my resume was fine — my interview-to-offer rate was the problem. Fixed my approach in a week.',
  },
  {
    name: 'Priya Nair',
    role: 'Product Design Intern',
    quote:
      'Clean, fast, and doesn\'t try to do too much. Exactly what a job tracker should be.',
  },
];

const FAQS = [
  {
    q: 'Is TrackHire free to use?',
    a: 'Yes. TrackHire is free for students and job seekers to track applications, interviews, and offers with no limits.',
  },
  {
    q: 'Is my application data private?',
    a: 'Completely. Your data is scoped to your account only, protected by JWT authentication and encrypted passwords — no one else can see it.',
  },
  {
    q: 'Can I access TrackHire on my phone?',
    a: 'Yes, the entire dashboard is fully responsive and works smoothly on desktop, tablet, and mobile browsers.',
  },
  {
    q: 'Can I track internships as well as full-time roles?',
    a: 'Yes — every application supports a job type field including Full-time, Part-time, Internship, Contract, and Remote.',
  },
  {
    q: 'Do you support dark mode?',
    a: 'Yes, TrackHire includes a polished dark mode that you can toggle anytime from the navbar.',
  },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-secondary/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Target size={18} strokeWidth={2.25} />
          </div>
          <span className="font-display font-semibold text-secondary dark:text-white text-lg">
            TrackHire
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#screenshots" className="hover:text-primary transition-colors">Product</a>
          <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="btn-ghost">Log in</Link>
          <Link to={isAuthenticated ? '/app/dashboard' : '/register'} className="btn-primary">
            Get Started <ArrowRight size={15} />
          </Link>
        </div>

        <button
          onClick={() => setOpen((p) => !p)}
          className="md:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-slate-100 dark:border-slate-800 px-6 py-4 space-y-3"
        >
          <a href="#features" onClick={() => setOpen(false)} className="block text-sm font-medium text-slate-600 dark:text-slate-300">Features</a>
          <a href="#screenshots" onClick={() => setOpen(false)} className="block text-sm font-medium text-slate-600 dark:text-slate-300">Product</a>
          <a href="#testimonials" onClick={() => setOpen(false)} className="block text-sm font-medium text-slate-600 dark:text-slate-300">Testimonials</a>
          <a href="#faq" onClick={() => setOpen(false)} className="block text-sm font-medium text-slate-600 dark:text-slate-300">FAQ</a>
          <div className="flex gap-3 pt-2">
            <Link to="/login" className="btn-outline flex-1 justify-center">Log in</Link>
            <Link to="/register" className="btn-primary flex-1 justify-center">Get Started</Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const { isAuthenticated } = useAuth();
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(37,99,235,0.10), transparent 55%)',
        }}
      />
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-secondary-800 px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Built for students & job seekers
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl sm:text-6xl font-display font-bold tracking-tight text-secondary dark:text-white leading-[1.1]"
        >
          Your job search,
          <br />
          <span className="text-primary">finally organized.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
        >
          TrackHire is a clean, focused dashboard for tracking every application, interview, and
          offer — so you can spend less time in spreadsheets and more time preparing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to={isAuthenticated ? '/app/dashboard' : '/register'} className="btn-primary !px-6 !py-3 text-base">
            Get Started Free <ArrowRight size={17} />
          </Link>
          <Link to="/login" className="btn-outline !px-6 !py-3 text-base">
            Log in
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 text-xs text-slate-400"
        >
          No credit card required — free for students and job seekers.
        </motion.p>
      </div>
    </section>
  );
}

export { Navbar, Hero, FEATURES, TESTIMONIALS, FAQS };
