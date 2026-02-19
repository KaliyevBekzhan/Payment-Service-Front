import { useState, useEffect } from 'react';
import axios from 'axios'; // Импортируем сам axios для проверки ошибок
import * as agent from '../api/agent';
import type {MyCabinetResponse} from "../responses/responses.ts";

export const useMyCabinet = () => {
    const [data, setData] = useState<MyCabinetResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCabinet = async () => {
        try {
            setLoading(true);
            setError(null); // Сбрасываем ошибку перед запросом
            const response = await agent.User.myCabinet();
            setData(response);
        } catch (err) {
            // Проверяем, является ли ошибка ошибкой Axios
            if (axios.isAxiosError(err)) {
                // Извлекаем сообщение из ответа бэкенда (если оно там есть)
                const serverMessage = err.response?.data?.message;
                setError(serverMessage || 'Ошибка сервера при загрузке кабинета');
            } else {
                // Если это не Axios (например, ошибка сети или JS)
                setError('Произошла непредвиденная ошибка');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCabinet();
    }, []);

    return { data, loading, error, refresh: fetchCabinet };
};