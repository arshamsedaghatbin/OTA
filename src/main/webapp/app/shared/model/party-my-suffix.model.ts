import { IAddressMySuffix } from 'app/shared/model//address-my-suffix.model';
import { IFlightTicketMySuffix } from 'app/shared/model//flight-ticket-my-suffix.model';
import { IDocumentMySuffix } from 'app/shared/model//document-my-suffix.model';
import { IAcountMySuffix } from 'app/shared/model//acount-my-suffix.model';

export const enum PartyType {
    INDEVIDUAL = 'INDEVIDUAL',
    BUSINESE = 'BUSINESE'
}

export interface IPartyMySuffix {
    id?: number;
    uuid?: string;
    pertyType?: PartyType;
    relationId?: number;
    adsresses?: IAddressMySuffix[];
    flighttickets?: IFlightTicketMySuffix[];
    documents?: IDocumentMySuffix[];
    acounts?: IAcountMySuffix[];
}

export class PartyMySuffix implements IPartyMySuffix {
    constructor(
        public id?: number,
        public uuid?: string,
        public pertyType?: PartyType,
        public relationId?: number,
        public adsresses?: IAddressMySuffix[],
        public flighttickets?: IFlightTicketMySuffix[],
        public documents?: IDocumentMySuffix[],
        public acounts?: IAcountMySuffix[]
    ) {}
}
