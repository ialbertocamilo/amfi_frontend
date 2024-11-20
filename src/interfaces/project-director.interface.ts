import {ICompany} from "./company.interface";
import {IDirector} from "./director.interface";
import {IProject} from "./project.interface";

export interface ProjectDirectorInvited {
    accepted: boolean;
    createdAt: string;
    director: IDirector;
    id: string;
    productionHouse: ICompany;
    project: IProject;
    updatedAt: string;
    proposalUploaded: boolean
}

export interface CheckProjectInvitationStatusResponse {

    message: string;
    result: {
        director: IDirector;
        accepted: boolean;
        project: IProject;
        proposalUploaded: boolean;
    };

}