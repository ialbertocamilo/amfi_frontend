import {ICompany} from "./company.interface";
import {IDirector} from "./director.interface";
import {IProject} from "./project.interface";
import {IPostulation} from "@/interfaces/postulation.interface";

export interface IProjectInvitation {
    accepted: boolean;
    createdAt: Date;
    director: IDirector;
    id: string;
    productionHouse: ICompany;
    project: IProject;
    updatedAt: string;
    proposalUploaded: boolean
    evaluation: object
    postulation?: IPostulation
}

export interface CheckProjectInvitationStatusResponse {

    message: string;
    result: IProjectInvitation

}