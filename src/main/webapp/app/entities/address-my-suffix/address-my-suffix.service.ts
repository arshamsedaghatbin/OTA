import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAddressMySuffix } from 'app/shared/model/address-my-suffix.model';

type EntityResponseType = HttpResponse<IAddressMySuffix>;
type EntityArrayResponseType = HttpResponse<IAddressMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class AddressMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/addresses';

    constructor(private http: HttpClient) {}

    create(address: IAddressMySuffix): Observable<EntityResponseType> {
        return this.http.post<IAddressMySuffix>(this.resourceUrl, address, { observe: 'response' });
    }

    update(address: IAddressMySuffix): Observable<EntityResponseType> {
        return this.http.put<IAddressMySuffix>(this.resourceUrl, address, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAddressMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAddressMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
