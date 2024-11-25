import ApiService from "@/lib/api";
import {ITransaction} from "@/interfaces/transaction.interface";


export class CreateTransactionDto {
    amount?: number;
    currency?: string;
    status?: string;
    transactionId?: string;
    metadata?: string;
    email: string;
    planId?: string;
}

export enum TransactionStatus {
    Pending = 'pending',
    Completed = 'completed',
    Failed = 'failed',
}
export const createTransaction = async (dto: CreateTransactionDto) => {
    try {
        const response = await ApiService.post(`/transactions/`,dto);
        console.log(response.data)
        return response.data as ITransaction
    } catch (error: any) {
        console.warn(error?.response?.data?.message || 'Error creating transaction');
        return null
    }
}