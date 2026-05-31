function Topbar({ activeTab, user, onLogout }) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-extrabold text-slate-800 capitalize select-none">
          Taxy {activeTab} Panel
        </h1>
      </div>
      {/* User profile section for mobile */}
      <div className="lg:hidden flex items-center space-x-2">
        <span className="text-xs font-bold text-slate-800">{user?.username || 'admin'}</span>
        <button 
          onClick={onLogout}
          className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;
