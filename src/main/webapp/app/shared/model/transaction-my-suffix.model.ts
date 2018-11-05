import { Moment } from 'moment';

export interface ITransactionMySuffix {
    id?: number;
    transactiondate?: Moment;
    transactionNumber?: string;
    transactionAmount?: number;
    acountId?: number;
    transactionRelationId?: number;
    transactionId?: number;
}

export class TransactionMySuffix implements ITransactionMySuffix {
    constructor(
        public id?: number,
        public transactiondate?: Moment,
        public transactionNumber?: string,
        public transactionAmount?: number,
        public acountId?: number,
        public transactionRelationId?: number,
        public transactionId?: number
    ) {}
}
