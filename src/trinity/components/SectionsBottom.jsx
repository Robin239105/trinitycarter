import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../../shared/components/Reveal'
import { Link } from 'react-router-dom'
import { useLocale } from '../../shared/hooks/useLocale'

const shots = {
  g1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5fAWM94EESB4Rg7YAe9K_ZBZgnIYd01A82jyVh1cbd4MpczPxidxKJYS9PGPnyR2KurxlgrYQnGDJqTv8DS7eceA6QrKwkZDViedhsTnxxWTrD4sl3M8RLBHr8KFou-wsLqr3pnK18b-C68JCC7wth9Ahb931KN0aAUtrt7amuxPvKxQ1JBhr-IlUCK2yAnU6fWMuQDb5wRoaTS7_vU0YAMPUPyOjioewQsBQZqjbkuxGAWuWrSc6kP0dD6movbqiOdlCKGMCln30',
  g2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIDae2tmiH3nZ4bBT5NdkZiCg6t45WL5VC1YVde7Mm--Qw-ODwdCZwj91GrF-CWW8o9m7qR4S2uLP2TEssH99CRltdgcjnQ2TZLMGK82Z-G4xiYxOFWof2Huw7A9JU5GPGkFQMR_XjDfx993Hqgr48NaIuUwlEZkvAwXLtKZ6SypM_QyRfO4D_v2vnOZ071uMdw2dsBZuZtC3P2Dskhuh3lOG1bk1wCyi0KHAKuadp-Yl7pX_qB3sAGv1s9fTPWwrc-45FB3GkCAdp',
  g3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUQjXHFF3vW9_ePpGPs6EwKyi9WXaGlixj3fxtgK2o897rFTEJB06u70ae8jQaJ3wrM1r6BCo63AwJsWjOmsx103QB5NbzyNg_7rlT6FGUvafgPTVVJjykcfNIlYVRPTNw6ifycRmK3Z-rOGoGaJE3aHeDW2YQ54wrC2RUskIeodhviEsEf19Y2YzP2l6rTKeRag9qFKMuzF0iJsZK7SlQSUHf1JRLgSTXppD58sbUxC7DYq0svILjLJtpDIYbfprRF_tnv0SceHZI',
  g4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT04DrKDcUTJLd1jOfB-Zc5X0B-C82FOU4GxXofnur2YTSRoAhN0ZZXKpXLfwdP_xFOSL92_XVgIFlkrBAq4yHWrCOcd4j2l6iWs2s9qxn3GaDoV11tCKagqJvEvB68mbIjP7sFbcDtWsIHyMy48GLVtDAm8kLNjmTVZ4RsT0fKLd1W_tEBSbYSEL7GKhMX8faRMUpqa2blhGwmdNbeYMNRK1o_EN2F8ABA69iwcIDzHW-IXbKVNoUow9eZHaSfiQA7RixiPkNkBQV',
  audio:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC3eoVli8gBG3bM2XNCCooMIbaBHgLel9dQrC6tgPNhumBmn6EupU1aYnGYwWg3ynOgX0jpI0kIHE0BgVE-tgsS39AL-0NLazAlH6wFZwI-0LJevaWMxuyWe4SLlo-BaGYEgT8ZTJW9lx5rCzq_DvDJBlPaCtmSiSd_spVRaYlDEQPeWwdSG4uPtIHkuvbNselZCspEPD9TXgZO1Rw5T4EGiOLObWDtE3rFK1B-nYGSFnxH9Oy70v1KvQJvxh2ytzHpHPoF_foEFzdB',
  book: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDymxTTYgGwFUDEfdHb_kZtIrvmY60cBc4pNzwa2rlGN_QzAn3mut0T6MDyPFMG4Xp0nk_ie3_z4YvILwI-6JOKv2nBYucpN6P5xl_5Q5GSxksr9ZHvk7L3cSOzWyS-GenRcZkQlckOefN3z2sbaZl9CehGaTMemBIVUHtEkQ-c2texcewK8b4yvUJQv5dJG281IV3QNGmC7t_XDn2cbIIgjtW4dqCi2z3sM2WZO02UIbOKTJnjEgCxxSNQFjwUlEQuTFUC1nUKRFSu',
  video:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAnbAMVIW7vE1zudxwnjqpSkJSDb1ZJ_6J2hcA11NJgS6seSeFEcKmtGLL_itiRdiJVWWKxEoWaq42CtO7GrOFrUlGkmZ-ovoxpftZeogzEfpTC2Kja6FKCJlzWLkLL0oepmikf2mFkdPx0VHWwAH0sAQw979jtY-JHFRd-iu5jQxxpbvchOb6AToXgxxKbYUmBUjgMZTUXRJz-PdPbEnDrKqCVc3nuXxn7ZV7i068r0rl9c7vxFlR5d_kibiM4rPCD6SDG-4V3LkIm',
}

