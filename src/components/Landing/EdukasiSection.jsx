import React from 'react';

function EdukasiCard({ title, description, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-3xl overflow-hidden border border-slate-100/80 shadow-[0_15px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,23,42,0.1)] hover:border-blue-100 group cursor-pointer flex flex-col no-underline"
    >
      {/* Image Placeholder */}
      <div className="w-full aspect-video bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-300">
          <rect x="6" y="6" width="52" height="52" rx="4" />
          <circle cx="22" cy="22" r="6" />
          <path d="M6 42l16-12 10 8 10-14 16 24H6z" />
        </svg>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-base font-bold text-slate-900 mb-2 select-none tracking-tight group-hover:text-blue-600 transition-colors duration-250">
          {title}
        </h3>
        <p className="text-[13px] leading-relaxed text-slate-600">
          {description}
        </p>
      </div>
    </a>
  );
}

function EdukasiSection() {
  const articles = [
    {
      title: 'Apa itu PPH 21?',
      description: 'Panduan lengkap tentang PPH 21, pajak penghasilan untuk karyawan dan pekerja.',
      href: 'https://pajak.go.id/en/node/34300',
    },
    {
      title: 'Apa itu PPH 23?',
      description: 'Pelajari tentang PPH 23 untuk freelancer, pengusaha, dan penerima jasa.',
      href: 'https://www.pajak.go.id/id/pemotongan-pajak-penghasilan-pasal-23',
    },
    {
      title: 'Kenapa Pajak Penting?',
      description: 'Memahami pentingnya pajak untuk pembangunan dan manfaatnya buat kamu.',
      href: 'https://pajak.go.id/id/pajak',
    },
  ];

  return (
    <section className="w-full">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 select-none tracking-tight">
          Edukasi
        </h2>
        <p className="text-slate-500 text-[15px] max-w-md mx-auto leading-relaxed">
          Belajar tentang pajak dengan artikel yang mudah dipahami
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <EdukasiCard
            key={index}
            title={article.title}
            description={article.description}
            href={article.href}
          />
        ))}
      </div>
    </section>
  );
}

export default EdukasiSection;
