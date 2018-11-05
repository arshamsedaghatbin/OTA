export interface ITransactionRelationMySuffix {
    id?: number;
    sourceAcountId?: number;
    destinationAcountId?: number;
}

export class TransactionRelationMySuffix implements ITransactionRelationMySuffix {
    constructor(public id?: number, public sourceAcountId?: number, public destinationAcountId?: number) {}
}
