function Chatbot({
  messages,
  userInput,
  setUserInput,
  isTyping,
  handleSendChat,
  predefinedQuestions
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[70vh] overflow-hidden">
      
      {/* Bot Header */}
      <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.765 5.99 5.99 0 011.524-2.238C4.034 16 3 13.107 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-black tracking-tight leading-none mb-0.5">Taxy AI Assistant</p>
            <p className="text-[10px] text-blue-100 font-bold leading-none">Online • Siap membantu 24/7</p>
          </div>
        </div>
      </div>

      {/* Message Logs */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50 flex flex-col">
        
        {/* Kemampuan Taxy AI Introduction Panel */}
        {messages.length === 1 && (
          <div className="mb-4 bg-slate-100/60 border border-slate-200/60 rounded-2xl p-5 text-left space-y-4 animate-fade-in">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>💡</span> Kemampuan Utama Taxy AI
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-start space-x-3 shadow-sm hover:shadow-md transition">
                <span className="text-base flex-shrink-0 p-1 bg-blue-50 text-blue-600 rounded-lg">📊</span>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 mb-0.5">Analisis Pajak Progresif</h4>
                  <p className="text-[9px] text-slate-400 font-bold leading-relaxed">Menghitung rincian pemotongan pajak berdasarkan lapisan tarif progresif UU HPP secara presisi.</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-start space-x-3 shadow-sm hover:shadow-md transition">
                <span className="text-base flex-shrink-0 p-1 bg-blue-50 text-blue-600 rounded-lg">🔑</span>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 mb-0.5">Konsultasi PTKP & Tanggungan</h4>
                  <p className="text-[9px] text-slate-400 font-bold leading-relaxed">Panduan lengkap mengenai status PTKP (TK/0 s.d K/3) dan klaim tanggungan sedarah bulanan.</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-start space-x-3 shadow-sm hover:shadow-md transition">
                <span className="text-base flex-shrink-0 p-1 bg-blue-50 text-blue-600 rounded-lg">📄</span>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 mb-0.5">Panduan Pengisian SPT</h4>
                  <p className="text-[9px] text-slate-400 font-bold leading-relaxed">Asistensi langkah-demi-langkah bagi wajib pajak orang pribadi dalam pelaporan SPT Tahunan.</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-start space-x-3 shadow-sm hover:shadow-md transition">
                <span className="text-base flex-shrink-0 p-1 bg-blue-50 text-blue-600 rounded-lg">💡</span>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 mb-0.5">Optimalisasi Beban Pajak</h4>
                  <p className="text-[9px] text-slate-400 font-bold leading-relaxed">Rekomendasi pengurangan pajak secara legal lewat zakat, asuransi, dan dana pensiun.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`max-w-[75%] rounded-2xl p-4 text-xs font-bold leading-relaxed text-left transition-all ${
              msg.type === 'bot'
                ? 'bg-white border border-slate-200 text-slate-700 self-start rounded-tl-none shadow-sm'
                : 'bg-blue-600 text-white self-end rounded-tr-none shadow-md shadow-blue-100'
            }`}
          >
            {msg.text.split('\n').map((line, idx) => (
              <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
            ))}
          </div>
        ))}
        
        {/* Typing bubble */}
        {isTyping && (
          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 text-xs font-bold text-slate-400 self-start rounded-tl-none flex items-center space-x-1 shadow-sm">
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
      </div>

      {/* Predefined prompt buttons */}
      <div className="bg-white border-t border-slate-100 px-4 py-3 flex space-x-2 overflow-x-auto scrollbar-none">
        {predefinedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendChat(q.text)}
            className="flex-shrink-0 text-[10px] bg-blue-50 text-blue-700 font-extrabold px-3 py-1.5 rounded-full hover:bg-blue-100 transition active:scale-[0.97]"
          >
            {q.text}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSendChat(); }}
        className="bg-white border-t border-slate-200 p-4 flex space-x-3 items-center"
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ketik pertanyaan pajak Anda disini..."
          className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-bold focus:outline-none focus:border-blue-600 bg-slate-50 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-xl transition active:scale-[0.97] text-xs shadow-md shadow-blue-200"
        >
          Kirim
        </button>
      </form>

    </div>
  );
}

export default Chatbot;
