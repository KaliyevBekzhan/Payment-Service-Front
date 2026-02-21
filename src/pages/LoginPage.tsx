import React, { useState } from 'react';
import * as agent from '../api/agent';
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const LoginPage = () => {
    const [iin, setIin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isRegister, setIsRegister] = useState(false);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isRegister) {
                await agent.Auth.register({ iin, password, name });
            } else {
                await agent.Auth.login({ iin, password });
            }

            // Кука уже установлена сервером

            await queryClient.invalidateQueries({ queryKey: ['ping-me'] });

            navigate('/');
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            const message =
                axiosError.response?.data?.message ||
                (isRegister ? 'Ошибка регистрации' : 'Неверный ИИН или пароль');
            setError(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800">
                        {isRegister ? 'Регистрация' : 'Вход в систему'}
                    </h1>
                    <p className="text-slate-500 mt-2">
                        {isRegister
                            ? 'Создайте аккаунт для доступа к системе'
                            : 'Введите ваши данные для доступа к админке'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {isRegister && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Имя
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                placeholder="Иван Иванов"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            ИИН
                        </label>
                        <input
                            type="text"
                            value={iin}
                            onChange={(e) => setIin(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="000000000000"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Пароль
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition active:scale-95"
                    >
                        {isRegister ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <button
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setError('');
                        }}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        {isRegister
                            ? 'Уже есть аккаунт? Войти'
                            : 'Нет аккаунта? Зарегистрироваться'}
                    </button>
                </div>

                <div className="mt-8 text-center text-sm text-slate-400">
                    &copy; 2026 Payment Service Admin
                </div>
            </div>
        </div>
    );
};
