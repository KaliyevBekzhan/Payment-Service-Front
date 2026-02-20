export const FullScreenLoader = () => (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 font-bold tracking-widest uppercase text-xs">
            Security Check...
        </p>
    </div>
);
