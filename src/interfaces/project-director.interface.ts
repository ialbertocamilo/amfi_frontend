import {ICompany} from "./company.interface";
import {IDirector} from "./director.interface";
import {IProject} from "./project.interface";
import {IPostulationData} from "@/api/postulationApi";

export interface IProjectInvitation {
    accepted: boolean;
    createdAt: Date;
    director: IDirector;
    id: string;
    productionHouse: ICompany;
    project: IProject;
    updatedAt: string;
    proposalUploaded: boolean
    evaluation:object
}

export interface CheckProjectInvitationStatusResponse {

    message: string;
    result: IPostulationData

}