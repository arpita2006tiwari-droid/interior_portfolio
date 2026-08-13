import React from 'react';

const materials = [
  'Natural Stone', 'Walnut', 'Limewash', 'Brushed Brass', 'Belgian Linen', 'Handcrafted Details'
];

export default function Marquee() {
  return (
    <section className="w-full bg-[var(--color-dark)] text-[#f4efe7] py-6 overflow-hidden flex items-center border-y border-[#333]">
      <div className="flex whitespace-nowrap animate-marquee group cursor-default">
        {/* We duplicate the content to make it infinite */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center shrink-0 group-hover:[animation-play-state:paused]">
            {materials.map((mat, idx) => (
              <React.Fragment key={idx}>
                <span className="text-3xl md:text-5xl font-light mx-8 opacity-80 hover:opacity-100 transition-opacity">
                  {mat}
                </span>
                <span className="text-[var(--color-gold)] text-xl md:text-2xl opacity-60">
                  ✦
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
