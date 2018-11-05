import { ITransactionMySuffix } from 'app/shared/model//transaction-my-suffix.model';

export const enum AcountType {
    VALET = 'VALET',
    CREDIT = 'CREDIT'
}

export interface IAcountMySuffix {
    id?: number;
    acountNumber?: string;
    balance?: number;
    acountType?: AcountType;
    partyId?: number;
    transactions?: ITransactionMySuffix[];
    adsressId?: number;
}

export class AcountMySuffix implements IAcountMySuffix {
    constructor(
        public id?: number,
        public acountNumber?: string,
        public balance?: number,
        public acountType?: AcountType,
        public partyId?: number,
        public transactions?: ITransactionMySuffix[],
        public adsressId?: number
    ) {}
}
