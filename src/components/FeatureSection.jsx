import React from 'react';

function FeatureCard({ icon, title, description, dark }) {
  if (dark) {
    return (
      <div className="bg-blue-600 rounded-3xl p-8 lg:p-10 flex flex-col items-start text-left group transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 shadow-[0_15px_40px_rgba(37,99,235,0.25)]">
        <div className="mb-5 text-white">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2 select-none tracking-tight">
          {title}
        </h3>
        <p className="text-[13px] leading-relaxed text-blue-100">
          {description}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100/80 shadow-[0_15px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,23,42,0.1)] hover:border-blue-100 flex flex-col items-start text-left group">
      <div className="mb-5 text-blue-600">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 select-none tracking-tight group-hover:text-blue-600 transition-colors duration-250">
        {title}
      </h3>
      <p className="text-[13px] leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
  );
}

function FeatureSection() {
  const features = [
    {
      dark: false,
      title: 'Kalkulator Pajak Instan',
      description: 'Hitung PPH 21 & PPH 23 dengan formula yang sudah divalidasi.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 transition-transform duration-500 group-hover:scale-105">
          <rect x="10" y="8" width="44" height="48" rx="5" />
          <rect x="18" y="16" width="28" height="10" rx="2" />
          <rect x="18" y="32" width="8" height="8" rx="1" />
          <rect x="28" y="32" width="8" height="8" rx="1" />
          <rect x="38" y="32" width="8" height="8" rx="1" />
          <rect x="18" y="44" width="8" height="8" rx="1" />
          <rect x="28" y="44" width="8" height="8" rx="1" />
          <rect x="38" y="44" width="8" height="8" rx="1" />
        </svg>
      ),
    },
    {
      dark: true,
      title: 'Penjelasan AI',
      description: 'AI assistant yang siap jawab semua pertanyaan pajak kamu.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
          <path d="M32 8l6 12 13 2-9.5 9.5 2 13L32 39l-11.5 5.5 2-13L13 22l13-2z" />
          <path d="M20 48l-4 8M44 48l4 8M28 56h8" />
        </svg>
      ),
    },
    {
      dark: false,
      title: 'Breakdown Pajak',
      description: 'Lihat detail perhitungan dari PKP sampai tarif pajaknya.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 transition-transform duration-500 group-hover:scale-105">
          <polyline points="8,48 20,32 30,38 44,20 56,28" />
          <path d="M8 56h48" />
          <path d="M8 8v48" />
          <circle cx="44" cy="20" r="3" />
        </svg>
      ),
    },
    {
      dark: true,
      title: 'Simpan & Tracking Histori',
      description: 'Pantau riwayat perhitungan dan lihat tren pajak kamu.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
          <circle cx="32" cy="32" r="22" />
          <path d="M32 16v16l10 6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 select-none tracking-tight">
          Feature
        </h2>
        <p className="text-slate-500 text-[15px] max-w-md mx-auto leading-relaxed">
          Lebih dari sekadar kalkulator. Taxy punya semua yang kamu butuhkan untuk kelola pajak.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            dark={feature.dark}
          />
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;
