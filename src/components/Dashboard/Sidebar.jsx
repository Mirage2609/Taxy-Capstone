import { useState, useRef, useEffect } from 'react';
import DashboardIcon from '../../assets/Dashboard.svg';
import HistoryIcon from '../../assets/Time.svg';
import ChatbotIcon from '../../assets/message (1) 1.svg';
import ChevronIcon from '../../assets/chevron.svg';

function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <aside className="w-full lg:w-[260px] bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between p-6 flex-shrink-0">
      <div className="space-y-8">
        {/* Logo Taxy */}
        <div className="flex items-center space-x-3 select-none">
          <span className="text-3xl font-black text-slate-900 tracking-tighter">Taxy</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
          {/* Dashboard Link */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 active:scale-[0.98] ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <img src={DashboardIcon} className={`w-5 h-5 ${activeTab === 'dashboard' ? 'brightness-0 invert' : ''}`} alt="" />
            <span>Dashboard</span>
          </button>

          {/* History Link */}
          <button
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 active:scale-[0.98] ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <img src={HistoryIcon} className={`w-5 h-5 ${activeTab === 'history' ? 'brightness-0 invert' : ''}`} alt="" />
            <span>History</span>
          </button>

          {/* AI Chatbot Link */}
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 active:scale-[0.98] ${
              activeTab === 'chatbot'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <img src={ChatbotIcon} className={`w-5 h-5 ${activeTab === 'chatbot' ? 'brightness-0 invert' : ''}`} alt="" />
            <span>AI Chatbot</span>
          </button>
        </nav>
      </div>

      {/* User profile dropdown logout */}
      <div className="hidden lg:block relative" ref={profileRef}>
        <div 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 cursor-pointer transition"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {(user?.username || 'A').charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800 leading-none mb-0.5">{user?.username || 'admin'}</p>
              <p className="text-[10px] text-slate-400 font-semibold leading-none">Wajib Pajak</p>
            </div>
          </div>
          <img src={ChevronIcon} className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} alt="" />
        </div>

        {/* Profile Menu Dropdown */}
        {showProfileMenu && (
          <div className="absolute bottom-14 left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-scale-up text-left">
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition"
            >
              Logout / Keluar
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
