export const enum PartyRelationType {
    USER = 'USER',
    COUNTER = 'COUNTER',
    MERCHANT = 'MERCHANT'
}

export interface IPartyRelationMySuffix {
    id?: number;
    partyRelation?: PartyRelationType;
    fromPartyId?: number;
    toPartyId?: number;
}

export class PartyRelationMySuffix implements IPartyRelationMySuffix {
    constructor(public id?: number, public partyRelation?: PartyRelationType, public fromPartyId?: number, public toPartyId?: number) {}
}
