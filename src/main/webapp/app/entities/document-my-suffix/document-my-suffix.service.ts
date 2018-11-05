import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocumentMySuffix } from 'app/shared/model/document-my-suffix.model';

type EntityResponseType = HttpResponse<IDocumentMySuffix>;
type EntityArrayResponseType = HttpResponse<IDocumentMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class DocumentMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/documents';

    constructor(private http: HttpClient) {}

    create(document: IDocumentMySuffix): Observable<EntityResponseType> {
        return this.http.post<IDocumentMySuffix>(this.resourceUrl, document, { observe: 'response' });
    }

    update(document: IDocumentMySuffix): Observable<EntityResponseType> {
        return this.http.put<IDocumentMySuffix>(this.resourceUrl, document, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDocumentMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDocumentMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
