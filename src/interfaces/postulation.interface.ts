import { IUser } from "@/interfaces/user.interface";
import { IProjectInvitation } from "@/interfaces/project-director.interface";

export interface IPostulation {
  id?: string;
  createdAt: Date;
  user: IUser;
  metadata: Record<string, any>;
  status: string;
  projectInvitation: IProjectInvitation;
}
