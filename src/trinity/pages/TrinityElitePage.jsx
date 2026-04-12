import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLocale } from '../../shared/hooks/useLocale'
import { Disclaimer } from '../../shared/components/Disclaimer'
import MobileLanding from '../components/MobileLanding.jsx'

import {
  AboutProgramme,
  ChallengeRoadmap,
  CredibilityStats,
  Hero,
  Navbar,
  PainPoints,
  UrgencyBar,
} from '../components/SectionsTop'

import {
  ExitModal,
  FAQ,
  FinalCTA,
  Footer,
  Guarantee,
  WhatAwaitsAfter,
  SocialProof,
  ThreePillars,
  ValueStack,
  TrinityEnrollPopup,
} from '../components/SectionsBottom'

const PageLoader = () => (
  <div className="fixed inset-0 bg-[#080808] flex flex-col items-center pt-[180px] z-[500]">
    <div className="w-full h-[48px] bg-amber-600/10 fixed top-0" />
    <div className="w-4/5 max-w-[600px] h-16 bg-white/5 rounded-lg mb-6 animate-pulse" />
    <div className="w-3/5 max-w-[400px] h-6 bg-white/5 rounded-lg mb-12 animate-pulse" />
    <div className="w-8 h-8 border-2 border-white/20 border-t-amber-600 rounded-full animate-spin" />
  </div>
);

const GiveawayFloatingBadge = ({ t, language }) => (
  <Link to={language === 'fr' ? '/giveaway/fr' : '/giveaway/uk'}>
    <motion.div 
      initial={{ x: 100 }} animate={{ x: 0 }}
      className="fixed top-1/2 -translate-y-1/2 right-0 z-[101] bg-[#0F0F0F] border-y border-l border-amber-600/30 p-4 pr-5 flex items-center gap-4 cursor-pointer hover:bg-[#1A1A1A] transition-all group shadow-2xl hidden md:flex"
    >
      <div className="absolute top-0 right-0 bottom-0 w-1 bg-amber-600 opacity-30 group-hover:opacity-100 transition-opacity" />
      <span className="text-2xl text-amber-600">🎁</span>
      <div className="font-label text-[10px] uppercase tracking-widest text-[#F5F5F5] leading-tight italic">
        {t.trinity.giveawayBadge.line1} <br/>
        <span className="text-amber-600 font-bold">{t.trinity.giveawayBadge.line2}</span>
      </div>
    </motion.div>
  </Link>
);

const FloatingNavigator = ({ t }) => {
  const [activeSection, setActiveSection] = useState('challenge');

  useEffect(() => {
    const sections = ['challenge-section', 'programme-section'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id === 'challenge-section' ? 'challenge' : 'programme');
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-stone-900/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center">
      <button 
        onClick={() => document.getElementById('challenge-section')?.scrollIntoView({ behavior: 'smooth' })}
        className={`px-8 py-3 rounded-full font-label text-[10px] uppercase tracking-[0.2em] transition-all italic whitespace-nowrap ${activeSection === 'challenge' ? 'bg-amber-600 text-black font-bold shadow-lg' : 'text-stone-400 hover:text-white'}`}
      >
        {t.trinity.nav.challenge}
      </button>
      <button 
        onClick={() => document.getElementById('programme-section')?.scrollIntoView({ behavior: 'smooth' })}
        className={`px-8 py-3 rounded-full font-label text-[10px] uppercase tracking-[0.2em] transition-all italic whitespace-nowrap ${activeSection === 'programme' ? 'bg-amber-600 text-black font-bold shadow-lg' : 'text-stone-400 hover:text-white'}`}
      >
        {t.trinity.nav.programme}
      </button>
    </div>
  );
};

export default function TrinityElitePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, language, loading } = useLocale()
  const [exitOpen, setExitOpen] = useState(false)
  const [isEnrollOpen, setIsEnrollOpen] = useState(false)

  useEffect(() => {
    document.title = t.trinity.hero.title
  }, [t.trinity.hero.title])

  if (loading) return <PageLoader />;

  return (
    <>
      <div className="mobile-landing md:hidden">
        <MobileLanding onEnroll={() => setIsEnrollOpen(true)} />
      </div>

      <div className="hidden bg-surface font-body text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed md:block">
        <div className="transform-gpu">
          <UrgencyBar />
          <Navbar onEnroll={() => setIsEnrollOpen(true)} />
        </div>
        <FloatingNavigator t={t} />
        <GiveawayFloatingBadge t={t} language={language} />
        
        <main className="contain-layout">
          <div id="challenge-section">
            <Hero onEnroll={() => setIsEnrollOpen(true)} />
            <CredibilityStats />
            <ChallengeRoadmap onEnroll={() => setIsEnrollOpen(true)} />
          </div>
          <PainPoints />
          <AboutProgramme />
          <ThreePillars />
          <SocialProof />
          <ValueStack onEnroll={() => setIsEnrollOpen(true)} />
          <WhatAwaitsAfter onEnroll={() => setIsEnrollOpen(true)} />
          <Guarantee />
          <FAQ />
          <FinalCTA onEnroll={() => setIsEnrollOpen(true)} />
        </main>
        
        <Disclaimer />
        
        <Footer />
        
        <motion.button
          type="button"
          className="fixed right-5 bottom-5 z-30 hidden rounded-full bg-primary px-4 py-2.5 font-label text-[10px] tracking-widest text-on-primary uppercase shadow-[0_12px_40px_rgba(114,92,0,0.35)] backdrop-blur-sm sm:right-8 sm:bottom-8 sm:px-5 sm:text-xs md:block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setExitOpen(true)}
        >
          {t.trinity.finalCTA.freePdfBtn || "Free PDF"}
        </motion.button>
      </div>

      <ExitModal open={exitOpen} onClose={() => setExitOpen(false)} />
      <TrinityEnrollPopup open={isEnrollOpen} onClose={() => setIsEnrollOpen(false)} />
    </>
  )
}
