export const enum AddresType {
    MOBILE = 'MOBILE',
    PHONE = 'PHONE',
    ADDRESS = 'ADDRESS'
}

export interface IAddressMySuffix {
    id?: number;
    addresType?: AddresType;
    description?: string;
    partyId?: number;
}

export class AddressMySuffix implements IAddressMySuffix {
    constructor(public id?: number, public addresType?: AddresType, public description?: string, public partyId?: number) {}
}
