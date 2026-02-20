import type {ActionResponse} from "../responses/responses.ts";

interface Props {
    payments: ActionResponse[];
}

export const RecentHistoryTable = ({ payments }: Props) => {
    return (
        <div className="card-premium p-0 overflow-hidden shadow-sm border-none ring-1 ring-slate-100">
            <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-800">
                    Последние операции
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-2 px-6 pb-6">
                    <tbody>
                    {payments.map((p) => {

                        const isTopUp = p.amountInTenge > 0;

                        return (
                            <tr key={p.id}>
                                <td className="px-4 py-4">
                                    {p.comment}
                                </td>

                                <td
                                    className={`px-4 py-4 text-right font-bold
                                            ${isTopUp ? 'text-emerald-600' : 'text-red-600'}`}
                                >
                                    {isTopUp ? "▲" : "▼"}{" "}
                                    {Math.abs(p.amountInTenge).toLocaleString()} ₸
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};