import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { CabinetPage } from "./pages/CabinetPage";
import { MainLayout } from "./components/layout/MainLayout";
import {FullScreenLoader} from "./pages/FullScreenLoader.tsx";
import {usePingMe} from "./hooks/UsePingMe.tsx";

function App() {
    const { isAuthorized, isLoading } = usePingMe();

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/"
                element={
                    isAuthorized ? (
                        <MainLayout userRole="client">
                            <CabinetPage />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
        </Routes>
    );
}

export default App;
