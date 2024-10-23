export enum Role {
    Superadmin = 'super-admin', // toda la plataforma
    Support = 'support', // toda la plataforma
    CompanyOwner = 'owner', // titular agencia o anunciante
    User = 'user', // cumple funciones especificas dependiendo del tipo de compañia donde este
    Director = 'director',
}

export class UserMapper{
    static mapRole(role: string): string {
        switch (role) {
            case Role.Superadmin:
                return 'Administrador';
            case Role.Support:
                return 'Moderador';
            case Role.CompanyOwner:
                return 'Titular';
            case Role.User:
                return 'Usuario';
            case Role.Director:
                return 'Director';
            default:
                return 'Usuario';
        }
    }

    static mapCompanyType(type: string): string {
        switch (type) {
            case 'agency':
                return 'Agencia';
            case 'advertiser':
                return 'Anunciante';
            case 'production-studio':
                return 'Casa productora';
            default:
                return 'Desconocido';
        }
    }
}