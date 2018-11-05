import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';

type EntityResponseType = HttpResponse<ITransactionMySuffix>;
type EntityArrayResponseType = HttpResponse<ITransactionMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TransactionMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/transactions';

    constructor(private http: HttpClient) {}

    create(transaction: ITransactionMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transaction);
        return this.http
            .post<ITransactionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(transaction: ITransactionMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transaction);
        return this.http
            .put<ITransactionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITransactionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITransactionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(transaction: ITransactionMySuffix): ITransactionMySuffix {
        const copy: ITransactionMySuffix = Object.assign({}, transaction, {
            transactiondate:
                transaction.transactiondate != null && transaction.transactiondate.isValid() ? transaction.transactiondate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.transactiondate = res.body.transactiondate != null ? moment(res.body.transactiondate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((transaction: ITransactionMySuffix) => {
                transaction.transactiondate = transaction.transactiondate != null ? moment(transaction.transactiondate) : null;
            });
        }
        return res;
    }
}
