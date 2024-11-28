import {IUser} from "@/interfaces/user.interface";


export interface IPostulation{
    id?:string
    createdAt:Date
    user: IUser,
    metadata: Record<string, any>
    status: string
}