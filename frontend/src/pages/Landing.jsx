import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Star, Target } from 'lucide-react';
import { Navbar, Hero, FEATURES, TESTIMONIALS, FAQS } from './landing/HeroSection';
import DashboardPreview from './landing/DashboardPreview';

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      className="card p-6 hover:shadow-glow transition-shadow"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/25 text-primary mb-4">
        <feature.icon size={20} strokeWidth={1.75} />
      </div>
      <h3 className="font-semibold text-secondary dark:text-white mb-1.5">{feature.title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6 bg-white dark:bg-secondary-800/40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <h2 className="text-3xl font-display font-bold text-secondary dark:text-white mb-3">
            Everything you need, nothing you don't
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            A focused toolkit built specifically for the job search — not a repurposed CRM.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScreenshotsSection() {
  return (
    <section id="screenshots" className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <h2 className="text-3xl font-display font-bold text-secondary dark:text-white mb-3">
            A dashboard that stays out of your way
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Every application at a glance — status, dates, and next steps, without the clutter.
          </p>
        </motion.div>
        <DashboardPreview />
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-6 bg-white dark:bg-secondary-800/40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <h2 className="text-3xl font-display font-bold text-secondary dark:text-white mb-3">
            Trusted by job seekers everywhere
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            From campus placements to full-time offers — here's what people are saying.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card p-6 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4 text-amber-400">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-1">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/25 text-primary text-xs font-semibold">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 py-5">
      <button onClick={onClick} className="flex w-full items-center justify-between text-left gap-4">
        <span className="font-medium text-secondary dark:text-white text-sm">{item.q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="text-sm text-slate-500 dark:text-slate-400 pt-3 pr-8 leading-relaxed">{item.a}</p>
      </motion.div>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="py-20 px-6">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-secondary dark:text-white mb-3">
            Frequently asked questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Everything you need to know about TrackHire.</p>
        </motion.div>
        <div>
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl rounded-2xl bg-secondary px-8 py-16 text-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 20%, rgba(37,99,235,0.35), transparent 50%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.2), transparent 45%)',
          }}
        />
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold text-white mb-3">
            Start tracking your applications today
          </h2>
          <p className="text-slate-300 mb-8 max-w-md mx-auto">
            Free for students and job seekers. Set up your dashboard in under two minutes.
          </p>
          <Link to="/register" className="btn-primary !px-6 !py-3 text-base inline-flex">
            Get Started Free <ArrowRight size={17} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 px-6 py-12">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
            <Target size={16} strokeWidth={2.25} />
          </div>
          <span className="font-display font-semibold text-secondary dark:text-white">TrackHire</span>
        </div>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} TrackHire. Built for students & job seekers.
        </p>
        <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#faq" className="hover:text-primary">FAQ</a>
          <Link to="/login" className="hover:text-primary">Log in</Link>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="bg-surface dark:bg-secondary">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <ScreenshotsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