const testimonials = [
  {
    initials: 'SM',
    name: 'Sarah M.',
    bg: 'bg-primary',
    text: 'text-on-primary',
    quote:
      '"Within 30 days of the method, I landed my first €10k client. The positioning strategy is pure gold."',
    tag: '€10k+ Milestone',
    tagClass: 'bg-secondary-fixed text-on-secondary-fixed',
  },
  {
    initials: 'EK',
    name: 'Elena K.',
    bg: 'bg-secondary',
    text: 'text-on-secondary',
    quote:
      '"The \'Editorial Visuals\' day changed everything. I finally feel like my digital presence matches my skill level."',
    tag: 'Brand Revamp',
    tagClass: 'bg-primary-fixed text-on-primary-fixed',
  },
  {
    initials: 'JR',
    name: 'Jessica R.',
    bg: 'bg-outline',
    text: 'text-on-primary',
    quote:
      '"Finally, a program that respects my intelligence and doesn\'t use cheesy sales tactics. Highly recommended."',
    tag: 'Waitlist Strategy',
    tagClass: 'bg-secondary-fixed text-on-secondary-fixed',
  },
]

function StarRow() {
  return (
    <div className="flex text-xs text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  )
}

export function ThreePillars() {
  const { t, language } = useLocale();
  const pillars = [
    {
      n: '01',
      title: language === 'fr' ? 'CLARTÉ' : 'CLARITY',
      body: language === 'fr' ? 'Obtenez une clarté totale sur votre positionnement et l\'audience exacte qui paiera pour votre expertise.' : 'Get crystal clear on your positioning and the exact audience that will pay for your expertise.',
      accent: '',
    },
    {
      n: '02',
      title: language === 'fr' ? 'STRUCTURE' : 'STRUCTURE',
      body: language === 'fr' ? 'Construire l\'ossature de votre présence numérique à six chiffres avec des systèmes de qualité éditoriale.' : 'Building the skeleton of your six-figure digital presence with editorial-grade systems.',
      accent: 'border-t-4 border-secondary',
    },
    {
      n: '03',
      title: language === 'fr' ? 'LANCEMENT' : 'LAUNCH',
      body: language === 'fr' ? 'Exécuter vos premières séquences automatisées pour transformer l\'autorité en un revenu durable.' : 'Executing your first automated sequences to turn authority into a sustainable income.',
      accent: '',
    },
  ]
  return (
    <section className="overflow-hidden bg-surface-container-high px-4 py-24 sm:px-8 md:py-48">
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-headline mb-16 text-center text-3xl sm:mb-24 sm:text-4xl">
            {language === 'fr' ? 'La Méthode d\'Ignition NorthStar en 5 Jours™' : 'The NorthStar 5-Day Ignition Method™'}
          </h2>
        </Reveal>
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="relative group">
                <div className="pointer-events-none absolute -top-12 -left-8 select-none font-headline text-9xl text-amber-600/5 transition-colors group-hover:text-amber-600/10">
                  {p.n}
                </div>
                <motion.div
                  className={`relative z-10 rounded-3xl bg-surface-container-lowest p-8 shadow-lg ${p.accent}`}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <h3 className="font-headline mb-4 text-2xl">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {p.body}
                  </p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SocialProof() {
  const { t, language } = useLocale();
  return (
    <section id="alumni" className="px-4 py-24 sm:px-8 md:py-48">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:mb-20 md:flex-row">
            <div>
              <h2 className="font-headline mb-4 text-4xl sm:text-5xl">{language === 'fr' ? 'Vrais Résultats de Vraies Personnes' : 'Real Results From Real People'}</h2>
              <p className="text-lg text-on-surface-variant">
                {language === 'fr' ? 'Impact direct des expertes qui ont choisi de dominer leur marché.' : 'Direct impact from experts who chose to lead their market.'}
              </p>
            </div>
            <div className="flex w-full max-w-md items-center justify-around gap-8 rounded-2xl bg-surface-container p-6 md:w-auto md:justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-[10px] text-outline uppercase">Trustpilot</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-[10px] text-outline uppercase">{language === 'fr' ? 'Recommandation' : 'Recommendation'}</div>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <div className="space-y-6 rounded-3xl bg-surface-container-low p-8">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-bold ${t.bg} ${t.text}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <StarRow />
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant italic">{t.quote}</p>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase ${t.tagClass}`}
                >
                  {t.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { src: shots.g1, label: 'Growth Stats', alt: 'Analytics dashboard' },
            { src: shots.g2, label: 'Inquiries', alt: 'Business notifications' },
            { src: shots.g3, label: 'Curriculum', alt: 'Learning platform' },
            { src: shots.g4, label: 'Client Portals', alt: 'Lifestyle workspace' },
          ].map((item) => (
            <Reveal key={item.label}>
              <div className="group relative aspect-square overflow-hidden rounded-xl bg-surface-container-high">
                <img
                  className="h-full w-full object-cover grayscale opacity-50 transition-all group-hover:opacity-100 group-hover:grayscale-0"
                  alt={item.alt}
                  src={item.src}
                  loading="lazy"
                />
                <span className="absolute bottom-4 left-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                  {language === 'fr' ? (item.label === 'Growth Stats' ? 'Stats de Croissance' : item.label === 'Inquiries' ? 'Demandes' : item.label === 'Curriculum' ? 'Programme' : 'Portail Client') : item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ValueStack({ onEnroll }) {
  const { t, currency, language } = useLocale();
  const items = [
    {
      icon: 'menu_book',
      title: language === 'fr' ? 'Le Playbook d\'Autorité (PDF)' : 'The Authority Playbook (PDF)',
      desc: language === 'fr' ? 'Plus de 200 pages de modèles, de scripts et de stratégie.' : '200+ pages of templates, scripts, and strategy.',
    },
    {
      icon: 'podcasts',
      title: language === 'fr' ? 'Coffre de Mentorat Audio' : 'Audio Mentorship Vault',
      desc: language === 'fr' ? 'Sessions de coaching hébergées en privé pour un apprentissage mobile.' : 'Privately hosted coaching sessions for on-the-go learning.',
    },
    {
      icon: 'groups',
      title: language === 'fr' ? 'Le Collectif Privé' : 'The Private Collective',
      desc: language === 'fr' ? 'Accès direct à un réseau d\'expertes partageant les mêmes idées.' : 'Direct access to a network of like-minded experts.',
    },
    {
      icon: 'terminal',
      title: language === 'fr' ? 'Modèles d\'Automatisation' : 'Automation Templates',
      desc: language === 'fr' ? 'Flux de travail copier-coller pour Notion, Zapier et Email.' : 'Copy-paste workflows for Notion, Zapier, and Email.',
    },
  ]
  return (
    <section
      id="value"
      className="bg-surface-container-lowest px-4 py-24 sm:px-8 md:py-48"
    >
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:gap-20">
        <div>
          <Reveal>
            <h2 className="font-headline mb-10 text-3xl sm:mb-12 sm:text-4xl">
              {language === 'fr' ? 'Voici Tout Ce Que Vous Obtenez — Gratuitement' : 'Here\'s Everything You Get — Free'}
            </h2>
          </Reveal>
          <div className="space-y-8">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.05}>
                <div className="flex gap-6 border-b border-surface-container pb-8">
                  <span className="material-symbols-outlined text-3xl text-primary">
                    {it.icon}
                  </span>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">{it.title}</h3>
                    <p className="text-sm text-on-surface-variant">{it.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="h-fit md:sticky md:top-32">
          <Reveal delay={0.1}>
            <div className="space-y-6 rounded-3xl bg-surface p-8 shadow-xl sm:p-10">
              <h3 className="font-label text-xs tracking-widest text-outline uppercase">
                {language === 'fr' ? 'VALEUR DU DÉFI' : 'Challenge Value'}
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between border-b border-outline/10 pb-2">
                  <span>{language === 'fr' ? 'Jour 1 : Blueprint d\'Identité Digitale' : 'Day 1: Digital Identity Blueprint'}</span>
                  <span className="font-bold">{currency}97</span>
                </li>
                <li className="flex justify-between border-b border-outline/10 pb-2">
                  <span>{language === 'fr' ? 'Jour 2 : Votre Première Offre Monétisable' : 'Day 2: Your First Monetizable Offer'}</span>
                  <span className="font-bold">{currency}97</span>
                </li>
                <li className="flex justify-between border-b border-outline/10 pb-2">
                  <span>{language === 'fr' ? 'Jour 3 : Le Moteur de Contenu en 3 Parties' : 'Day 3: The 3-Part Content Engine'}</span>
                  <span className="font-bold">{currency}97</span>
                </li>
                <li className="flex justify-between border-b border-outline/10 pb-2">
                  <span>{language === 'fr' ? 'Jour 4 : Votre Système de Leads Automatisé' : 'Day 4: Your Automated Lead System'}</span>
                  <span className="font-bold">{currency}97</span>
                </li>
                <li className="flex justify-between border-b border-outline/10 pb-2">
                  <span>{language === 'fr' ? 'Jour 5 : Votre Business Plan Prêt pour le Lancement' : 'Day 5: Your Launch-Ready Business Plan'}</span>
                  <span className="font-bold">{currency}97</span>
                </li>
                <li className="flex justify-between border-b border-outline/10 pb-2">
                  <span>{language === 'fr' ? 'Bonus : Le Playbook d\'Autorité (PDF)' : 'Bonus: The Authority Playbook (PDF)'}</span>
                  <span className="font-bold">{currency}67</span>
                </li>
                <li className="flex justify-between border-b border-outline/10 pb-2">
                  <span>{language === 'fr' ? 'Bonus : Vault Alumni 12 Mois' : 'Bonus: 12-Month Alumni Vault'}</span>
                  <span className="font-bold">{currency}47</span>
                </li>
                <li className="flex justify-between text-amber-700 pt-4">
                  <span className="font-bold uppercase tracking-widest text-[10px]">{language === 'fr' ? 'Votre Investissement Aujourd\'hui' : 'Your Investment Today'}</span>
                  <span className="font-bold">{currency}0.00</span>
                </li>
              </ul>
              <div className="border-t border-outline/20 pt-6">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-headline text-xl">{language === 'fr' ? 'Valeur Totale du Défi' : 'Total Challenge Value'}</span>
                  <span className="text-2xl font-bold text-amber-600">
                    {currency}599+
                  </span>
                </div>
                <div className="rounded-2xl bg-secondary-fixed p-6 text-center">
                  <p className="mb-2 text-xs font-bold uppercase">{language === 'fr' ? 'Votre Prix Aujourd\'hui' : 'Your Price Today'}</p>
                  <p className="font-headline text-4xl text-on-secondary-container sm:text-5xl">
                    {language === 'fr' ? 'TOTALEMENT GRATUIT' : 'COMPLETELY FREE'}
                  </p>
                </div>
                <motion.button
                  type="button"
                  onClick={onEnroll}
                  className="mt-8 w-full rounded-xl bg-primary py-5 font-bold tracking-widest text-on-primary uppercase shadow-lg transition-all hover:bg-primary-container hover:shadow-[0_12px_40px_rgba(114,92,0,0.2)]"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {t.trinity.ctaPrimary}
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function WhatAwaitsAfter({ onEnroll }) {
  const { t, currency, language } = useLocale();
  const categories = t.trinity.programme?.categories || [];
  const unlockStats = t.trinity.programme?.unlockStats || [];

  return (
    <section className="bg-surface px-4 py-24 sm:px-8 md:py-48 border-y border-stone-200/60">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-24">
          <Reveal>
            <span className="font-label uppercase tracking-[0.3em] text-primary text-[12px] font-bold block mb-4 italic">
              {t.trinity.programme?.badge}
            </span>
            <h2 className="font-headline mb-6 text-5xl sm:text-7xl lg:text-8xl text-stone-950 leading-none">
              {t.trinity.programme?.title}
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto font-light italic leading-relaxed">
              {t.trinity.programme?.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Category Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
          {categories.map((x, idx) => (
            <Reveal key={x.t} delay={idx * 0.05}>
              <div className="group flex h-full flex-col bg-surface-container-low p-10 border-l border-stone-200/60 transition-all hover:border-l-primary hover:shadow-xl translate-gpu">
                <div className="text-4xl mb-6">{x.i}</div>
                <h3 className="font-headline mb-2 text-2xl text-stone-900 leading-tight group-hover:text-primary transition-colors">
                  {x.t}
                </h3>
                <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-4 font-bold italic">
                  {x.n}
                </p>
                <p className="mt-auto border-t border-stone-200/40 pt-4 text-xs font-light leading-relaxed text-stone-500 italic">
                  {x.d}
                </p>
              </div>
            </Reveal>
          ))}

          {/* Exclusivity Statement Card */}
          <Reveal delay={0.3}>
            <div className="flex h-full flex-col items-center justify-center bg-stone-950 p-10 text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-6 h-1 w-12 bg-primary relative z-10" />
              <p className="font-serif text-xl leading-relaxed text-white italic relative z-10">
                {t.trinity.programme?.exclusivity}
              </p>
              <div className="mt-8 font-label text-[10px] font-bold uppercase tracking-[0.4em] text-primary/80 relative z-10">
                {t.trinity.programme?.stats}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Format Breakdown Row - Interactive Stats */}
        <Reveal>
          <div className="mb-24 border-y border-stone-200/60 bg-stone-50/50 py-12 px-4 overflow-x-auto no-scrollbar">
            <div className="flex flex-nowrap md:flex-wrap justify-between gap-12 min-w-max md:min-w-0 md:justify-center">
              {unlockStats.map((item, idx) => (
                <motion.div 
                  key={item.l} 
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                >
                  <span className="text-2xl mb-1">{item.i}</span>
                  <span className="font-headline text-2xl text-stone-950 leading-none">{item.t}</span>
                  <span className="font-label text-[9px] uppercase tracking-widest text-stone-400 font-bold">{item.l}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="text-center">
          <Reveal>
            <div className="flex flex-col items-center gap-8">
              <motion.button
                type="button"
                onClick={onEnroll}
                className="w-full max-w-xl rounded-2xl bg-primary py-8 font-bold tracking-[0.2em] text-on-primary shadow-3xl transition-all hover:bg-stone-950 hover:shadow-[0_20px_60px_rgba(114,92,0,0.35)] uppercase italic text-xl"
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
              >
                {t.trinity.ctaPrimary}
              </motion.button>
              <p className="font-label text-[11px] text-stone-400 uppercase tracking-[0.4em] font-bold italic">
                {language === 'fr' ? 'Terminez le défi pour débloquer l\'accès complet' : 'Complete the challenge to unlock full invitation access'}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Guarantee() {
  const { t, language } = useLocale();
  return (
    <section className="border-y border-primary/10 bg-surface-container-high px-4 py-20 sm:px-8">
      <Reveal>
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <div className="relative inline-block">
            <span
              className="material-symbols-outlined text-7xl text-primary sm:text-8xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <div className="absolute -top-2 -right-2 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold text-on-secondary">
              100% FREE
            </div>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl">{language === 'fr' ? 'Notre Promesse envers vous' : 'Our Promise To You'}</h2>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            {language === 'fr' ? 'Je suis si confiante dans la "Méthode Trinity Carter" que je vous offre l\'intégralité du défi de 5 jours gratuitement. Ma seule condition ? Que vous arriviez avec un esprit ouvert et une volonté d\'agir. Si vous ne vous sentez pas plus autonome dès le 3ème jour, vous pouvez repartir avec toutes les ressources que vous avez téléchargées.' : 'I am so confident in the "Trinity Carter Method" that I am giving you the entire 5-day challenge for free. My only requirement? You show up with an open mind and a willingness to act. If you don\'t feel more empowered by Day 3, you can walk away with all the resources you\'ve downloaded.'}
          </p>
        </div>
      </Reveal>
    </section>
  )
}

export function FAQ() {
  const { t, language } = useLocale();
  const categories = t.trinity.faqCategories || {};
  const allFaqs = t.trinity.faq || {};
  const [activeCategory, setActiveCategory] = useState('general');

  const categoryKeys = Object.keys(categories);
  const currentFaqs = allFaqs[activeCategory] || [];

  return (
    <section id="faq" className="px-4 py-24 sm:px-8 md:py-48">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="font-headline mb-12 text-center text-3xl sm:mb-16 sm:text-4xl text-stone-900 leading-tight">
            {language === 'fr' ? 'Des Questions ? Nous avons les réponses.' : 'Got Questions? We Have Answers.'}
          </h2>
        </Reveal>

        {/* Category Selector */}
        <div className="mb-12 flex flex-wrap justify-center gap-2 sm:gap-4">
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`rounded-full px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === key
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {categories[key]}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {currentFaqs.map((f, i) => (
                <details 
                  key={`${activeCategory}-${i}`} 
                  className="group overflow-hidden rounded-2xl bg-surface-container-low border border-stone-200/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-bold text-stone-900 transition-colors group-hover:bg-stone-50">
                    <span className="pr-4">{f.q}</span>
                    <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-amber-600">
                      expand_more
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-sm leading-relaxed text-stone-600 border-t border-stone-100">
                    {f.a}
                  </div>
                </details>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export function FinalCTA({ onEnroll }) {
  const { t, currency, language } = useLocale();
  return (
    <section className="px-4 pb-24 sm:px-8 md:pb-32">
      <Reveal>
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-outline/10 shadow-2xl md:grid-cols-2 md:gap-px">
          <div className="space-y-8 bg-surface-container p-10 sm:p-16">
            <h3 className="font-headline text-2xl text-stone-900/40 sm:text-3xl">
              {t.trinity.paths.pathATitle}
            </h3>
            <p className="font-light text-stone-600/80 italic">
              {t.trinity.paths.pathAContent}
            </p>
            <ul className="space-y-4 text-stone-500/70">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-stone-400">close</span>
                {language === 'fr' ? 'Perdre encore une année à "penser" à commencer.' : 'Waste another year "thinking" about starting.'}
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-stone-400">close</span>
                {language === 'fr' ? 'Concourir sur le prix dans une course vers le bas.' : 'Compete on price in a race to the bottom.'}
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-stone-400">close</span>
                {language === 'fr' ? 'Rester invisible pendant que les autres bâtissent leur richesse.' : 'Stay invisible while others build wealth.'}
              </li>
            </ul>
          </div>
          <motion.div
            className="group relative overflow-hidden bg-editorial-gradient p-10 sm:p-16 flex flex-col items-center text-center md:items-start md:text-left"
            whileHover={{ scale: 1.005 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          >
            <div className="relative z-10 space-y-8 w-full">
              <h3 className="font-headline text-2xl text-white sm:text-3xl">
                {t.trinity.paths.pathBTitle}
              </h3>
              <p className="font-serif text-white/90 italic">
                {t.trinity.paths.pathBContent}
              </p>
              <ul className="space-y-4 text-white/95 inline-block text-left">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-fixed">
                    check
                  </span>
                  {language === 'fr' ? 'Adopter la Méthode d\'Ignition NorthStar.' : 'Adopt the NorthStar Ignition Method.'}
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-fixed">
                    check
                  </span>
                  {language === 'fr' ? 'Commander des tarifs premium de grade d\'autorité.' : 'Command authority-grade premium rates.'}
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-fixed">
                    check
                  </span>
                  {language === 'fr' ? 'Bâtir une marque durable à six chiffres.' : 'Build a sustainable, six-figure brand.'}
                </li>
              </ul>

              <div className="pt-4 flex flex-col items-center md:items-start gap-4">
                <span className="font-['Oswald'] text-[10px] text-white/60 uppercase tracking-[0.2em] font-bold">{language === 'fr' ? 'VALEUR TOTALE DU DÉFI' : 'TOTAL CHALLENGE VALUE'}: {currency}599+</span>
                <motion.button
                  type="button"
                  onClick={onEnroll}
                  className="w-full rounded-xl bg-primary py-6 font-bold tracking-widest text-on-primary shadow-2xl transition-all group-hover:bg-primary-container uppercase italic"
                  whileTap={{ scale: 0.98 }}
                >
                  {t.trinity.ctaPrimary}
                </motion.button>
                <span className="font-['Oswald'] text-[12px] text-primary-fixed uppercase tracking-[0.3em] font-bold mt-2 italic shadow-sm">
                  {language === 'fr' ? 'INVESTISSEMENT' : 'INVESTMENT'}: {currency}0.00 / {language === 'fr' ? 'TOTALEMENT GRATUIT' : 'COMPLETELY FREE'}
                </span>
              </div>
            </div>
            <div className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-primary/20 blur-[120px]" />
          </motion.div>
        </div>
      </Reveal>
    </section>
  )
}

export function Footer() {
  const { t, language } = useLocale();
  return (
    <footer className="mt-16 bg-stone-950 px-6 py-20 text-white/90 sm:px-12 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-16 md:flex-row">
        <div className="max-w-xs space-y-8">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img 
              src="/trinity-logo.png" 
              alt="Trinity Carter" 
              className="h-20 w-auto object-contain md:h-24 grayscale invert opacity-90"
            />
          </motion.div>
          <p className="text-sm leading-relaxed text-stone-400/90 font-light italic">
            {language === 'fr' ? 'Élever les voix féminines grâce au positionnement stratégique et au design éditorial.' : 'Elevating female voices through strategic positioning and editorial design.'}
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 md:grid-cols-3 md:gap-16">
          <div className="space-y-6">
            <h6 className="font-label text-xs tracking-widest text-stone-400 uppercase">
              {language === 'fr' ? 'Programme' : 'Program'}
            </h6>
            <ul className="space-y-3 text-sm">
              <li>
                <a className="transition-colors hover:text-amber-500" href="#method">
                  {language === 'fr' ? 'Méthodologie' : 'Methodology'}
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-amber-500" href="#alumni">
                  {language === 'fr' ? 'Histoires de Succès' : 'Success Stories'}
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-amber-500" href="#value">
                  {language === 'fr' ? 'Tarification' : 'Pricing'}
                </a>
              </li>
              <li className="pt-2">
                <Link className="text-amber-500/80 font-bold hover:text-amber-500" to="/giveaway">
                  {language === 'fr' ? 'Gagnez un iPhone/Laptop →' : 'Win an iPhone/Laptop →'}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h6 className="font-label text-xs tracking-widest text-stone-400 uppercase">
              Company
            </h6>
            <ul className="space-y-3 text-sm">
              <li>
                <a className="transition-colors hover:text-amber-500" href="#">
                  {language === 'fr' ? 'À propos de Trinity' : 'About Trinity'}
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-amber-500" href="#">
                  {language === 'fr' ? 'Espace Presse' : 'Press Kit'}
                </a>
              </li>
              <li>
                <Link className="transition-colors hover:text-amber-500" to="/feedback">
                  {language === 'fr' ? 'Avis Privé' : 'Private Feedback'}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h6 className="font-label text-xs tracking-widest text-stone-400 uppercase">
              Legal
            </h6>
            <ul className="space-y-3 text-sm">
              <li>
                <a className="transition-colors hover:text-amber-500" href="#">
                  {language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-amber-500" href="#">
                  {language === 'fr' ? 'Conditions d\'Utilisation' : 'Terms of Service'}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-10 text-[10px] font-label tracking-widest text-stone-400/80 uppercase sm:mt-24 sm:flex-row sm:pt-12">
        <div>© 2026 Trinity Carter.</div>
        <div className="flex gap-8">
          <a className="transition-colors hover:text-white" href="#">
            Instagram
          </a>
          <a className="transition-colors hover:text-white" href="#">
            LinkedIn
          </a>
          <a className="transition-colors hover:text-white" href="#">
            {language === 'fr' ? 'Newsletter' : 'Newsletter'}
          </a>
        </div>
      </div>
    </footer>
  )
}

export function TrinityEnrollPopup({ open, onClose }) {
  const { t, language } = useLocale();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-stone-950/90 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-[92vw] max-w-lg overflow-hidden rounded-[2.5rem] bg-[#0F0F0F] border border-white/10 shadow-2xl max-h-[88dvh] overflow-y-auto no-scrollbar"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 sm:p-10 text-center space-y-8">
              <div className="font-serif text-3xl italic text-amber-600">Trinity Carter</div>
              
              <div className="space-y-2">
                <h3 className="font-headline text-3xl text-white">{language === 'fr' ? 'RÉSERVEZ VOTRE PLACE.' : 'SECURE YOUR SEAT.'}</h3>
                <p className="text-[#6B6B6B] text-sm uppercase tracking-widest italic">{language === 'fr' ? 'Défi d\'Autorité Gratuit de 5 Jours' : 'Free 5-Day Authority Challenge'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left border-y border-white/5 py-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600 text-lg">verified</span>
                  <span className="text-[10px] text-[#999] uppercase tracking-wider font-bold">{language === 'fr' ? 'ZÉRO SPAM' : 'ZERO SPAM'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600 text-lg">verified</span>
                  <span className="text-[10px] text-[#999] uppercase tracking-wider font-bold">{language === 'fr' ? 'SÉCURISÉ' : 'GDPR SECURE'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600 text-lg">verified</span>
                  <span className="text-[10px] text-[#999] uppercase tracking-wider font-bold">{language === 'fr' ? 'À JOUR' : 'FREE UPDATES'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600 text-lg">verified</span>
                  <span className="text-[10px] text-[#999] uppercase tracking-wider font-bold">{language === 'fr' ? 'SORTIE 1-CLIC' : '1-CLICK EXIT'}</span>
                </div>
              </div>

              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder={language === 'fr' ? 'PRÉNOM' : 'FIRST NAME'}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm focus:border-amber-600 outline-none transition-all uppercase placeholder:text-white/20 italic"
                />
                <input 
                  type="email" 
                  placeholder={language === 'fr' ? 'VOTRE MEILLEUR EMAIL' : 'YOUR BEST EMAIL'}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm focus:border-amber-600 outline-none transition-all uppercase placeholder:text-white/20 italic"
                />
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full bg-amber-600 text-black py-5 rounded-2xl font-bold tracking-widest uppercase italic shadow-xl hover:bg-white transition-all"
                >
                  {t.trinity.ctaPrimary}
                </motion.button>
              </div>

              <p className="text-[10px] text-[#333] uppercase tracking-[0.2em]">🔒 {language === 'fr' ? 'CONNEXION CHIFFRÉE | AUCUNE CARTE DE CRÉDIT REQUISE' : 'ENCRYPTED CONNECTION | NO CREDIT CARD REQUIRED'}</p>
            </div>

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function ExitModal({ open, onClose }) {
  const { t, language } = useLocale();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-stone-950/80 p-6 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-2xl overflow-hidden rounded-[3rem] bg-surface-container-lowest p-10 text-center sm:p-16"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-outline hover:text-on-surface sm:top-8 sm:right-8"
              aria-label="Close"
              onClick={onClose}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="relative z-10 space-y-8">
              <div
                id="exit-modal-title"
                className="font-headline text-3xl text-secondary sm:text-5xl"
              >
                {language === 'fr' ? 'Attendez — avant de partir...' : 'Wait — before you go...'}
              </div>
              <p className="text-lg text-on-surface-variant">
                {language === 'fr' ? 'Le défi est totalement gratuit et se termine bientôt. Ne manquez pas votre chance de bâtir une présence numérique à six chiffres.' : 'The challenge is completely free and closes soon. Don\'t miss your chance to build a six-figure digital presence.'}
              </p>
              <div className="flex flex-col gap-4 md:flex-row">
                <input
                  className="flex-1 rounded-2xl border-none bg-surface-container px-6 py-4"
                  placeholder={language === 'fr' ? 'Votre meilleur email' : 'Your best email'}
                  type="email"
                  autoComplete="email"
                />
                <motion.button
                  type="button"
                  className="rounded-2xl bg-primary px-8 py-4 font-bold text-on-primary"
                  whileTap={{ scale: 0.98 }}
                >
                  {language === 'fr' ? 'Envoyez Ma Copie' : 'Send My Copy'}
                </motion.button>
              </div>
            </div>
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
