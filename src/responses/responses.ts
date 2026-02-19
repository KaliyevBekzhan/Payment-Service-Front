export interface RegistrationResponse {
    name: string;
    role: string;
    walletNumber: string;
    account: number;
}

export interface LoginResponse {
    role: string;
}

export interface ActionResponse {
    originalAmount: number;
    currency: string;
    amountInTenge: number;
    status: string;
    comment: string;
}

export interface MeResponse {
    id: number;
    role: string;
}

export interface MyCabinetResponse {
    name: string;
    account: number;
    walletNumber: string;
    payments: ActionResponse[];
}

