import {IUser} from "@/interfaces/user.interface";
import {TransactionStatus} from "@/api/transactionApi";
import {IPlan} from "@/interfaces/plan.interface";

export interface ITransaction {
    id: string;
    user?: IUser;
    plan?: IPlan;
    amount?: number;
    currency?: string;
    status: TransactionStatus;
    transactionId?: string;
    metadata?: string;
    createdAt: Date;
    email?: string;
}