export class CreateDirectorDto {
    name?: string;
    lastname?: string;
    nationality: string = 'Mexicana';
    birthDate?: string | null;
    isMexicanResident?: boolean = true;
    representation?: string;
    startedExperienceYear?: number;
    nationalIdentifierOrRFC?: string;

    constructor(obj: Partial<CreateDirectorDto> = {}) {
        Object.assign(this, obj);
    }
}
export class UpdateDirectorDto extends CreateDirectorDto {
    id?: string
    constructor(obj: Partial<CreateDirectorDto> = {}) {
        super(obj);
        Object.assign(this, obj);
    }
}