function LoginButton({ children, onClick, type = 'submit', isLoading = false, disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`w-full py-4 text-white text-lg font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100 flex justify-center items-center gap-2 cursor-pointer
        ${(isLoading || disabled) ? 'opacity-85 cursor-not-allowed active:scale-100' : ''}
      `}
    >
      {isLoading ? (
        <>
          {/* Loading Spinner */}
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Mengautentikasi...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default LoginButton;
