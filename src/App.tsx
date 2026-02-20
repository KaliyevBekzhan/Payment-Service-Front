import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { CabinetPage } from "./pages/сlient/CabinetPage.tsx";
import { PaymentsPage } from "./pages/сlient/PaymentsPage.tsx";
import { TopUpsPage } from "./pages/сlient/TopUpsPage.tsx";
import { MainLayout } from "./components/layout/MainLayout";
import { FullScreenLoader } from "./pages/сlient/FullScreenLoader.tsx";
import { usePingMe } from "./hooks/UsePingMe";
import {HistoryPage} from "./pages/сlient/HistoryPage.tsx";
import {AdminPaymentsPage} from "./pages/admin/AdminPage.tsx";
import {AdminCurrenciesPage} from "./pages/admin/AdminCurrenciesPage.tsx";
import {AdminRolesPage} from "./pages/admin/AdminRolesPage.tsx";
import {useLogout} from "./hooks/auth/useLogout.ts";

function App() {
    const { isAuthorized, isLoading, user } = usePingMe();

    const logoutMutation = useLogout(); // ← ВАЖНО: здесь

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    if (isLoading) {
        return <FullScreenLoader />;
    }

    if (!isAuthorized || !user) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    // 👇 ROLE-BASED ROUTING
    if (user.role === "Admin") {
        return (
            <Routes>
                <Route
                    element={
                        <MainLayout
                            userRole="admin"
                            onLogout={handleLogout}   // ← ВАЖНО
                        />
                    }
                >
                    <Route index element={<Navigate to="/admin/payments" />} />

                    <Route path="/admin/payments" element={<AdminPaymentsPage />} />
                    <Route path="/admin/currencies" element={<AdminCurrenciesPage />} />
                    <Route path="/admin/roles" element={<AdminRolesPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/admin/payments" />} />
            </Routes>
        );
    }

    // 👇 CLIENT ROUTES
    return (
        <Routes>
            <Route
                element={
                    <MainLayout
                        userRole="client"
                        onLogout={handleLogout}  // ← ВАЖНО
                    />
                }
            >
                <Route index element={<Navigate to="/cabinet" />} />

                <Route path="/cabinet" element={<CabinetPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/top-up" element={<TopUpsPage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/cabinet" />} />
        </Routes>
    );

}

export default App;