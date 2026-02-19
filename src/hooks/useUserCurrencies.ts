import {useEffect, useState} from "react";
import {Currencies} from "../api/agent.ts";
import type {Currency} from "../models/models.ts";

export const useUserCurrencies = () => {
    const [data, setData] = useState<Currency[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Currencies.listForUser()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    return {data, loading};
}