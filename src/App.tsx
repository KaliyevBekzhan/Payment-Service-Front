import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { CabinetPage } from "./pages/CabinetPage";
import { PaymentsPage } from "./pages/PaymentsPage";
import { TopUpsPage } from "./pages/TopUpsPage";
import { MainLayout } from "./components/layout/MainLayout";
import { FullScreenLoader } from "./pages/FullScreenLoader";
import { usePingMe } from "./hooks/UsePingMe";
import {HistoryPage} from "./pages/HistoryPage.tsx";

function App() {
    const { isAuthorized, isLoading } = usePingMe();

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return (
        <Routes>

            {/* Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected client routes */}
            {isAuthorized ? (
                <Route element={<MainLayout userRole="client" />}>

                    {/* Default redirect */}
                    <Route index element={<Navigate to="/cabinet" />} />

                    <Route path="/cabinet" element={<CabinetPage />} />
                    <Route path="/payments" element={<PaymentsPage />} />
                    <Route path="/top-up" element={<TopUpsPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                </Route>
            ) : (
                <Route path="*" element={<Navigate to="/login" />} />
            )}

        </Routes>
    );
}

export default App;
