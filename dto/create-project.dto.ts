
export class CreateProjectDto {
    advertiserId?: string;

    agencyId?: string;

    brand?: string;

    product?: string;

    category?: string;

    projectName?: string;

    versionName?: string;

    versionNumber?: number;
    agencyName?: string;

    agencyEmail?: string;

    agencyCreativeDirector?: string;

    agencyAccountDirector?: string;

    odtNumber?: string;

    buyerContact?: string;

    budget?: number;

    status?: string;

    projectStep?: number;

    extra?: Record<string, any>;

    constructor(obj: Partial<CreateProjectDto>) {
        Object.assign(this, obj);
    }
}