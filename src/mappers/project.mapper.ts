export enum EstadoProyecto {
    Borrador = 'Borrador',
    EnProgreso = 'En progreso',
    EnRevision = 'En revisión',
    Terminado = 'Terminado',
    Cerrado = 'Cerrado',
}
export enum ProjectStatus {
    Draft = 'draft',
    InProgress = 'inprogress',
    InRevision = 'revision',
    Finished = 'finished',
    Closed = 'closed',
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
            default:
                return EstadoProyecto.Borrador;
        }
    }
}
