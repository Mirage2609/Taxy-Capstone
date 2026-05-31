import { useState, useEffect } from 'react';
import Sidebar from './Dashboard/Sidebar';
import Topbar from './Dashboard/Topbar';
import SummaryCards from './Dashboard/SummaryCards';
import StructureChart from './Dashboard/StructureChart';
import QuickCalculator from './Dashboard/QuickCalculator';
import IncomeComposition from './Dashboard/IncomeComposition';
import HistoryList from './Dashboard/HistoryList';
import Chatbot from './Dashboard/Chatbot';

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [paymentStatus, setPaymentStatus] = useState('Belum Dibayar');

  // === CALCULATOR INPUT STATES ===
  const [jenisPajak, setJenisPajak] = useState('PPH21');
  const [gaji, setGaji] = useState(8000000); // Gaji Bulanan default Rp8.000.000
  const [status, setStatus] = useState('TK/0');
  const [tanggungan, setTanggungan] = useState('0');

  // PPh 23 states
  const [bruto, setBruto] = useState(10000000); // Default Rp10.000.000
  const [jenisObjek, setJenisObjek] = useState('0.02');
  const [adaNpwp, setAdaNpwp] = useState(true);

  // History state
  const [history, setHistory] = useState([
    {
      id: 1,
      timestamp: '2026-05-31 14:00',
      jenis: 'PPH 21',
      gaji: 8000000,
      status: 'TK/0',
      tanggungan: 0,
      pajakBulanan: 175000,
      takeHomePay: 7825000
    },
    {
      id: 2,
      timestamp: '2026-05-31 10:15',
      jenis: 'PPH 23',
      gaji: 15000000,
      status: 'Jasa (2%)',
      tanggungan: '-',
      pajakBulanan: 300000,
      takeHomePay: 14700000
    }
  ]);

  // Chatbot states
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Halo! Saya Taxy AI Assistant. 🤖 Saya siap membantu menjawab pertanyaan Anda seputar perpajakan di Indonesia, seperti PPh 21, PPh 23, tarif PTKP, atau cara hitung pajak.' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Format Helper
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  };

  const handleFormatRupiahInput = (e, setter) => {
    const value = e.target.value.replace(/\D/g, ''); // Extract digits
    setter(Number(value) || 0);
  };

  // === CALCULATOR PPh 21 CALCULATION ===
  const hitungPph21 = () => {
    const numGaji = Number(gaji) || 0;
    if (numGaji === 0) return { bulanan: 0, tahunan: 0, thp: 0, ptkp: 54000000, pkp: 0, persentase: '0%', rate: 0 };

    const gajiSetahun = numGaji * 12;

    // Determine PTKP based on Status & Tanggungan
    let basePtkp = 54000000; // TK/0 basis
    const numTanggungan = Number(tanggungan) || 0;

    if (status.startsWith('K')) {
      basePtkp = 58500000; // K/0
    }
    
    const ptkp = basePtkp + (numTanggungan * 4500000);

    // Calculate PKP
    let pkp = gajiSetahun - ptkp;
    if (pkp < 0) pkp = 0;

    // Calculate Progressive Tax
    let pajakTahunan = 0;
    let sisaPkp = pkp;
    let rateStr = '0%';
    let maxRate = 0;

    if (sisaPkp > 0) {
      rateStr = '5%';
      maxRate = 5;
      if (sisaPkp <= 60000000) {
        pajakTahunan += sisaPkp * 0.05;
        sisaPkp = 0;
      } else {
        pajakTahunan += 60000000 * 0.05;
        sisaPkp -= 60000000;
        rateStr = '15%';
        maxRate = 15;

        if (sisaPkp <= 190000000) {
          pajakTahunan += sisaPkp * 0.15;
          sisaPkp = 0;
        } else {
          pajakTahunan += 190000000 * 0.15;
          sisaPkp -= 190000000;
          rateStr = '25%';
          maxRate = 25;

          if (sisaPkp <= 250000000) {
            pajakTahunan += sisaPkp * 0.25;
            sisaPkp = 0;
          } else {
            pajakTahunan += 250000000 * 0.25;
            sisaPkp -= 250000000;
            rateStr = '30%';
            maxRate = 30;

            if (sisaPkp <= 4500000000) {
              pajakTahunan += sisaPkp * 0.30;
              sisaPkp = 0;
            } else {
              pajakTahunan += 4500000000 * 0.30;
              sisaPkp -= 4500000000;
              rateStr = '35%';
              maxRate = 35;
              pajakTahunan += sisaPkp * 0.35;
            }
          }
        }
      }
    }

    const pajakBulanan = pajakTahunan / 12;
    const thp = numGaji - pajakBulanan;

    return {
      bulanan: Math.round(pajakBulanan),
      tahunan: Math.round(pajakTahunan),
      thp: Math.round(thp),
      ptkp: ptkp,
      pkp: pkp,
      persentase: rateStr,
      rate: maxRate
    };
  };

  // === CALCULATOR PPh 23 CALCULATION ===
  const hitungPph23 = () => {
    const numBruto = Number(bruto) || 0;
    if (numBruto === 0) return { potongan: 0, thp: 0, tarifAkhir: 0 };

    let tarifDasar = Number(jenisObjek);
    let tarifAkhir = adaNpwp ? tarifDasar : tarifDasar * 2;

    const potonganPajak = numBruto * tarifAkhir;
    const thp = numBruto - potonganPajak;

    return {
      potongan: Math.round(potonganPajak),
      thp: Math.round(thp),
      tarifAkhir: tarifAkhir * 100
    };
  };

  const resPph21 = hitungPph21();
  const resPph23 = hitungPph23();

  const pajakBulanan = jenisPajak === 'PPH21' ? resPph21.bulanan : resPph23.potongan;
  const takeHomePay = jenisPajak === 'PPH21' ? resPph21.thp : resPph23.thp;
  const totalGaji = jenisPajak === 'PPH21' ? gaji : bruto;

  const handleSaveToHistory = () => {
    const newHistoryItem = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      jenis: jenisPajak === 'PPH21' ? 'PPH 21' : 'PPH 23',
      gaji: totalGaji,
      status: jenisPajak === 'PPH21' ? `${status} (Dep: ${tanggungan})` : `Jasa (${jenisObjek === '0.02' ? '2%' : '15%'})`,
      tanggungan: jenisPajak === 'PPH21' ? tanggungan : '-',
      pajakBulanan: pajakBulanan,
      takeHomePay: takeHomePay
    };
    setHistory((prev) => [newHistoryItem, ...prev]);
    alert('Simulasi perhitungan berhasil disimpan ke riwayat!');
  };

  const handlePayment = () => {
    if (paymentStatus === 'Belum Dibayar') {
      const confirmPay = window.confirm(`Apakah Anda ingin mensimulasikan pembayaran pajak sebesar ${formatRupiah(pajakBulanan)}?`);
      if (confirmPay) {
        setPaymentStatus('Sudah Dibayar');
      }
    } else {
      setPaymentStatus('Belum Dibayar');
    }
  };

  // Reset payment status if tax amount changes
  useEffect(() => {
    setPaymentStatus('Belum Dibayar');
  }, [pajakBulanan]);

  // Donut Chart Variables
  const netPercent = totalGaji > 0 ? (takeHomePay / totalGaji) * 100 : 100;
  const taxPercent = totalGaji > 0 ? (pajakBulanan / totalGaji) * 100 : 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const taxStrokeDashOffset = circumference - (taxPercent / 100) * circumference;

  // Bar Chart heights
  const maxBarValue = Math.max(gaji * 12, resPph21.ptkp, resPph21.pkp);
  const gajiBarHeight = maxBarValue > 0 ? ((gaji * 12) / maxBarValue) * 100 : 0;
  const ptkpBarHeight = maxBarValue > 0 ? (resPph21.ptkp / maxBarValue) * 100 : 0;
  const pkpBarHeight = maxBarValue > 0 ? (resPph21.pkp / maxBarValue) * 100 : 0;

  // Chatbot Q&A questions
  const predefinedQuestions = [
    { text: 'Apa itu PTKP?', answer: 'PTKP adalah Penghasilan Tidak Kena Pajak, yaitu batas nominal pendapatan tahunan yang dibebaskan dari kewajiban pajak PPh 21. Untuk Wajib Pajak lajang tanpa tanggungan (TK/0), PTKP dasarnya adalah Rp54.000.000 per tahun. Menikah (K/0) bertambah Rp4.500.000, dan setiap tanggungan sedarah (maksimal 3 orang) bertambah Rp4.500.000.' },
    { text: 'Bagaimana cara kerja tarif progresif PPh 21?', answer: 'PPh Pasal 21 dihitung menggunakan tarif progresif Pasal 17 UU HPP:\n- 5% untuk PKP Rp0 s.d Rp60.000.000\n- 15% untuk PKP > Rp60.000.000 s.d Rp250.000.000\n- 25% untuk PKP > Rp250.000.000 s.d Rp500.000.000\n- 30% untuk PKP > Rp500.000.000 s.d Rp5.000.000.000\n- 35% untuk PKP di atas Rp5.000.000.000\nPajak dipotong secara bertahap (berlapis) sesuai dengan nominal PKP.' },
    { text: 'Apa perbedaan PPh 21 dan PPh 23?', answer: 'PPh 21 adalah pajak atas penghasilan berupa gaji, upah, honorarium, tunjangan yang diterima oleh Wajib Pajak orang pribadi dalam negeri atas pekerjaan atau jasa.\nSedangkan PPh 23 adalah pajak yang dipotong atas penghasilan berupa dividen, royalti, bunga, sewa, serta jasa teknik, manajemen, konstruksi, konsultan, dan jasa lainnya yang dilakukan oleh badan usaha maupun perorangan.' },
    { text: 'Bagaimana status PPh 23 jika tidak punya NPWP?', answer: 'Sesuai aturan perpajakan di Indonesia, bagi Wajib Pajak yang dipotong PPh 23 namun tidak memiliki NPWP, maka tarif pemotongannya dikenakan sanksi sebesar 100% lebih tinggi dari tarif standar. Contohnya: jasa konsultan yang normalnya bermuatan tarif 2% akan naik menjadi 4%.' }
  ];

  const handleSendChat = (questionText) => {
    const textToSend = questionText || userInput;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = 'Maaf, saya belum memahami pertanyaan tersebut. Coba pilih pertanyaan perpajakan populer pada tombol bantuan di bawah!';
      
      const matched = predefinedQuestions.find(q => q.text.toLowerCase().includes(textToSend.toLowerCase()) || textToSend.toLowerCase().includes(q.text.toLowerCase()));
      if (matched) {
        replyText = matched.answer;
      } else if (textToSend.toLowerCase().includes('gaji') || textToSend.toLowerCase().includes('hitung')) {
        replyText = `Saat ini simulasi kalkulator di dashboard Anda menunjukkan total gaji bulanan sebesar ${formatRupiah(totalGaji)}. Pajak bulanan terhitung Anda adalah ${formatRupiah(pajakBulanan)}. Apakah ada bagian perhitungan ini yang ingin Anda tanyakan secara mendalam?`;
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, type: 'bot', text: replyText }]);
    }, 1000);
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col lg:flex-row bg-slate-50 font-sans transition-all duration-300">
      
      {/* 1. SIDEBAR SUB-COMPONENT */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        onLogout={onLogout} 
      />

      {/* 2. MAIN LAYOUT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOPBAR HEADER SUB-COMPONENT */}
        <Topbar 
          activeTab={activeTab} 
          user={user} 
          onLogout={onLogout} 
        />

        {/* 3. DYNAMIC CONTENT CONTAINER */}
        <main className="flex-1 p-6 overflow-y-auto max-w-[1200px] w-full mx-auto space-y-6">
          
          {/* ================= TAB 1: MAIN DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Welcome Greetings Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight select-none">
                  Halo, Pajakers!! 👋
                </h2>
              </div>

              {/* Ringkasan 3 Topcards Sub-component */}
              <SummaryCards 
                pajakBulanan={pajakBulanan}
                paymentStatus={paymentStatus}
                handlePayment={handlePayment}
                formatRupiah={formatRupiah}
              />

              {/* Grid: 2 Columns below */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* COLUMN 1 & 2: LEFT AREA (Calculators, Bar Chart, Insights) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Custom Styled Bar Chart Sub-component */}
                  {jenisPajak === 'PPH21' && (
                    <StructureChart 
                      gaji={gaji}
                      resPph21={resPph21}
                      gajiBarHeight={gajiBarHeight}
                      ptkpBarHeight={ptkpBarHeight}
                      pkpBarHeight={pkpBarHeight}
                      formatRupiah={formatRupiah}
                    />
                  )}

                  {/* Insight dynamic card */}
                  <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-5 flex items-start space-x-4 text-left">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096L3 15.093m6 0.811L15.093 15 21 15.813m-6.813-5.096L15 3m0 0l.813 5.096L21 9.813M15 8.13L8.907 9 3 8.188" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-extrabold text-slate-800">Insight untuk kamu</h4>
                      <p className="text-xs font-semibold text-slate-600 leading-relaxed transition-all duration-300">
                        {jenisPajak === 'PPH21' 
                          ? `Pajak bulanan kamu terhitung sebesar ${formatRupiah(pajakBulanan)} karena penghasilan tahunanmu setelah dikurangi PTKP menyisakan PKP ${formatRupiah(resPph21.pkp)} yang masuk ke dalam lapisan tarif progresif ${resPph21.persentase}. Jika gaji bulanan naik, persentase pajak bisa meningkat.`
                          : `Pemotongan PPh 23 bruto atas jasa/royalti bernilai ${formatRupiah(resPph23.potongan)} (${resPph23.tarifAkhir}%). ${adaNpwp ? 'Tarif optimal karena Anda menyertakan NPWP.' : 'Tarif dipotong 100% lebih tinggi karena Anda tidak memiliki/mencantumkan NPWP.'}`
                        }
                      </p>
                    </div>
                  </div>

                  {/* Custom Styled Quick Calculator Sub-component */}
                  <QuickCalculator 
                    jenisPajak={jenisPajak}
                    setJenisPajak={setJenisPajak}
                    gaji={gaji}
                    setGaji={setGaji}
                    status={status}
                    setStatus={setStatus}
                    tanggungan={tanggungan}
                    setTanggungan={setTanggungan}
                    bruto={bruto}
                    setBruto={setBruto}
                    jenisObjek={jenisObjek}
                    setJenisObjek={setJenisObjek}
                    adaNpwp={adaNpwp}
                    setAdaNpwp={setAdaNpwp}
                    pajakBulanan={pajakBulanan}
                    takeHomePay={takeHomePay}
                    resPph21={resPph21}
                    resPph23={resPph23}
                    handleSaveToHistory={handleSaveToHistory}
                    formatRupiah={formatRupiah}
                    handleFormatRupiahInput={handleFormatRupiahInput}
                  />

                  {/* Dynamic Parameter breakdown */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-left">
                    <h4 className="text-sm font-extrabold text-slate-800 mb-3">Detail Parameter Pajak</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Gaji Tahunan</p>
                        <p className="text-xs font-extrabold text-slate-800">{formatRupiah(totalGaji * 12)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">PTKP</p>
                        <p className="text-xs font-extrabold text-slate-800">
                          {jenisPajak === 'PPH21' ? formatRupiah(resPph21.ptkp) : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">PKP Terkena Pajak</p>
                        <p className="text-xs font-extrabold text-slate-800">
                          {jenisPajak === 'PPH21' ? formatRupiah(resPph21.pkp) : formatRupiah(totalGaji)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Tarif Maksimal</p>
                        <p className="text-xs font-extrabold text-blue-600">
                          {jenisPajak === 'PPH21' ? resPph21.persentase : `${resPph23.tarifAkhir}%`}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* COLUMN 3: RIGHT AREA - INCOME COMPOSITION */}
                <div className="space-y-6">
                  
                  {/* Custom Donut Chart & Detailed Explanation Panel */}
                  <IncomeComposition 
                    jenisPajak={jenisPajak}
                    totalGaji={totalGaji}
                    takeHomePay={takeHomePay}
                    pajakBulanan={pajakBulanan}
                    resPph21={resPph21}
                    resPph23={resPph23}
                    radius={radius}
                    circumference={circumference}
                    taxStrokeDashOffset={taxStrokeDashOffset}
                    netPercent={netPercent}
                    taxPercent={taxPercent}
                    formatRupiah={formatRupiah}
                  />

                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 2: HISTORY LIST ================= */}
          {activeTab === 'history' && (
            <HistoryList 
              history={history}
              setHistory={setHistory}
              formatRupiah={formatRupiah}
            />
          )}

          {/* ================= TAB 3: AI CHATBOT SIMULATOR ================= */}
          {activeTab === 'chatbot' && (
            <Chatbot 
              messages={messages}
              userInput={userInput}
              setUserInput={setUserInput}
              isTyping={isTyping}
              handleSendChat={handleSendChat}
              predefinedQuestions={predefinedQuestions}
            />
          )}

        </main>
      </div>

    </div>
  );
}

export default Dashboard;
