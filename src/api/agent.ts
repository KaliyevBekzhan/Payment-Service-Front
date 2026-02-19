import axios from 'axios'
import type {Currency, Payment, Role, TopUp} from "../models/models.ts";
import type {LoginResponse, MeResponse, MyCabinetResponse, RegistrationResponse} from "../responses/responses.ts";

const instance = axios.create({
    baseURL: 'http://localhost:5132/api/v1',
    withCredentials: true
});

export const Currencies = {
    listForAdmin: () =>
        instance.get<Currency[]>('/admin/currencies')
        .then(res => res.data),
    details: (id: number) =>
        instance.get<Currency>(`/admin/currencies/${id}`)
        .then(res => res.data),
    create:  (newCurrency: Omit<Currency, 'id'>) =>
        instance.post<Currency>('/admin/currencies', newCurrency)
            .then(res => res.data),
    update: (currency: Omit<Currency, 'id'>, id: number) =>
        instance.put<void>(`/admin/currencies/${id}`, currency)
            .then(res => res.data),
    delete: (id: number) =>
        instance.delete<void>(`/admin/currencies/${id}`)
            .then(res => res.data),
    listForUser: () =>
        instance.get<Currency[]>('/currencies')
        .then(res => res.data),
};

export const Roles = {
    list: () => instance.get('/admin/roles')
        .then(res => res.data),
    details: (id: number) => instance.get(`/admin/roles/${id}`)
        .then(res => res.data),
    create: (newRole: Omit<Role, 'id'>) => instance.post('/admin/roles', newRole)
        .then(res => res.data),
    update: (role: Omit<Role, 'id'>, id: number) =>
        instance.put(`/admin/roles/${id}`, role)
        .then(res => res.data),
    delete: (id: number) => instance.delete(`/admin/roles/${id}`)
    .then(res => res.data)
}

export const Auth = {
    login: (credentials: {iin: string, password: string}) =>
        instance.post<LoginResponse>('/auth/login', credentials)
        .then(res => res.data),
    register: (registration: {iin: string, password: string, name: string}) =>
        instance.post<RegistrationResponse>('/auth/register', registration)
        .then(res => res.data),
    logout: () =>
        instance.post<void>('/auth/logout'),
    me: () =>
        instance.get<MeResponse>('/auth/me')
        .then(res => res.data)
}

export const Payments = {
    create: (payment: Omit<Payment, 'id'>) =>
        instance.post<Payment>('/payments', payment)
            .then(res => res.data),
    info: (id: number) =>
        instance.get<Payment>(`/payments/${id}`)
        .then(res => res.data),
}

export const TopUps = {
    create: (payment: Omit<Payment, 'id'>) =>
        instance.post<void>(`/topup/`, payment)
            .then(res => res.data),
    info: (id: number) =>
        instance.get<TopUp>(`/topup/${id}`)
        .then(res => res.data),
}

export const User = {
    myCabinet: () =>
        instance.get<MyCabinetResponse>('/user')
        .then(res => res.data)
}