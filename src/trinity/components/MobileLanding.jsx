import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Reveal } from '../../shared/components/Reveal'
import { WhatAwaitsAfter } from './SectionsBottom'
import { useLocale } from '../../shared/hooks/useLocale'
import LanguageSwitcher from '../../shared/components/LanguageSwitcher'
import { Disclaimer } from '../../shared/components/Disclaimer'

const IMG = {
  hero: '/trinity-hero.webp',
  studio: '/trinity-portrait.webp',
}

function MobileHeader({ menuOpen, setMenuOpen }) {
  const { t } = useLocale();
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-secondary px-4 py-2 text-center text-on-secondary">
        <p className="font-label text-[10px] tracking-[0.2em] uppercase font-bold italic">
          {t.trinity.urgencyBar}
        </p>
      </div>
      <nav className="glass-nav border-b border-white/10 bg-surface/80 shadow-[0_10px_40px_rgba(184,150,12,0.08)] backdrop-blur-xl dark:bg-stone-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <img 
              src="/trinity-logo.png" 
              alt="Trinity Carter" 
              className="h-10 w-auto object-contain dark:invert"
            />
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="trinity" />
            <button
              type="button"
              className="material-symbols-outlined text-3xl text-primary"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

function MobileMenu({ open, onClose }) {
  const { t, language } = useLocale();
  const links = [
    { label: language === 'fr' ? 'Le Portfolio' : 'The Portfolio', href: '#mobile-atelier' },
    { label: language === 'fr' ? 'Carte d\'Évolution' : 'Evolution Map', href: '#mobile-roadmap' },
    { label: language === 'fr' ? 'Inquiries' : 'Inquiries', href: '#mobile-faq' },
    { label: language === 'fr' ? 'Postuler' : 'Apply', href: '#mobile-apply' },
  ]
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[105] bg-background/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex h-full flex-col px-8 pt-32 pb-10">
            <nav className="flex flex-1 flex-col gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  className="font-headline text-2xl text-on-background"
                  initial={{ opacity: 0, x: 12 }} 
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={onClose}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.button
              type="button"
              className="w-full rounded-full bg-primary py-4 font-label text-xs font-bold tracking-widest text-on-primary uppercase shadow-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                onClose()
                document.getElementById('mobile-apply')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {t.trinity.ctaPrimary}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MobileFAQ({ FAQ_ITEMS }) {
  const [open, setOpen] = useState(0)
  const { t, language } = useLocale();

  return (
    <section id="mobile-faq" className="bg-background px-6 py-20">
      <Reveal>
        <h2 className="font-headline mb-12 text-3xl">
          {language === 'fr' ? 'Inquiries' : 'Curated'} <span className="font-serif italic">{language === 'fr' ? 'Sélectionnées' : 'Inquiries'}</span>
        </h2>
      </Reveal>
      <div className="space-y-2">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i
          return (
            <Reveal key={item.q} delay={i * 0.04}>
              <div className="border-b border-outline-variant/30 pb-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <h3 className="font-headline text-lg">{item.q}</h3>
                  <motion.span
                    className="material-symbols-outlined shrink-0 text-primary"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    add
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      className="mt-3 text-sm text-on-surface-variant"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

export default function MobileLanding({ onEnroll }) {
  const { t, currency, language } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  const FAQ_ITEMS = [
    {
      q: language === 'fr' ? 'Ce DÉFI est-il vraiment gratuit ?' : 'Is this CHALLENGE really free?',
      a: language === 'fr' ? 'Oui, à 100%. Nous offrons une formation de classe mondiale gratuitement pour établir la confiance avant que vous ne dépensiez un centime.' : 'Yes, 100%. We provide world-class training at no cost to build trust and show you the power of our methods before you ever spend a cent.',
    },
    {
      q: language === 'fr' ? 'De combien de temps ai-je besoin chaque jour ?' : 'How much time do I need daily?',
      a: language === 'fr' ? 'Environ 30-45 minutes. Les leçons sont conçues pour des professionnelles occupées qui exigent une rentabilité maximale en un minimum de temps.' : 'Around 30-45 minutes. The lessons are designed for busy professionals who need high ROI in minimal time.',
    },
    {
      q: language === 'fr' ? 'Ai-je déjà besoin d\'une entreprise ?' : 'Do I need a business already?',
      a: language === 'fr' ? 'Non. Ce défi est spécifiquement conçu pour vous aider à en construire une à partir de zéro en utilisant votre expertise existante.' : 'No. This challenge is specifically designed to help you build one from scratch using your existing expertise.',
    },
    {
      q: language === 'fr' ? 'Et si je ne suis pas "Tech-Savvy" ?' : 'What if I\'m not "Tech-Savvy"?',
      a: language === 'fr' ? 'Nous évitons le jargon complexe et les outils coûteux. Si vous savez utiliser un email et les réseaux sociaux, vous pouvez utiliser nos systèmes.' : 'We avoid complex jargon and expensive tools. If you can use email and social media, you can use our systems.',
    },
    {
      q: language === 'fr' ? 'Cela fonctionnera-t-il pour ma niche spécifique ?' : 'Will this work for my specific niche?',
      a: language === 'fr' ? 'Oui. Que vous soyez consultante, coach, artiste ou professionnelle en entreprise, les principes de positionnement sont universels.' : 'Yes. Whether you are a consultant, coach, artist, or corporate professional, the principles of positioning are universal.',
    },
    {
      q: language === 'fr' ? 'Quand est-ce que je commence ?' : 'When do I start?',
      a: language === 'fr' ? 'Immédiatement après l\'inscription, vous recevrez les documents du Jour 1 dans votre boîte de réception.' : 'Immediately after signing up, you will receive the Day 1 materials in your inbox.',
    },
    {
      q: language === 'fr' ? 'Y a-t-il un piège ?' : 'Is there a catch?',
      a: language === 'fr' ? 'Le seul "piège" est que vous devez faire le travail. Nous fournissons la carte, mais vous devez faire les pas.' : 'The only "catch" is that you have to do the work. We provide the map, but you must take the steps.',
    },
    {
      q: language === 'fr' ? 'Que se passe-t-il après les 5 jours ?' : 'What happens after the 5 days?',
      a: language === 'fr' ? 'Vous aurez un business plan complet prêt pour le lancement. Vous pouvez choisir de l\'exécuter seule ou de rejoindre notre mentorat avancé.' : 'You will have a complete launch-ready business plan. You can choose to execute alone or join our advanced mentorship.',
    },
  ]

  const ROADMAP = [
    {
      step: '01',
      title: language === 'fr' ? 'Votre Blueprint d\'Identité Digitale' : 'Your Digital Identity Blueprint',
      body: language === 'fr' ? 'Découvrir les blocages cachés et définir votre récit d\'autorité unique.' : 'Uncovering the hidden blockers and defining your unique authority narrative.',
    },
    {
      step: '02',
      title: language === 'fr' ? 'Votre Première Offre Monétisable' : 'Your First Monetizable Offer',
      body: language === 'fr' ? 'Définir votre "bord d\'autorité" unique et créer une offre que les gens veulent vraiment.' : 'Defining your unique "authority edge" and crafting an offer people actually want.',
    },
    {
      step: '03',
      title: language === 'fr' ? 'Le Moteur de Contenu en 3 Parties' : 'The 3-Part Content Engine',
      body: language === 'fr' ? 'Créer une présence numérique et un cadre de contenu qui crient "Expert".' : 'Crafting a digital presence and content framework that screams "Expert".',
    },
    {
      step: '04',
      title: language === 'fr' ? 'Votre Système de Leads Automatisé' : 'Your Automated Lead System',
      body: language === 'fr' ? 'Mettre en place le cadre éditorial qui convertit les inconnus en clients à ticket élevé.' : 'Setting up the editorial framework that converts strangers into high-ticket clients.',
    },
    {
      step: '05',
      title: language === 'fr' ? 'Votre Business Plan Prêt pour le Lancement' : 'Your Launch-Ready Business Plan',
      body: language === 'fr' ? 'Finaliser votre écosystème automatisé pour une croissance durable et à six chiffres.' : 'Finalizing your automated ecosystem for sustainable, six-figure growth.',
    },
  ]

  return (
    <>
      <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="min-h-[max(884px,100dvh)] pt-[7.25rem] pb-28 selection:bg-secondary-fixed selection:text-on-secondary-fixed">
        <section className="flex flex-col gap-8 px-6 py-16">
          <motion.div
            className="flex flex-col items-center text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 border border-primary/20">
              <span className="font-label text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                {language === 'fr' ? 'POUR LES FEMMES AMBITIEUSES PRÊTES À BÂTIR UNE VRAIE RICHESSE EN LIGNE' : 'FOR AMBITIOUS WOMEN READY TO BUILD REAL WEALTH ONLINE'}
              </span>
            </div>
            <h1 className="font-headline text-4xl leading-[1.1] tracking-tight text-shadow-gold text-on-background">
              {t.trinity.heroTitle}
            </h1>
            <div className="text-base font-normal leading-relaxed text-on-surface-variant">
              {t.trinity.heroSubtitle}
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <span className="font-['Oswald'] text-[10px] text-outline uppercase tracking-[0.2em] font-bold">{language === 'fr' ? 'VALEUR TOTALE DU DÉFI' : 'TOTAL CHALLENGE VALUE'}: {currency}599+</span>
              <button
                onClick={onEnroll}
                className="w-full rounded-full bg-primary px-8 py-5 text-center text-sm font-semibold tracking-widest text-on-primary uppercase shadow-lg transition-all duration-500 hover:scale-[1.02]"
              >
                {t.trinity.ctaPrimary}
              </button>
              <span className="font-['Oswald'] text-[12px] text-primary uppercase tracking-[0.3em] font-bold mt-2 italic shadow-sm">
                {language === 'fr' ? 'INVESTISSEMENT' : 'INVESTMENT'}: {currency}0.00 / {language === 'fr' ? 'TOTALEMENT GRATUIT' : 'COMPLETELY FREE'}
              </span>
            </div>
          </motion.div>

          <div className="relative mt-4">
            <motion.div
              className="aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                alt="Trinity Carter portrait"
                className="h-full w-full object-cover"
                src={IMG.hero}
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>
            <div className="absolute -right-4 -bottom-6 max-w-[200px] rounded-2xl bg-surface-container-lowest p-6 shadow-xl border border-primary/10">
              <p className="font-serif text-2xl text-primary italic">12k+</p>
              <p className="text-[10px] leading-tight font-bold tracking-widest text-on-surface-variant uppercase">
                {language === 'fr' ? 'Étudiantes Alumni à travers le monde' : 'Alumni Students Worldwide'}
              </p>
            </div>
          </div>

          {/* The Voice - Mobile Integration */}
          <section className="mt-12 space-y-8 bg-surface-container-lowest p-10 rounded-3xl border border-primary/5">
            <Reveal>
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary font-bold italic block mb-4">
                {language === 'fr' ? 'SA PHILOSOPHIE' : 'HER PHILOSOPHY'}
              </span>
              <h2 className="font-headline text-3xl leading-tight text-on-background">
                {language === 'fr' ? 'Bâtir une autorité qui dure.' : 'Building Authority that Lasts.'}
              </h2>
              <p className="mt-6 font-serif text-lg leading-relaxed text-stone-500 italic">
                {language === 'fr' 
                  ? '"Le vrai luxe n\'est pas d\'être vue, mais d\'être comprise. Votre marque numérique est votre héritage verbal."' 
                  : '"True luxury is not in being seen, but in being understood. Your digital brand is your verbal legacy."'
                }
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-primary/20" />
                <span className="font-label text-[9px] uppercase tracking-widest text-primary/40 font-bold">TC ORIGINS</span>
                <div className="h-px flex-1 bg-primary/20" />
              </div>
            </Reveal>
          </section>

          <div className="mt-16 overflow-hidden">
            <p className="mb-4 text-center font-label text-[10px] font-bold tracking-[0.2em] text-outline uppercase opacity-40">
              {language === 'fr' ? 'VU DANS :' : 'AS SEEN IN:'}
            </p>
            <div className="relative flex overflow-hidden">
              <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{
                  x: [0, -600],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {[
                  'VOGUE', 'ELLE', 'BAZAAR', 'FORBES', 'VOGUE', 'ELLE', 'BAZAAR', 'FORBES'
                ].map((logo, i) => (
                  <span
                    key={i}
                    className="font-serif text-lg italic tracking-tighter text-on-surface-variant/30"
                  >
                    {logo}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low px-6 py-24">
          <div className="space-y-8 text-center">
            <Reveal>
              <div className="aspect-square overflow-hidden rounded-3xl shadow-xl mx-auto">
                <img
                  alt="Studio interior"
                  className="h-full w-full object-cover"
                  src={IMG.studio}
                  loading="lazy"
                />
              </div>
            </Reveal>
            <div className="space-y-6">
              <Reveal delay={0.05}>
                <h2 className="font-headline text-4xl">
                  {language === 'fr' ? 'À propos du' : 'About the'} <span className="font-serif italic text-primary">{language === 'fr' ? 'Programme' : 'Programme'}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="leading-relaxed text-on-surface-variant font-normal">
                  {language === 'fr' 
                    ? 'L\'éducation traditionnelle se concentre sur les compétences. Nous nous concentrons sur l\'Identité. Ma mission est de balayer la complexité du commerce moderne et de revenir à l\'essentiel : Confiance, Élégance et Autorité.'
                    : 'Traditional education focuses on skills. We focus on Identity. My mission is to strip away the complexity of modern business and return to the core of what makes people buy: Trust, Elegance, and Authority.'
                  }
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="mobile-roadmap" className="bg-background px-6 py-24">
          <Reveal>
            <h2 className="font-headline mb-12 text-center text-3xl">
              {language === 'fr' ? 'Votre Programme de' : 'Your'} <span className="font-serif italic text-primary">{language === 'fr' ? '5 Jours' : '5-Day'}</span> {language === 'fr' ? 'd\'Évolution' : 'Roadmap'}
            </h2>
          </Reveal>
          <div className="relative flex flex-col gap-16">
            <div className="absolute top-4 bottom-4 left-[19px] w-px bg-primary/20" />
            {ROADMAP.map((row, i) => (
              <Reveal key={row.step} delay={i * 0.05}>
                <div className="relative flex items-start gap-6">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary shadow-lg">
                    <span className="text-xs font-bold text-on-primary font-headline italic">{i + 1}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline text-xl">{row.title}</h3>
                    <p className="text-sm text-on-surface-variant font-normal">{row.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="mobile-atelier" className="bg-surface-container-low px-6 py-24">
          <Reveal>
            <h2 className="font-headline mb-12 text-3xl text-center">
              {language === 'fr' ? 'Le Pack' : 'The'} <span className="font-serif italic text-primary">{language === 'fr' ? 'Gratuit' : 'Free'}</span> Bundle
            </h2>
          </Reveal>
          <div className="space-y-4">
            {[
              [`${language === 'fr' ? 'Jour' : 'Day'} 1: ${language === 'fr' ? 'Blueprint d\'Identité Digitale' : 'Digital Identity Blueprint'}`, `${currency}97`],
              [`${language === 'fr' ? 'Jour' : 'Day'} 2: ${language === 'fr' ? 'Stratégie d\'Offre Monétisable' : 'Monetizable Offer Strategy'}`, `${currency}97`],
              [`${language === 'fr' ? 'Jour' : 'Day'} 3: ${language === 'fr' ? 'Cadre de Contenu d\'Autorité' : 'Authority Content Framework'}`, `${currency}97`],
              [`${language === 'fr' ? 'Jour' : 'Day'} 4: ${language === 'fr' ? 'Systèmes de Leads Automatisés' : 'Automated Lead Systems'}`, `${currency}97`],
              [`${language === 'fr' ? 'Jour' : 'Day'} 5: ${language === 'fr' ? 'Business Plan à 6 Chiffres' : '6-Figure Business Plan'}`, `${currency}97`],
              [`${language === 'fr' ? 'Bonus : Playbook d\'Autorité' : 'Bonus: Authority Playbook'} (PDF)`, `${currency}67`],
              [`${language === 'fr' ? 'Bonus : Vault Alumni 12 Mois' : 'Bonus: 12-Month Alumni Vault'}`, `${currency}47`],
            ].map(([line, val], i) => (
              <Reveal key={line} delay={i * 0.04}>
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface-container-lowest p-5 shadow-sm">
                  <div className="flex items-center gap-4 text-left">
                    <span className="material-symbols-outlined text-primary text-lg">verified</span>
                    <span className="text-xs font-bold uppercase tracking-tight">{line}</span>
                  </div>
                  <span className="text-xs font-bold text-primary">{val}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}>
            <div className="mt-12 text-center bg-editorial-gradient p-8 rounded-3xl">
              <p className="font-headline text-5xl text-white">{currency}0.00</p>
              <p className="text-[10px] tracking-widest text-primary-fixed uppercase font-bold mt-2">
                {language === 'fr' ? 'INVESTISSEMENT DANS VOTRE HÉRITAGE / GRATUIT' : 'INVESTMENT IN LEGACY / FREE'}
              </p>
              <motion.button
                onClick={onEnroll}
                className="mt-6 w-full bg-white text-black py-4 rounded-xl font-bold tracking-widest uppercase italic shadow-xl"
                whileTap={{ scale: 0.98 }}
              >
                {t.trinity.ctaPrimary}
              </motion.button>
            </div>
          </Reveal>
        </section>

        <WhatAwaitsAfter onEnroll={onEnroll} />

        <MobileFAQ FAQ_ITEMS={FAQ_ITEMS} />

        <section
          id="mobile-apply"
          className="bg-stone-950 px-6 py-24 text-center text-surface"
        >
          <Reveal>
            <div className="flex flex-col items-center mb-8">
              <img 
                src="/trinity-logo.png" 
                alt="Trinity Carter" 
                className="h-16 w-auto object-contain grayscale invert opacity-90"
              />
            </div>
            <h2 className="font-headline mb-6 text-4xl text-white">
              {language === 'fr' ? 'Prête à' : 'Ready to'} <span className="font-serif text-primary italic">{language === 'fr' ? 'S\'Enflammer' : 'Ignite'}</span>?
            </h2>
            <p className="mb-10 text-lg font-light text-white/60">
              {language === 'fr' 
                ? 'Rejoignez plus de 12,000 femmes qui ont décidé de commencer aujourd\'hui et de réécrire leur futur digital.'
                : 'Join 12,000+ women who decided to start today and rewrite their digital future.'
              }
            </p>
            <div className="space-y-4">
              <motion.button
                onClick={onEnroll}
                className="w-full rounded-2xl bg-primary py-6 text-sm font-bold tracking-widest text-on-primary uppercase shadow-2xl italic"
                whileTap={{ scale: 0.98 }}
              >
                {t.trinity.ctaPrimary}
              </motion.button>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">
                🔒 {language === 'fr' ? 'AUCUNE CARTE DE CRÉDIT REQUISE' : 'NO CREDIT CARD REQUIRED'}
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <Disclaimer />
<footer className="mt-0 w-full bg-stone-950 px-8 py-16 text-stone-400/90 sm:px-12 border-t border-white/5">
        <div className="flex flex-col items-center space-y-12">
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold tracking-widest uppercase">
            <a className="hover:text-amber-500" href="/trinity/giveaway" aria-label="Enter Giveaway">{language === 'fr' ? 'Cadeau' : 'Giveaway'}</a>
            <a className="hover:text-amber-500" href="/trinity/feedback" aria-label="Submit Private Feedback">{language === 'fr' ? 'Avis' : 'Feedback'}</a>
            <a href="#">{language === 'fr' ? 'Confidentialité' : 'Privacy'}</a>
            <a href="#">{language === 'fr' ? 'Conditions' : 'Terms'}</a>
          </div>
          <div className="text-center">
            <p className="text-[10px] leading-loose tracking-widest uppercase opacity-40">
              © 2026 Trinity Carter.
            </p>
          </div>
        </div>
      </footer>

      <div className="fixed right-0 bottom-0 left-0 z-[100] p-4 md:hidden">
        <motion.div
          className="flex items-center justify-between rounded-full border border-amber-600/20 bg-stone-950/90 p-2 shadow-2xl backdrop-blur-2xl"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="pl-6">
            <p className="font-label text-[8px] tracking-widest uppercase text-amber-600/60 font-bold italic text-left">
              {language === 'fr' ? 'Défi Héritage' : 'Legacy Challenge'}
            </p>
            <p className="font-serif text-xs text-white italic text-left">{language === 'fr' ? 'Investissez' : 'Invest'} {currency}0.00 {language === 'fr' ? 'Aujourd\'hui' : 'Today'}</p>
          </div>
          <motion.button
            onClick={onEnroll}
            className="rounded-full bg-amber-600 px-8 py-4 text-[10px] font-bold tracking-[0.2em] text-black uppercase shadow-lg italic"
            whileTap={{ scale: 0.97 }}
          >
            {language === 'fr' ? 'S\'INSCRIRE' : 'START FREE'}
          </motion.button>
        </motion.div>
      </div>
    </>
  )
}
