import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPartyMySuffix } from 'app/shared/model/party-my-suffix.model';

type EntityResponseType = HttpResponse<IPartyMySuffix>;
type EntityArrayResponseType = HttpResponse<IPartyMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PartyMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/parties';

    constructor(private http: HttpClient) {}

    create(party: IPartyMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPartyMySuffix>(this.resourceUrl, party, { observe: 'response' });
    }

    update(party: IPartyMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPartyMySuffix>(this.resourceUrl, party, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPartyMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPartyMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
