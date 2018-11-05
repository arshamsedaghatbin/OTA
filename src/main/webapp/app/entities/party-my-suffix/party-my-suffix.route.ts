import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PartyMySuffix } from 'app/shared/model/party-my-suffix.model';
import { PartyMySuffixService } from './party-my-suffix.service';
import { PartyMySuffixComponent } from './party-my-suffix.component';
import { PartyMySuffixDetailComponent } from './party-my-suffix-detail.component';
import { PartyMySuffixUpdateComponent } from './party-my-suffix-update.component';
import { PartyMySuffixDeletePopupComponent } from './party-my-suffix-delete-dialog.component';
import { IPartyMySuffix } from 'app/shared/model/party-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PartyMySuffixResolve implements Resolve<IPartyMySuffix> {
    constructor(private service: PartyMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PartyMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PartyMySuffix>) => response.ok),
                map((party: HttpResponse<PartyMySuffix>) => party.body)
            );
        }
        return of(new PartyMySuffix());
    }
}

export const partyRoute: Routes = [
    {
        path: 'party-my-suffix',
        component: PartyMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parties'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'party-my-suffix/:id/view',
        component: PartyMySuffixDetailComponent,
        resolve: {
            party: PartyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parties'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'party-my-suffix/new',
        component: PartyMySuffixUpdateComponent,
        resolve: {
            party: PartyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parties'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'party-my-suffix/:id/edit',
        component: PartyMySuffixUpdateComponent,
        resolve: {
            party: PartyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parties'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const partyPopupRoute: Routes = [
    {
        path: 'party-my-suffix/:id/delete',
        component: PartyMySuffixDeletePopupComponent,
        resolve: {
            party: PartyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parties'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
