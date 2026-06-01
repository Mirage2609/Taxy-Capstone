import React from 'react';

function StepCircle({ number }) {
  return (
    <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.3)] mx-auto mb-5 select-none">
      <span className="text-5xl font-black text-white leading-none">{number}</span>
    </div>
  );
}

function CaraKerjaSection() {
  const steps = [
    {
      number: '1',
      title: 'Pilih Jenis Pajak',
      description: 'Tentukan apakah kamu mau hitung PPH 21 atau PPH 23 sesuai kebutuhan.',
    },
    {
      number: '2',
      title: 'Masukkan Data',
      description: 'Input gaji, status, atau nilai transaksi kamu dengan mudah.',
    },
    {
      number: '3',
      title: 'Dapatkan Hasil Instan',
      description: 'Lihat hasil perhitungan pajak lengkap dengan breakdown detail.',
    },
  ];

  return (
    <section className="w-full">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 select-none tracking-tight">
          Cara Kerja Taxy
        </h2>
        <p className="text-slate-500 text-[15px] max-w-md mx-auto leading-relaxed">
          Tiga langkah mudah untuk menghitung pajak kamu
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center group">
            <StepCircle number={step.number} />
            <h3 className="text-lg font-bold text-slate-900 mb-2 select-none tracking-tight">
              {step.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-slate-600 max-w-[200px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CaraKerjaSection;
