export interface IFlightTicketMySuffix {
    id?: number;
    tcketId?: string;
    partyId?: number;
}

export class FlightTicketMySuffix implements IFlightTicketMySuffix {
    constructor(public id?: number, public tcketId?: string, public partyId?: number) {}
}
