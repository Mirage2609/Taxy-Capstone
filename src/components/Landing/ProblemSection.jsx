import React from 'react';

function ProblemCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100/80 shadow-[0_15px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,23,42,0.1)] hover:border-blue-100 flex flex-col items-start text-left group">
      {/* Icon Wrapper dengan Efek Hover Micro-Animation */}
      <div className="mb-6 p-1 bg-blue-50/20 rounded-2xl group-hover:bg-blue-50/50 transition-colors duration-300">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-3 select-none tracking-tight group-hover:text-blue-600 transition-colors duration-250">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-[14px] leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
  );
}

function ProblemSection() {
  const problems = [
    {
      title: "Pajak itu rumit",
      description: "Pajak itu rumit tergantung pada roda ekonomi yang berjalan di lingkup kerja nya.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-blue-600 transition-transform duration-500 group-hover:scale-105">
          {/* Document Outline with folded page */}
          <path d="M18 6h24l10 10v36c0 3.3-2.7 6-6 6H18c-3.3 0-6-2.7-6-6V12c0-3.3 2.7-6 6-6z" />
          <path d="M42 6v10h10" />
          
          {/* TAX Letters made with clean paths */}
          {/* T */}
          <path d="M20 18h6" />
          <path d="M23 18v8" />
          {/* A */}
          <path d="M31 18l-3 8h6l-3-8z" />
          <path d="M29.5 23h3" />
          {/* X */}
          <path d="M38 18l6 8" />
          <path d="M44 18l-6 8" />
          
          {/* Text lines representing values */}
          <path d="M20 34h24" />
          <path d="M20 40h24" />
          
          {/* Coin with dollar sign overlap */}
          <circle cx="20" cy="48" r="7" fill="white" />
          <path d="M20 44v8" />
          <path d="M18.5 46.5c0-1.2 3-1.2 3 0 0 1.2-3 1.2-3 2.4 0 1.2 3 1.2 3 0" />
        </svg>
      )
    },
    {
      title: "Banyak istilah membingungkan",
      description: "Banyak istilah perhitungan dalam pajak yang tidak banyak diketahui secara umum",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-blue-600 transition-transform duration-500 group-hover:scale-105">
          {/* Notebook Base Sheet */}
          <path d="M14 16h36v38a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V16z" />
          {/* Back Sheets */}
          <path d="M18 12h28v4" />
          
          {/* Top Binding Rings */}
          <path d="M20 8v8M28 8v8M36 8v8M44 8v8" />
          {/* Loops */}
          <path d="M20 8c0-3.3 3-3 3 0v4M28 8c0-3.3 3-3 3 0v4M36 8c0-3.3 3-3 3 0v4M44 8c0-3.3 3-3 3 0v4" />
          
          {/* Lines */}
          <path d="M20 26h24" />
          <path d="M20 34h24" />
          <path d="M20 42h24" />
          <path d="M20 50h16" />
        </svg>
      )
    },
    {
      title: "Sulit menghitung sendiri",
      description: "Mudahkan pengalamanmu menggunakan pajak bersama Taxy. Cobalah gratis!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-blue-600 transition-transform duration-500 group-hover:scale-105">
          {/* Document scroll/paper roll on the left */}
          <path d="M8 12c0-3.3 2.7-6 6-6h18v44c0 3.3-2.7 6-6 6H12c-3.3 0-6-2.7-6-6V12z" />
          <path d="M14 6h16" />
          <path d="M8 12h18" />
          <path d="M8 50h18" />
          
          {/* Math symbols inside scroll */}
          {/* Percent */}
          <circle cx="15" cy="20" r="1.5" />
          <circle cx="23" cy="28" r="1.5" />
          <path d="M23 18l-8 12" />
          {/* Minus/Plus */}
          <path d="M14 38h6" />
          <path d="M17 35v6" />
          
          {/* Calculator on the right */}
          <rect x="36" y="20" width="22" height="34" rx="3" fill="white" />
          {/* Screen */}
          <rect x="40" y="24" width="14" height="6" />
          {/* Keys */}
          <path d="M41 36h2M47 36h2M53 36h2" />
          <path d="M41 42h2M47 42h2M53 42h2" />
          <path d="M41 48h2M47 48h8" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full">
      {/* Heading */}
      <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-10 select-none tracking-tight">
        Problem
      </h2>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {problems.map((problem, index) => (
          <ProblemCard 
            key={index}
            title={problem.title}
            description={problem.description}
            icon={problem.icon}
          />
        ))}
      </div>
    </section>
  );
}

export default ProblemSection;
