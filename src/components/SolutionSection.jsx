import React from 'react';

function SolutionCard({ icon, title, description }) {
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

function SolutionSection() {
  const solutions = [
    {
      title: "Input Sederhana",
      description: "Input sederhana dan akses mudah",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-blue-600 transition-transform duration-500 group-hover:scale-105">
          {/* Main Input Field Box */}
          <rect x="6" y="18" width="52" height="28" rx="6" fill="white" />
          {/* Dividing Vertical Line for Spinner Buttons */}
          <line x1="42" y1="18" x2="42" y2="46" />
          
          {/* Up and Down Triangles */}
          {/* Up Arrow */}
          <polygon points="49,24 44,30 54,30" className="fill-blue-600" stroke="none" />
          {/* Down Arrow */}
          <polygon points="49,40 44,34 54,34" className="fill-blue-600" stroke="none" />
          
          {/* Large Digit "1" */}
          <path d="M21 27h2v12h-4" />
          <path d="M19 29.5l2-2.5" />
          <path d="M18 39h6" />
        </svg>
      )
    },
    {
      title: "Hasil instan",
      description: "Hasil cepat dan Instan untuk digunakan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-blue-600 transition-transform duration-500 group-hover:scale-105">
          {/* Stopwatch Body */}
          <circle cx="38" cy="38" r="16" fill="white" />
          {/* Stopwatch Crown and Top Pin */}
          <path d="M38 14v8" />
          <path d="M34 14h8" />
          
          {/* Stopwatch Dial Hand pointing to result */}
          <path d="M38 38l6-10" />
          {/* Small side buttons */}
          <path d="M50 24l4-4" />
          
          {/* Speed / Motion lines symbolizing "instant" */}
          <path d="M18 28h8" />
          <path d="M10 38h14" />
          <path d="M16 48h10" />
        </svg>
      )
    },
    {
      title: "Penjelasan mudah dipahami",
      description: "Mudahkan pengalamanmu menggunakan pajak bersama Taxy. Cobalah gratis!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-blue-600 transition-transform duration-500 group-hover:scale-105">
          {/* Laptop Screen */}
          <rect x="8" y="14" width="48" height="32" rx="3" fill="white" />
          {/* Laptop Keyboard Base */}
          <path d="M4 46h56v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4z" />
          {/* Touchpad Line */}
          <path d="M28 50h8" />
          
          {/* Tutor / Teacher outline inside laptop screen */}
          <circle cx="22" cy="27" r="4" />
          <path d="M14 38c0-3.3 3.7-6 8-6s8 2.7 8 6" />
          
          {/* Presentation Chart Board inside laptop screen */}
          <rect x="36" y="22" width="14" height="10" rx="1" />
          <path d="M38 27h10M38 30h6" />
          
          {/* Hand/Pointer stick extending from tutor to board */}
          <path d="M30 32l6-4" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full">
      {/* Heading */}
      <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-10 select-none tracking-tight">
        Solution
      </h2>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {solutions.map((solution, index) => (
          <SolutionCard 
            key={index}
            title={solution.title}
            description={solution.description}
            icon={solution.icon}
          />
        ))}
      </div>
    </section>
  );
}

export default SolutionSection;
