export interface Currency {
    id: number;
    name: string;
    conversionRate?: number;
}

export interface Role {
    id: number;
    name: string;
    priority: number;
    readonly isAdmin?: boolean;
}

export interface Status {
    id: number;
    name: string;
    readonly isViewable: boolean;
}

export interface User {
    id: number;
    name: string;
    iin: string;
    readonly walletNumber?: string;
    readonly account?: number;
    password?: string;
    role: Role;
    roleId?: number;
}

export interface Payment {
    id?: number;
    userId?: number;
    readonly originalAmount: number;
    currency?: Currency;
    currencyId?: number;
    comment: string;
    status?: Status;
    statusId?: number;
    createdAt?: string;
    readonly walletNumber?: string;
    readonly account?: number;
    readonly amountInTenge?: number;
    changerId?: number;
    changer?: User;
}

export interface TopUp {
    id: number;
    userId?: number;
    readonly originalAmount: number;
    currency?: Currency;
    currencyId?: number;
    comment: string;
    status?: Status;
    statusId?: number;
    createdAt?: string;
    readonly walletNumber?: string;
    readonly account?: number;
    readonly amountInTenge?: number;
}

export interface Registration {
    iin: string;
    password: string;
    name: string;
}