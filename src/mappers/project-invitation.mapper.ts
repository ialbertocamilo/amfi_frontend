
export class ProjectInvitationMapper {
    static mapStatus(status: boolean | null): string {
        if (status === true) return 'Invitación aceptada';
        if (status === null) return 'Invitación pendiente';
        return 'Invitación rechazada';
    }
}