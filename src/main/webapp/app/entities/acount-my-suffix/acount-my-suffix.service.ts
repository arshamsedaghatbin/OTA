import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcountMySuffix } from 'app/shared/model/acount-my-suffix.model';

type EntityResponseType = HttpResponse<IAcountMySuffix>;
type EntityArrayResponseType = HttpResponse<IAcountMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class AcountMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/acounts';

    constructor(private http: HttpClient) {}

    create(acount: IAcountMySuffix): Observable<EntityResponseType> {
        return this.http.post<IAcountMySuffix>(this.resourceUrl, acount, { observe: 'response' });
    }

    update(acount: IAcountMySuffix): Observable<EntityResponseType> {
        return this.http.put<IAcountMySuffix>(this.resourceUrl, acount, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAcountMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAcountMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
