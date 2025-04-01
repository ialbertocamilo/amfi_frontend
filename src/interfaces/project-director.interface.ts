import { Budget, Evaluation } from "@/api/interface/api.interface";
import { IPostulation } from "@/interfaces/postulation.interface";
import { ProjectStatus } from "@/mappers/project.mapper";
import { ICompany } from "./company.interface";
import { IDirector } from "./director.interface";
import { IProject } from "./project.interface";
import { IUser } from "./user.interface";

export interface IProjectInvitation {
  accepted: boolean;
  proposalUploaded: boolean;
  createdAt: Date;
  director: IDirector;
  id: string;
  productionHouse: ICompany;
  project: IProject;
  updatedAt: string;
  evaluation: Evaluation | null;
  budget: Budget | null;
  createdBy?: IUser;
  postulation?: IPostulation;
  status?: ProjectStatus;
  isWinner?: boolean;
  message?: string;
}

export interface CheckProjectInvitationStatusResponse {
  message: string;
  result: IProjectInvitation;
}
