import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal } from '../../shared/components/Reveal';
import { useLocale } from '../../shared/hooks/useLocale';
import { Disclaimer } from '../../shared/components/Disclaimer';

const TrinityGiveawayPage = () => {
  const { t, currentLocale, language } = useLocale();
  const gw = t.trinity.giveaway;
  const feedbackBase = currentLocale === 'default' ? '/feedback' : `/feedback/${currentLocale}`;
  const homeBase = currentLocale === 'default' ? '/' : `/${currentLocale}`;

  return (
    <div className="bg-[#fcf9f4] min-h-screen text-[#1c1c19] font-body selection:bg-amber-600/30 selection:text-amber-900">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 pt-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 shadow-[0_10px_40px_rgba(184,150,12,0.08)]">
          <div className="font-serif text-3xl italic tracking-tighter text-amber-600">
            Trinity Carter
          </div>
          <Link to={homeBase} className="font-label text-[10px] text-outline hover:text-amber-600 uppercase tracking-widest transition-all italic font-bold">
            {gw.backLink}
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Product Render (Giveaway Focus) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-primary/5 blur-[100px] rounded-full" />
            <motion.div 
              className="relative bg-white border border-primary/10 p-4 rounded-[4rem] shadow-2xl rotate-2"
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDymxTTYgGwFUDEfdHb_kZtIrvmY60cBc4pNzwa2rlGN_QzAn3mut0T6MDyPFMG4Xp0nk_ie3_z4YvILwI-6JOKv2nBYucpN6P5xl_5Q5GSxksr9ZHvk7L3cSOzWyS-GenRcZkQlckOefN3z2sbaZl9CehGaTMemBIVUHtEkQ-c2texcewK8b4yvUJQv5dJG281IV3QNGmC7t_XDn2cbIIgjtW4dqCi2z3sM2WZO02UIbOKTJnjEgCxxSNQFjwUlEQuTFUC1nUKRFSu" 
                alt="Trinity Carter Giveaway Prize" 
                className="w-full h-[500px] object-cover rounded-[3rem]"
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary text-white px-8 py-4 rounded-2xl font-headline text-2xl italic tracking-tight -rotate-3 shadow-xl uppercase">
                {language === 'fr' ? 'Gagnez ce mois-ci' : 'Win This Month'}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Steps & Review */}
          <div className="flex flex-col gap-12 text-left">
            <Reveal>
              <span className="font-label text-[10px] text-primary uppercase tracking-[0.4em] font-bold block mb-4 italic">{gw.badge}</span>
              <h2 className="font-headline text-5xl md:text-7xl text-on-background mb-6 leading-tight uppercase">
                {gw.title} <span className="italic text-primary">{gw.titleSuffix}</span> <br/>{gw.titleEnd}
              </h2>
              <p className="text-on-surface-variant text-lg font-light leading-relaxed italic border-l-2 border-primary/20 pl-6">
                {gw.subtitle}
              </p>
            </Reveal>

            <div className="space-y-6">
              {gw.steps.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.1}>
                  <div className="flex gap-6 items-center group bg-white p-6 rounded-3xl border border-primary/5 hover:bg-surface-container-low transition-all">
                    <span className="font-headline text-4xl text-primary/10 group-hover:text-primary transition-all italic">{step.n}</span>
                    <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant group-hover:text-on-background transition-all italic font-bold">{step.t}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 p-8 bg-primary/5 border border-primary/10 rounded-[2rem] shadow-sm italic">
              <p className="font-label text-sm text-on-surface-variant leading-relaxed uppercase tracking-wider font-bold">
                {gw.participationInstructions}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-6">
              <p className="text-[10px] text-outline font-label uppercase tracking-widest leading-none opacity-60 italic font-bold">
                {gw.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Disclaimer variant="trinity" />
      <footer className="py-20 border-t border-primary/5 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-8">
          <div className="font-serif text-3xl italic tracking-tighter text-amber-600">Trinity Carter</div>
          <p className="text-outline font-label uppercase tracking-[0.5em] text-[8px] font-bold">PRODUCED BY THE ALPHA COLLECTIVE © 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default TrinityGiveawayPage;
