import { useState,  useEffect } from 'react';
import type { Currency } from '../models/models.ts';
import { Currencies } from '../api/agent.ts';

export const useCurrencies = () => {
    const [data, setData] = useState<Currency[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Currencies.listForAdmin()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    return { data, loading}
}