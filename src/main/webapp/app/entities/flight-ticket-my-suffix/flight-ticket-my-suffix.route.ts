import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FlightTicketMySuffix } from 'app/shared/model/flight-ticket-my-suffix.model';
import { FlightTicketMySuffixService } from './flight-ticket-my-suffix.service';
import { FlightTicketMySuffixComponent } from './flight-ticket-my-suffix.component';
import { FlightTicketMySuffixDetailComponent } from './flight-ticket-my-suffix-detail.component';
import { FlightTicketMySuffixUpdateComponent } from './flight-ticket-my-suffix-update.component';
import { FlightTicketMySuffixDeletePopupComponent } from './flight-ticket-my-suffix-delete-dialog.component';
import { IFlightTicketMySuffix } from 'app/shared/model/flight-ticket-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class FlightTicketMySuffixResolve implements Resolve<IFlightTicketMySuffix> {
    constructor(private service: FlightTicketMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FlightTicketMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FlightTicketMySuffix>) => response.ok),
                map((flightTicket: HttpResponse<FlightTicketMySuffix>) => flightTicket.body)
            );
        }
        return of(new FlightTicketMySuffix());
    }
}

export const flightTicketRoute: Routes = [
    {
        path: 'flight-ticket-my-suffix',
        component: FlightTicketMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightTickets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-ticket-my-suffix/:id/view',
        component: FlightTicketMySuffixDetailComponent,
        resolve: {
            flightTicket: FlightTicketMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightTickets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-ticket-my-suffix/new',
        component: FlightTicketMySuffixUpdateComponent,
        resolve: {
            flightTicket: FlightTicketMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightTickets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-ticket-my-suffix/:id/edit',
        component: FlightTicketMySuffixUpdateComponent,
        resolve: {
            flightTicket: FlightTicketMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightTickets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flightTicketPopupRoute: Routes = [
    {
        path: 'flight-ticket-my-suffix/:id/delete',
        component: FlightTicketMySuffixDeletePopupComponent,
        resolve: {
            flightTicket: FlightTicketMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightTickets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
