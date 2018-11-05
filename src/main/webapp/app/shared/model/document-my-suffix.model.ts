export const enum DocumenntType {
    DOC = 'DOC'
}

export interface IDocumentMySuffix {
    id?: number;
    addresType?: DocumenntType;
    description?: string;
    partyId?: number;
    partyId?: number;
}

export class DocumentMySuffix implements IDocumentMySuffix {
    constructor(
        public id?: number,
        public addresType?: DocumenntType,
        public description?: string,
        public partyId?: number,
        public partyId?: number
    ) {}
}
