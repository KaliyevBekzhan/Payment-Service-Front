import { QuickActions } from "./ui/QuickActions";

interface Props {
    account: number;
    walletNumber: string;
    onAction: (type: 'topup' | 'payment') => void;
}

export const BalanceCard = ({ account, walletNumber, onAction }: Props) => (
    <div className="lg:col-span-2 card-premium bg-slate-900 text-white border-none flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
            <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Доступные средства</h3>
            <p className="text-5xl font-black mt-4 tracking-tighter">
                {account.toLocaleString()} <span className="text-blue-500 text-3xl">₸</span>
            </p>
            <p className="text-slate-500 text-xs mt-4 font-mono opacity-50">{walletNumber}</p>
        </div>
        <QuickActions onAction={onAction} />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
    </div>
);