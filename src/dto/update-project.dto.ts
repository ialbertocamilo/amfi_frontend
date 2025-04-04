export class UpdateProjectDto {
  id?:string
  advertiserId?: string;
  agencyId?: string;
  brand?: string;
  product?: string;
  projectName?: string;
  bidDeadline?: Date;
  budget?: number;
  extra?: Record<string, any>;
  status?: string;
  step?: number;
  isFinancialInfoUnlocked?: boolean;
  maxProducers?: number;
  projectStep?: number;
  unlockedForAgency?: boolean;
  constructor(obj: Partial<UpdateProjectDto> = {}) {
    this.id = obj.id;
    this.advertiserId = obj.advertiserId;
    this.agencyId = obj.agencyId;
    this.brand = obj.brand;
    this.product = obj.product;
    this.projectName = obj.projectName;
    this.bidDeadline = obj.bidDeadline ? new Date(obj.bidDeadline) : undefined;
    this.budget = obj.budget;
    this.extra = obj.extra;
    this.status = obj.status;
    this.step = obj.step;
    this.isFinancialInfoUnlocked = obj.isFinancialInfoUnlocked;
    this.maxProducers = obj.maxProducers;
    this.projectStep = obj.projectStep;
    this.unlockedForAgency=obj.unlockedForAgency;
  }
}