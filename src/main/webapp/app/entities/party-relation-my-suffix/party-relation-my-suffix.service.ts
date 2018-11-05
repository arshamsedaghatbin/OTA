import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPartyRelationMySuffix } from 'app/shared/model/party-relation-my-suffix.model';

type EntityResponseType = HttpResponse<IPartyRelationMySuffix>;
type EntityArrayResponseType = HttpResponse<IPartyRelationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PartyRelationMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/party-relations';

    constructor(private http: HttpClient) {}

    create(partyRelation: IPartyRelationMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPartyRelationMySuffix>(this.resourceUrl, partyRelation, { observe: 'response' });
    }

    update(partyRelation: IPartyRelationMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPartyRelationMySuffix>(this.resourceUrl, partyRelation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPartyRelationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPartyRelationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
