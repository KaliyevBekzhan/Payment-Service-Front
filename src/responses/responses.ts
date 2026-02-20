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
    id: number;
    originalAmount: number;
    currency: string;
    amountInTenge: number;
    status: string;
    comment: string;
    transType: "Payment" | "TopUp";
    accountAtTheTimeOfPayment?: number;
    createdAt: string;
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

export interface PaymentsForAdminResponse {
    userName: string,
    originalAmount: number,
    amountInTenge: number,
    account: number,
    walletNumber: string,
    currency: string,
    paymentId: number,
    role: string,
    createdAt: string
}

export interface PaymentForAdminResponse {
    id: number,
    userId: number,
    userName: string,
    originalAmount: number,
    currency: string,
    amountInTenge: number,
    account: number,
    createdAt: string,
    walletNumber: string,
    comment: string,
    status: string,
    changerId: number,
    changerName: string
}