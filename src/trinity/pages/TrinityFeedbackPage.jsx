import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal } from '../../shared/components/Reveal';
import { useLocale } from '../../shared/hooks/useLocale';
import { Disclaimer } from '../../shared/components/Disclaimer';

const TrinityFeedbackPage = () => {
  const { t, currentLocale, language } = useLocale();
  const fb = t.trinity.feedback;
  const giveawayBase = currentLocale === 'default' ? '/trinity/giveaway' : `/trinity/giveaway/${currentLocale}`;
  const homeBase = currentLocale === 'default' ? '/' : `/${currentLocale}`;

  return (
    <div className="bg-[#fcf9f4] min-h-screen text-[#1c1c19] font-body selection:bg-amber-600/30 selection:text-amber-900">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 pt-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 shadow-[0_10px_40_rgba(184,150,12,0.08)]">
          <div className="font-serif text-3xl italic tracking-tighter text-amber-600">
            Trinity Carter
          </div>
          <Link to={homeBase} className="font-label text-[10px] text-outline hover:text-amber-600 uppercase tracking-widest transition-all italic font-bold">
            {language === 'fr' ? '← Retour au tunnel' : '← Back to Funnel'}
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-32 md:py-48">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-label text-[10px] text-primary uppercase tracking-[0.4em] font-bold block mb-4 italic">{fb.badge}</span>
            <h2 className="font-headline text-5xl md:text-7xl text-on-background mb-6 leading-tight uppercase">
              {fb.title} <span className="italic text-primary">{fb.titleSuffix}</span>
            </h2>
            <p className="text-on-surface-variant text-lg font-light leading-relaxed italic max-w-2xl mx-auto">
              {fb.subtitle}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-primary/10 space-y-8 shadow-sm">
            <div className="space-y-4 text-left">
              <label className="font-label text-[10px] uppercase tracking-widest font-bold text-outline italic">{fb.feedbackLabel}</label>
              <textarea 
                rows="6"
                placeholder={fb.placeholder}
                className="w-full bg-[#fcf9f4] border border-primary/10 rounded-3xl p-6 text-on-background text-sm focus:border-primary outline-none transition-all placeholder:text-outline/40 italic"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <label className="font-label text-[10px] uppercase tracking-widest font-bold text-outline italic">{fb.emailLabel}</label>
                <input 
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-[#fcf9f4] border border-primary/10 rounded-full px-8 py-5 text-on-background text-sm focus:border-primary outline-none transition-all placeholder:text-outline/40 italic"
                />
              </div>
              <div className="space-y-4">
                <label className="font-label text-[10px] uppercase tracking-widest font-bold text-outline italic">{fb.nameLabel}</label>
                <input 
                  type="text"
                  placeholder="Trinity Carter"
                  className="w-full bg-[#fcf9f4] border border-primary/10 rounded-full px-8 py-5 text-on-background text-sm focus:border-primary outline-none transition-all placeholder:text-outline/40 italic"
                />
              </div>
            </div>

            <div className="pt-6">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-on-background text-white py-6 rounded-full font-label text-xs font-bold tracking-[0.2em] uppercase italic shadow-2xl hover:bg-primary transition-all"
              >
                {fb.submitBtn}
              </motion.button>
            </div>
            
            <div className="text-center">
              <p className="text-[10px] text-outline uppercase tracking-widest font-label opacity-60 italic">
                {fb.disclaimer}
              </p>
            </div>
          </form>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 text-center">
            <Link 
              to={giveawayBase}
              className="text-[11px] text-primary hover:text-secondary font-label uppercase tracking-widest underline underline-offset-8 decoration-primary/30 transition-all italic font-bold"
            >
              {fb.backToGiveaway}
            </Link>
          </div>
        </Reveal>
      </main>

      <Disclaimer />
      <footer className="py-20 border-t border-primary/5 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-8">
          <div className="font-serif text-3xl italic tracking-tighter text-amber-600">Trinity Carter</div>
          <p className="text-outline font-label uppercase tracking-[0.5em] text-[8px] font-bold">PRODUCED BY THE ALPHA COLLECTIVE © 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default TrinityFeedbackPage;
