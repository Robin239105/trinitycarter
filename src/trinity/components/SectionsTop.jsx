import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Reveal } from '../../shared/components/Reveal'
import { useCountdown } from '../../shared/hooks/useCountdown'
import dynamicStats from '../../shared/utils/dynamicStats'
import { useLocale } from '../../shared/hooks/useLocale'
import LanguageSwitcher from '../../shared/components/LanguageSwitcher'

const img = {
  hero: '/trinity-hero.webp',
  atelier: '/trinity-portrait.webp',
  proof1:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAAspeSFvjpLpuuXWJf6vj-aoYDDU30Wk6qnmxcuCTAoPlTmhfcLT-b95Kj9cdiZsQwq3jvPi0tXuQUHgpV63oj8qYdE0TfaezHKNcKKOnC0y9af5bbpgaLc45hn8BVXW0P4usVnAaE3O4Gq-hQyCe6b4djKp7yvhFR8Isgw2vBjg5wInsbj6_IqvIkX5YAxzBt4Jhs9g9hJ4HI0scbubR6S8xmuEMmRJS7Xhlw0aK5k3zsEivUBKyZMzKSMGEUtPaocSCZGJXZG2Xd',
  proof2:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC7XYNofKP-Mi7izJvRkWjsj6XrbU0_tZAlOlgXCybDbWFxw--IluoWizJmjY_eeoHfnn20Mg8EpnvVMxFp8jY5GEpR3bMPMLp0rzYhcGM5eIArnI3SGjPvT3aYkE2pwIVmqRv1pnLIHjPC7J69gAp8usqnaUywR5cRM1wPuvB5daKQpVu5rsAqTxkcV32jx8DFfTV-ELg4iRbxmj6T80pAeYnBrLrnq5qa3PcusRvrwjm3p9ZHxFEIWQ1gwbpy4JmGZD-XM-nFAqza',
  proof3:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBbrgZd1wA5CIeG_G281Ob-j2VQB9iNQ94Z96PS0GmXJuk_G9e_Mkc2wYcDvrizMkvv1DOBOqrmIdqqPMbND2gefgjNrEOKjmfzR8lAHPe_gGOd2QsckuaXBAJIP1OkdQA-foBh0ab28bARg1YyDdwGEy2heztBYGwMOjdqtUW5JqEM9BUriFeU7TLUNqp30v4_hWxQ4_4Ath7tvIKjcCaPMDrR72tWPK_uyUJhOxgznaB7-jKiIVkssEhiWQQYfKN4ZbSoWSezc5iQ',
}

// Moved inside Navbar to support localization

export function UrgencyBar() {
  const { t, language } = useLocale();
  const countdown = useCountdown();
  return (
    <motion.aside
      className="bg-editorial-gradient text-on-tertiary relative overflow-hidden py-3 px-4"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 text-sm font-label tracking-widest uppercase">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-fixed-dim opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-fixed" />
        </span>
        <span className="font-bold">
          {t.trinity.urgencyBar}
        </span>
        <span className="hidden opacity-60 md:inline">|</span>
        <span className="hidden md:inline">{language === 'fr' ? 'L\'inscription se termine dans' : 'Registration closes in'} {countdown}</span>
      </div>
      {/* Scroll Trigger Sentinel */}
      <div id="trinity-top-sentinel" className="absolute bottom-0 left-0 h-px w-px pointer-events-none opacity-0" />
    </motion.aside>
  )
}

