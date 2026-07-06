'use client';

const logos = [
  { name: 'Google', abbr: 'G', color: '#4285F4', bg: '#4285F410' },
  { name: 'Meta', abbr: 'M', color: '#0866FF', bg: '#0866FF10' },
  { name: 'Amazon', abbr: 'A', color: '#FF9900', bg: '#FF990010' },
  { name: 'Microsoft', abbr: 'Ms', color: '#00A4EF', bg: '#00A4EF10' },
  { name: 'Apple', abbr: '🍎', color: '#ffffff', bg: '#ffffff10' },
  { name: 'Netflix', abbr: 'N', color: '#E50914', bg: '#E5091410' },
  { name: 'Stripe', abbr: 'S', color: '#635BFF', bg: '#635BFF10' },
  { name: 'Airbnb', abbr: '✦', color: '#FF5A5F', bg: '#FF5A5F10' },
  { name: 'Spotify', abbr: '♫', color: '#1DB954', bg: '#1DB95410' },
  { name: 'LinkedIn', abbr: 'in', color: '#0A66C2', bg: '#0A66C210' },
  { name: 'Uber', abbr: 'U', color: '#000000', bg: '#ffffff08' },
  { name: 'Figma', abbr: 'F', color: '#A259FF', bg: '#A259FF10' },
];

export function LogoCloud() {
  return (
    <section
      className="py-14 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A18 0%, #0D0D20 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-8">
          Trusted by professionals at the world&apos;s top companies
        </p>

        {/* Scrolling logo strip */}
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0A0A18, transparent)' }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0D0D20, transparent)' }}
          />

          <div
            className="flex items-center gap-6"
            style={{
              animation: 'marquee 30s linear infinite',
              width: 'max-content',
            }}
          >
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-white/5 whitespace-nowrap flex-shrink-0"
                style={{ background: logo.bg }}
              >
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ color: logo.color, background: `${logo.color}20` }}
                >
                  {logo.abbr}
                </span>
                <span className="text-sm font-medium text-white/60">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
