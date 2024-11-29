
export interface IInvitationData{
    accepted: boolean;
    invitationId:string;
    projectName:string
}
export interface IInvitationResponse{
    message: string;
    result: IInvitationData
}