export function Navbar({ onEnroll }) {
  const { t, language, loading } = useLocale();
  const navItems = [
    { label: language === 'fr' ? 'La Méthode' : 'The Method', href: '#method' },
    { label: language === 'fr' ? 'Portfolio' : 'Portfolio', href: '#alumni' },
    { label: language === 'fr' ? 'Consultations' : 'Consultations', href: '#value' },
    { label: 'Journal', href: '#faq' },
  ];
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sentinel = document.getElementById('trinity-top-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.nav
      className="fixed left-0 top-12 z-50 w-full px-4 sm:px-8 transform-gpu"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full bg-surface/98 backdrop-blur-xl transition-[box-shadow,transform,background-color] duration-500 ease-out md:px-8 md:py-4 ${
          scrolled
            ? 'shadow-[0_18px_55px_rgba(184,150,12,0.14)] bg-white'
            : 'shadow-[0_10px_40px_rgba(184,150,12,0.08)]'
        }`}
      >
        <motion.div 
          className="flex items-center cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img 
            src="/trinity-logo.png" 
            alt="Trinity Carter" 
            className="h-20 w-auto object-contain md:h-32"
          />
        </motion.div>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              className={`font-serif text-lg italic tracking-tight transition-colors duration-500 ${
                i === 0
                  ? 'border-b-2 border-amber-600 pb-1 text-amber-700'
                  : 'text-stone-600 hover:text-amber-600'
              }`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitcher variant="trinity" />
          <button
            className="rounded-full bg-secondary px-8 py-3 font-bold tracking-widest text-on-secondary shadow-lg transition-transform active:scale-95 uppercase italic"
            onClick={onEnroll}
          >
            {t.trinity.navJoinBtn}
          </button>
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
        >
          <motion.div
            className="h-0.5 w-6 bg-stone-900"
            animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
          />
          <motion.div
            className="h-0.5 w-6 bg-stone-900"
            animate={{ opacity: open ? 0 : 1 }}
          />
          <motion.div
            className="h-0.5 w-6 bg-stone-900"
            animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
           <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="md:hidden bg-surface mt-4 rounded-3xl p-8 shadow-xl border border-primary/10 overflow-hidden"
           >
             <div className="flex flex-col gap-6">
               {navItems.map((item) => (
                 <a
                   key={item.href}
                   href={item.href}
                   className="font-serif text-2xl italic text-stone-900"
                   onClick={() => setOpen(false)}
                 >
                   {item.label}
                 </a>
               ))}
               <LanguageSwitcher variant="trinity" />
               <button
                 className="w-full rounded-2xl bg-secondary py-5 font-bold tracking-widest text-on-secondary shadow-lg uppercase italic"
                 onClick={() => {
                   onEnroll();
                   setOpen(false);
                 }}
               >
                 {t.trinity.navJoinBtn}
               </button>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export function Hero({ onEnroll }) {
  const { t, currency, language, loading } = useLocale();
  return (
    <header className="px-4 pb-32 pt-48 sm:px-8 md:pt-60 md:pb-48 contain-layout contain-paint">

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-10">
          <motion.div
            className="flex flex-col gap-4 items-center lg:items-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 border border-primary/20">
              <span className="font-label text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                {language === 'fr' ? 'POUR LES FEMMES AMBITIEUSES PRÊTES À BÂTIR UNE VRAIE RICHESSE EN LIGNE' : 'FOR AMBITIOUS WOMEN READY TO BUILD REAL WEALTH ONLINE'}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary-fixed px-4 py-1.5 text-xs font-bold tracking-widest text-on-secondary-fixed uppercase self-center lg:self-start">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              {language === 'fr' ? 'Maîtrise Exclusive en 5 Jours' : 'Exclusive 5-Day Mastery'}
            </div>
          </motion.div>

          <motion.h1
            className="font-headline font-medium text-6xl leading-[1] tracking-tight text-on-background sm:text-8xl md:text-[110px] w-full"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          >
            {t.trinity.hero.title}
          </motion.h1>

          <motion.div
            className="max-w-lg text-lg font-normal leading-relaxed text-on-surface-variant sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
          >
            {t.trinity.hero.subtitle}
          </motion.div>

          <div className="flex flex-col items-center lg:items-start gap-4 mt-4 w-full">
            <span className="font-['Oswald'] text-[10px] text-outline uppercase tracking-[0.2em] font-bold">{language === 'fr' ? 'VALEUR TOTALE DU DÉFI' : 'TOTAL CHALLENGE VALUE'}: {currency}599+</span>
            <motion.button
              type="button"
              onClick={onEnroll}
              className="w-full sm:w-auto px-12 py-6 rounded-xl bg-secondary font-bold tracking-widest text-on-secondary shadow-2xl transition-all hover:scale-[1.02] uppercase italic"
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 }}
            >
              {t.trinity.ctaPrimary}
            </motion.button>
            <span className="font-['Oswald'] text-[12px] text-primary uppercase tracking-[0.3em] font-bold mt-2 italic shadow-sm">
              {language === 'fr' ? 'INVESTISSEMENT' : 'INVESTMENT'}: {currency}0.00 / {language === 'fr' ? 'TOTALEMENT GRATUIT' : 'COMPLETELY FREE'}
            </span>
          </div>

          <motion.div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8 border-t border-primary/10 mt-4 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.55 }}
          >
            <div className="flex -space-x-3">
              <img
                className="h-10 w-10 rounded-full border-2 border-surface object-cover"
                alt="Member portrait"
                src={img.proof1}
                loading="lazy"
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-surface object-cover"
                alt="Member portrait"
                src={img.proof2}
                loading="lazy"
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-surface object-cover"
                alt="Member portrait"
                src={img.proof3}
                loading="lazy"
              />
            </div>
            <div className="text-[10px] font-bold tracking-[0.1em] text-on-surface-variant uppercase text-center lg:text-left">
              ★★★★★ 4.9/5 | 983 Courses | 47 Categories | 43 Countries
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            <motion.div
              className="rotate-1 overflow-hidden rounded-t-[10rem] rounded-b-3xl shadow-2xl"
              whileHover={{ rotate: 0.5, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              <img
                alt="Trinity Carter"
                className="h-[520px] w-full object-cover sm:h-[620px] md:h-[700px]"
                src={img.hero}
                width="600"
                height="800"
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>
            <div className="animate-bounce-slow absolute -bottom-10 -left-4 max-w-[200px] -rotate-3 rounded-3xl bg-surface-container-lowest p-6 shadow-xl sm:-left-10">
              <span
                className="material-symbols-outlined mb-2 text-4xl text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
              <p className="text-xs leading-tight font-bold tracking-tighter uppercase">
                Voted #1 Mentorship Program 2024
              </p>
            </div>
          </motion.div>

          {/* Logo Carousel - Now outside the relative div to prevent overlap */}
          <div className="mt-24 overflow-hidden px-4 md:px-0">
            <p className="mb-6 font-label text-[10px] font-bold tracking-[0.2em] text-outline uppercase opacity-60">
              {language === 'fr' ? 'VU DANS :' : 'AS SEEN IN:'}
            </p>
            <div className="relative flex overflow-hidden">
              <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={{
                  x: [0, -1000],
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {[
                  'VOGUE',
                  'ELLE',
                  'BAZAAR',
                  'FORBES',
                  'COSMOPOLITAN',
                  'GLAMOUR',
                  'MARIE CLAIRE',
                  'VOGUE',
                  'ELLE',
                  'BAZAAR',
                  'FORBES',
                  'COSMOPOLITAN',
                  'GLAMOUR',
                  'MARIE CLAIRE',
                ].map((logo, i) => (
                  <span
                    key={i}
                    className="font-serif text-xl italic tracking-tighter text-on-surface-variant/40"
                  >
                    {logo}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export function CredibilityStats() {
  const { t } = useLocale();
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <Reveal>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-4 text-center sm:px-8 lg:grid-cols-4 lg:gap-8">
          {[
            { n: '983', l: t.trinity.stats?.courses || 'Premium Courses' },
            { n: '47', l: t.trinity.stats?.categories || 'Niche Categories' },
            { n: '12k+', l: t.trinity.stats?.students || 'Alumni Students' },
            { n: '4.9/5', l: t.trinity.stats?.rating || 'Global Rating' },
          ].map((item, i) => (
            <motion.div
              key={item.l}
              className="relative flex flex-col items-center justify-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {i !== 0 && (
                <div className="absolute -left-4 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-primary/10 lg:block" />
              )}
              <h3 className="font-headline text-4xl text-primary sm:text-5xl lg:text-6xl">
                {item.n}
              </h3>
              <p className="font-label text-[10px] font-bold tracking-[0.3em] text-outline-variant uppercase">
                {item.l}
              </p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export function PainPoints() {
  const { t } = useLocale();
  const cards = [
    {
      emoji: '🤫',
      title: t.trinity.painPoints?.item1Title || 'The Noise',
      body: t.trinity.painPoints?.item1Body || 'Feeling like a drop in the ocean, struggling to get your message heard above the digital chaos.',
    },
    {
      emoji: '⏳',
      title: t.trinity.painPoints?.item2Title || 'Stagnant Growth',
      body: t.trinity.painPoints?.item2Body || 'Working 60-hour weeks in a job you hate while your bank account stays frozen.',
    },
    {
      emoji: '🥀',
      title: t.trinity.painPoints?.item3Title || 'Invisible Impact',
      body: t.trinity.painPoints?.item3Body || 'Having world-class expertise but watching people with half your skill dominate the market.',
    },
  ]
  return (
    <section className="px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="rounded-t-3xl bg-secondary p-4 text-center text-sm font-bold tracking-widest text-on-secondary uppercase">
            {t.trinity.painPoints?.shockStat || '⚠️ SHOCK STATISTIC: 97% of expert-led businesses fail due to poor positioning, not poor skill.'}
          </div>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <motion.div
                className="rounded-3xl border-2 border-primary/5 bg-surface-container-lowest p-10 transition-transform duration-500 hover:-translate-y-2"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-fixed text-2xl shadow-sm">
                  {c.emoji}
                </div>
                <h3 className="font-headline mb-4 text-2xl">{c.title}</h3>
                <p className="leading-relaxed text-on-surface-variant">{c.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <div className="mt-16 text-center">
            <p className="font-serif text-2xl text-primary italic">
              {t.trinity.painPoints?.quote || '&quot;It&apos;s not that you&apos;re not good enough. It&apos;s that you&apos;re not positioned enough.&quot;'}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function AboutProgramme() {
  const { t } = useLocale();
  return (
    <section
      id="method"
      className="bg-surface-container px-4 py-24 sm:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2 md:gap-24">
        <Reveal className="relative order-2 md:order-1">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-surface shadow-2xl">
            <img
              alt="Trinity Carter Persona"
              className="h-full w-full object-cover transition-all duration-1000"
              src={img.atelier}
              loading="lazy"
            />
          </div>
          <div className="absolute -right-12 -bottom-12 hidden aspect-square w-2/3 rounded-3xl bg-surface-container-lowest p-8 shadow-xl md:block">
            <h3 className="font-headline mb-4 text-3xl italic">{t.trinity.about?.methodTitle || 'The Method'}</h3>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
              {t.trinity.about?.methodDesc || 'A blend of psychology, high-end branding, and strategic market positioning tailored for the modern woman.'}
            </p>
            <div className="font-serif text-2xl text-primary">Trinity Carter</div>
          </div>
        </Reveal>
        <div className="order-1 space-y-8 md:order-2">
          <Reveal>
            <h2 className="font-headline text-4xl leading-tight sm:text-5xl">
              {t.trinity.about?.titlePart1 || 'About the'} <span className="text-primary italic">{t.trinity.about?.titlePart2 || 'Programme'}</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="space-y-6 text-lg font-light text-on-surface-variant">
              <p>
                {t.trinity.about?.desc1 || 'Traditional education focuses on skills. We focus on Identity. My mission is to strip away the complexity of modern business and return to the core of what makes people buy: Trust, Elegance, and Authority.'}
              </p>
              <p>{t.trinity.about?.desc2 || 'This isn\'t a course. It\'s an intervention for your career.'}</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <ul className="space-y-4">
              {[
                'Psychology of Premium Pricing',
                'Visual Identity for Leaders',
                'The "Silent Sales" Funnel',
              ].map((t) => (
                <li key={t} className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function ChallengeRoadmap({ onEnroll }) {
  const { t, currency, language } = useLocale();
  const roadmap = [
    {
      side: 'right',
      title: language === 'fr' ? 'Votre Blueprint d\'Identité Digitale' : 'Your Digital Identity Blueprint',
      desc: language === 'fr' ? 'Découvrir les blocages cachés et définir votre récit d\'autorité unique.' : 'Uncovering the hidden blockers and defining your unique authority narrative.',
    },
    {
      side: 'left',
      title: language === 'fr' ? 'Votre Première Offre Monétisable' : 'Your First Monetizable Offer',
      desc: language === 'fr' ? 'Définir votre "bord d\'autorité" unique et créer une offre que les gens veulent vraiment.' : 'Defining your unique "authority edge" and crafting an offer people actually want.',
    },
    {
      side: 'right',
      title: language === 'fr' ? 'Le Moteur de Contenu en 3 Parties' : 'The 3-Part Content Engine',
      desc: language === 'fr' ? 'Créer une présence numérique et un cadre de contenu qui crient "Expert".' : 'Crafting a digital presence and content framework that screams "Expert".',
    },
    {
      side: 'left',
      title: language === 'fr' ? 'Votre Système de Leads Automatisé' : 'Your Automated Lead System',
      desc: language === 'fr' ? 'Mettre en place le cadre éditorial qui convertit les inconnus en clients à ticket élevé.' : 'Setting up the editorial framework that converts strangers into high-ticket clients.',
    },
    {
      side: 'right',
      title: language === 'fr' ? 'Votre Business Plan Prêt pour le Lancement' : 'Your Launch-Ready Business Plan',
      desc: language === 'fr' ? 'Finaliser votre écosystème automatisé pour une croissance durable et à six chiffres.' : 'Finalizing your automated ecosystem for sustainable, six-figure growth.',
    },
  ]

  return (
    <section id="roadmap" className="px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-16 text-center md:mb-24">
            <h2 className="font-headline mb-4 text-4xl sm:text-5xl">
              {language === 'fr' ? 'Le Programme de 5 Jours' : 'The 5-Day Roadmap'}
            </h2>
            <p className="text-sm tracking-widest text-outline uppercase">
              {language === 'fr' ? 'Étape par étape vers votre percée' : 'Step by step toward your breakthrough'}
            </p>
          </div>
        </Reveal>
        <div className="relative space-y-12">
          <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-primary/20" />
          {roadmap.map((day, i) => (
            <Reveal key={day.title} delay={i * 0.05}>
              <div className="group flex items-center justify-between">
                {day.side === 'right' ? (
                  <>
                    <div className="w-5/12 text-right">
                      <h3 className="font-headline text-2xl">{day.title}</h3>
                      <p className="text-sm text-on-surface-variant">{day.desc}</p>
                    </div>
                    <motion.div
                      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-on-primary shadow-lg"
                      whileHover={{ scale: 1.12 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      {i + 1}
                    </motion.div>
                    <div className="w-5/12" />
                  </>
                ) : (
                  <>
                    <div className="w-5/12" />
                    <motion.div
                      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-on-primary shadow-lg"
                      whileHover={{ scale: 1.12 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      {i + 1}
                    </motion.div>
                    <div className="w-5/12 text-left">
                      <h3 className="font-headline text-2xl">{day.title}</h3>
                      <p className="text-sm text-on-surface-variant">{day.desc}</p>
                    </div>
                  </>
                )}
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.15}>
            <div className="flex justify-center pt-20">
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-primary p-10 text-center text-on-primary shadow-2xl sm:p-12"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className="absolute inset-0 bg-secondary opacity-0 transition-opacity group-hover:opacity-10" />
                <h3 className="font-headline mb-4 text-5xl sm:text-6xl">{currency}0.00</h3>
                <p className="font-label mb-8 text-sm tracking-widest uppercase">
                  {language === 'fr' ? 'Accès Complet 5 Jours (Temps Limité)' : 'Full 5-Day Access (Limited Time)'}
                </p>
                <motion.button
                  type="button"
                  className="rounded-full bg-surface px-6 py-4 md:px-10 md:py-4 font-bold text-on-surface shadow-lg transition-shadow hover:shadow-xl sm:px-12"
                  whileTap={{ scale: 0.98 }}
                  onClick={onEnroll}
                >
                  {t.trinity.ctaPrimary}
                </motion.button>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function TheVoice() {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32 md:py-48">
      {/* Cinematic Background Elements */}
      <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full rounded-full bg-primary blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-6 py-2 border border-primary/20">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-label text-[10px] font-bold tracking-[0.3em] text-primary uppercase">
                  {t.trinity.voice.badge}
                </span>
              </div>

              <h2 className="font-headline text-5xl leading-[1.1] sm:text-7xl lg:text-8xl">
                {t.trinity.voice.title}
              </h2>

              <div className="space-y-8 relative">
                <div className="absolute -left-8 top-0 text-8xl font-serif text-primary/10 select-none">"</div>
                <p className="font-serif text-2xl italic leading-relaxed text-on-surface lg:text-3xl">
                  {t.trinity.voice.quote1}
                </p>
                <p className="font-serif text-2xl italic leading-relaxed text-primary lg:text-3xl">
                  {t.trinity.voice.quote2}
                </p>
                
                <div className="pt-8">
                  <div className="h-px w-24 bg-primary/30 mb-6" />
                  <p className="font-label text-sm font-bold tracking-[0.4em] text-outline uppercase">
                    — {t.trinity.voice.signature}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={0.2}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
               <div className="aspect-[4/5] overflow-hidden rounded-[4rem] rounded-bl-sm bg-surface-container-low shadow-3xl grayscale hover:grayscale-0 transition-all duration-1000">
                <img 
                  src={img.atelier} 
                  alt="Trinity Carter Persona" 
                  className="h-full w-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                />
              </div>
              
              {/* Abstract Floating UI elements for prestige */}
              <div className="absolute -right-8 -top-8 hidden h-32 w-32 rounded-full border border-primary/20 bg-surface/50 backdrop-blur-md lg:flex items-center justify-center">
                 <span className="font-serif text-4xl italic text-primary">TC</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
