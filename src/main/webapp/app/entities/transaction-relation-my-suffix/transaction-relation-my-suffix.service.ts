import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransactionRelationMySuffix } from 'app/shared/model/transaction-relation-my-suffix.model';

type EntityResponseType = HttpResponse<ITransactionRelationMySuffix>;
type EntityArrayResponseType = HttpResponse<ITransactionRelationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TransactionRelationMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/transaction-relations';

    constructor(private http: HttpClient) {}

    create(transactionRelation: ITransactionRelationMySuffix): Observable<EntityResponseType> {
        return this.http.post<ITransactionRelationMySuffix>(this.resourceUrl, transactionRelation, { observe: 'response' });
    }

    update(transactionRelation: ITransactionRelationMySuffix): Observable<EntityResponseType> {
        return this.http.put<ITransactionRelationMySuffix>(this.resourceUrl, transactionRelation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITransactionRelationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITransactionRelationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
