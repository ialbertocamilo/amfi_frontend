export class CreateProjectDto {
    advertiserId?: string;
    agencyId?: string;
    brand: string;
    product: string;
    projectName: string;
    bidDeadline?: Date;
    budget?: number; // Presupuesto
    extra?: Record<string, any>;

    constructor(obj: Partial<CreateProjectDto> = {}) {
        this.advertiserId = obj.advertiserId;
        this.agencyId = obj.agencyId;
        this.brand = obj.brand || '';
        this.product = obj.product || '';
        this.projectName = obj.projectName || '';
        this.bidDeadline = obj.bidDeadline;
        this.budget = obj.budget || 0;
        this.extra = obj.extra;
    }
}