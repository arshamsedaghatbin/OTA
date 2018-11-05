import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFlightTicketMySuffix } from 'app/shared/model/flight-ticket-my-suffix.model';

type EntityResponseType = HttpResponse<IFlightTicketMySuffix>;
type EntityArrayResponseType = HttpResponse<IFlightTicketMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class FlightTicketMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/flight-tickets';

    constructor(private http: HttpClient) {}

    create(flightTicket: IFlightTicketMySuffix): Observable<EntityResponseType> {
        return this.http.post<IFlightTicketMySuffix>(this.resourceUrl, flightTicket, { observe: 'response' });
    }

    update(flightTicket: IFlightTicketMySuffix): Observable<EntityResponseType> {
        return this.http.put<IFlightTicketMySuffix>(this.resourceUrl, flightTicket, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFlightTicketMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFlightTicketMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
