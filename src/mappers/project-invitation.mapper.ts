
export class ProjectInvitationMapper {
    static mapStatus(status: boolean | null): string {
        if (status === true) return 'Aceptado';
        if (status === null) return 'Pendiente';
        return 'Rechazado';
    }
}