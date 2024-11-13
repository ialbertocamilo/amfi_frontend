export enum EstadoProyecto {
    Borrador = 'Borrador',
    EnProgreso = 'En progreso',
    EnRevision = 'En revisión',
    Terminado = 'Terminado',
    Cerrado = 'Cerrado',
    Pausado = 'Pausado',
}
export enum ProjectStatus {
    Draft = 'draft',
    InProgress = 'inprogress',
    InRevision = 'revision',
    Finished = 'finished',
    Closed = 'closed',
    Paused = 'paused'
}


export class ProjectMapper {
    static mapProjectStatus(status: ProjectStatus): EstadoProyecto {
        switch (status) {
            case ProjectStatus.Draft:
                return EstadoProyecto.Borrador;
            case ProjectStatus.InProgress:
                return EstadoProyecto.EnProgreso;
            case ProjectStatus.InRevision:
                return EstadoProyecto.EnRevision;
            case ProjectStatus.Finished:
                return EstadoProyecto.Terminado;
            case ProjectStatus.Closed:
                return EstadoProyecto.Cerrado;
            case ProjectStatus.Paused:
                return EstadoProyecto.Pausado;
            default:
                return EstadoProyecto.Borrador;
        }
    }
    static mapRepresentationType(type: string): string {
        switch (type) {
            case 'freelance': return 'Freelance'; 
            case 'represented': return 'Representado'; 
            case 'co-represented': return 'Co-representado'; 
            default: return ''; 
        }
    }
}
