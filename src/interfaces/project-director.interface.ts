import {ICompany} from "./company.interface";
import {IDirector} from "./director.interface";
import {IProject} from "./project.interface";
import {IPostulation} from "@/interfaces/postulation.interface";
import { IUser } from "./user.interface";
import { Budget, Evaluation } from "@/api/interface/api.interface";

export interface IProjectInvitation {
    accepted: boolean;
    proposalUploaded: boolean
    createdAt: Date;
    director: IDirector;
    id: string;
    productionHouse: ICompany;
    project: IProject;
    updatedAt: string;
    evaluation: Evaluation | null;
    budget: Budget | null;

    createdBy?: IUser
    postulation?: IPostulation
}

export interface CheckProjectInvitationStatusResponse {

    message: string;
    result: IProjectInvitation

}