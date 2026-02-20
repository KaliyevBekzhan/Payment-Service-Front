import { usePayments } from "../../hooks/usePayments.ts";
import { TransactionsListPage } from "../../components/transactions/TransactionListPage.tsx";

export const PaymentsPage = () => (
    <TransactionsListPage
        title="Мои платежи"
        emptyText="Платежей пока нет"
        loadingText="Загрузка платежей..."
        errorText="Ошибка загрузки платежей"
        useHook={usePayments}
    />
);