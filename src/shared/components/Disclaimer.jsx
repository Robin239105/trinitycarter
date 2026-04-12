import React from 'react';

export const Disclaimer = ({ variant = 'dark' }) => {
  const isTrinity = variant === 'trinity';
  
  return (
    <section className={`py-12 px-8 border-t ${isTrinity ? 'bg-transparent border-stone-200' : 'bg-black/50 border-white/5'}`}>
      <div className="max-w-7xl mx-auto">
        <p className={`text-[10px] md:text-[11px] leading-relaxed text-center font-['Inter'] uppercase tracking-wider max-w-5xl mx-auto ${isTrinity ? 'text-stone-400' : 'text-white/60'}`}>
          DISCLAIMER: This website and the 7-Day Challenge are not part of, affiliated with, or endorsed by Facebook™️, Instagram™️, TikTok™️, Google™️, or any of their subsidiaries. 
          Facebook™️ and Instagram™️ are trademarks of Meta Platforms, Inc. TikTok™️ is a trademark of ByteDance Ltd. Google™️ is a trademark of Google LLC. 
          Results mentioned on this page are individual results and are not guaranteed. The typical result for most people who attempt to build a digital business is little to no income. 
          Building a sustainable online business requires real effort, skills, and sustained commitment over time.
        </p>
      </div>
    </section>
  );
};

export default Disclaimer;
