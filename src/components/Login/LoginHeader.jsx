function LoginHeader() {
  return (
    <div className="text-center mb-8 px-4">
      {/* Title */}
      <h2 className="text-4xl lg:text-[2.75rem] font-black text-slate-900 leading-tight mb-4 tracking-tight">
        Welcome The Taxy!
      </h2>
      
      {/* Subtitle / Tagline */}
      <p className="text-base text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
        Mudahkan pengalamanmu menggunaakan pajak bersama Taxy. Cobalah gratis!
      </p>
    </div>
  );
}

export default LoginHeader;
