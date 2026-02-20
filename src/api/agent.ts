import axios from 'axios'
import type {Currency, Pagination, Payment, Role} from "../models/models.ts";
import type {
    ActionResponse,
    LoginResponse,
    MeResponse,
    MyCabinetResponse, PaymentForAdminResponse, PaymentsForAdminResponse,
    RegistrationResponse
} from "../responses/responses.ts";
import {createHmacInterceptor} from "./hmacSimple.ts";

const instance = axios.create({
    baseURL: 'http://localhost:5132/api/v1',
    withCredentials: true
});

instance.interceptors.request.use(
    createHmacInterceptor(() => "my-dev-secret")
);

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
    list: () => instance.get<Role[]>('/admin/roles')
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
        instance.get<ActionResponse>(`/payments/${id}`)
        .then(res => res.data),
    list: (page: Pagination) =>
        instance.get<ActionResponse[]>('/payments', {params: page})
            .then(res => res.data),
    accept: (id: number) =>
        instance.post<void>(`admin/payments/${id}/accept`)
        .then(res => res.data),
    decline: (id: number) =>
        instance.post<void>(`admin/payments/${id}/decline`)
        .then(res => res.data),
    listForAdmin: () => instance.get<PaymentsForAdminResponse[]>('/admin/payments')
        .then(res => res.data),
    infoForAdmin: (id: number) =>
        instance.get<PaymentForAdminResponse>(`/admin/payments/${id}`)
            .then(res => res.data),
}

export const TopUps = {
    create: (payment: Omit<Payment, 'id'>) =>
        instance.post<void>(`/topup/`, payment)
            .then(res => res.data),
    info: (id: number) =>
        instance.get<ActionResponse>(`/topup/${id}`)
        .then(res => res.data),
    list: (page: Pagination) =>
        instance.get<ActionResponse[]>('/topup', {params: page})
            .then(res => res.data)
}

export const User = {
    myCabinet: () =>
        instance.get<MyCabinetResponse>('/user')
        .then(res => res.data),
    history: (page: Pagination) =>
        instance.get<ActionResponse[]>('/user/history', { params: page })
            .then(res => res.data)
}