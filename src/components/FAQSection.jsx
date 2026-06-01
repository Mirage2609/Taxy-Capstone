import React, { useState } from 'react';

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-slate-50 rounded-2xl px-7 py-5 border border-slate-100 cursor-pointer transition-all duration-300 hover:border-blue-100 hover:bg-blue-50/30 select-none"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center gap-4">
        <span className="text-[15px] font-semibold text-slate-800">{question}</span>
        <span
          className={`text-blue-600 text-xl font-light flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
        >
          →
        </span>
      </div>
      {open && (
        <p className="mt-3 text-[13px] leading-relaxed text-slate-600 animate-fade-in-up">
          {answer}
        </p>
      )}
    </div>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: 'Apakah hasil perhitungan Taxy akurat?',
      answer: 'Ya, semua formula yang digunakan di Taxy sudah divalidasi sesuai regulasi pajak Indonesia terbaru, termasuk PMK dan peraturan DJP yang berlaku.',
    },
    {
      question: 'Apakah data saya aman?',
      answer: 'Keamanan data kamu adalah prioritas kami. Semua data dienkripsi dan tidak pernah dibagikan ke pihak ketiga manapun.',
    },
    {
      question: 'Apakah Taxy gratis?',
      answer: 'Taxy tersedia gratis untuk fitur-fitur dasar seperti kalkulator PPH 21 & PPH 23. Fitur premium seperti histori tak terbatas dan AI assistant tersedia melalui upgrade.',
    },
  ];

  return (
    <section className="w-full">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 select-none tracking-tight">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-slate-500 text-[15px] max-w-sm mx-auto leading-relaxed">
          Ada pertanyaan? Kami punya jawabannya
        </p>
      </div>

      {/* FAQ Items */}
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
