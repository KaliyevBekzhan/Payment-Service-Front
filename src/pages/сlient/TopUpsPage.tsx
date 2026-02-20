import { useTopUps } from "../../hooks/useTopUps.ts";
import { TransactionsListPage } from "../../components/transactions/TransactionListPage.tsx";

export const TopUpsPage = () => (
    <TransactionsListPage
        title="Мои пополнения"
        emptyText="Пополнений пока нет"
        loadingText="Загрузка пополнений..."
        errorText="Ошибка загрузки пополнений"
        useHook={useTopUps}
    />
);