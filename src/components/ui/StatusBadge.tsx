export const StatusBadge = ({ status }: { status: string }) => {
    const isAccepted = status === 'Accepted';
    const isCreated = status === 'Created';

    return (
        <span className={`
            px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter
            ${isAccepted ? 'bg-emerald-100 text-emerald-700' :
            isCreated ? 'bg-amber-100 text-amber-700' :
                'bg-slate-100 text-slate-600'}
        `}>
    {status}
    </span>
);
};