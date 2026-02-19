// src/components/QuickActions.tsx

interface QuickActionsProps {
    onAction: (type: 'topup' | 'payment') => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
    return (
        <div className="flex flex-col space-y-3 z-10 min-w-50">
            <button
                onClick={() => onAction('topup')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-xl shadow-blue-500/20 text-sm tracking-tighter"
            >
                ➕ ПОПОЛНИТЬ БАЛАНС
            </button>
            <button
                onClick={() => onAction('payment')}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-black border border-white/10 transition-all active:scale-95 backdrop-blur-md text-sm tracking-tighter"
            >
                💸 СОВЕРШИТЬ ПЛАТЕЖ
            </button>
        </div>
    );
};