import ApiService from "@/lib/api";


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
    console.log('create transaction')
    try {
        const response = await ApiService.post(`/transactions/`,dto);
        console.log(response.data)
        return response.data
    } catch (error: any) {
        console.warn(error?.response?.data?.message || 'Error creating transaction');
        return null
    }
}