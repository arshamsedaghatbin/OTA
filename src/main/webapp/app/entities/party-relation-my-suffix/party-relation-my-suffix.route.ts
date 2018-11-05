import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PartyRelationMySuffix } from 'app/shared/model/party-relation-my-suffix.model';
import { PartyRelationMySuffixService } from './party-relation-my-suffix.service';
import { PartyRelationMySuffixComponent } from './party-relation-my-suffix.component';
import { PartyRelationMySuffixDetailComponent } from './party-relation-my-suffix-detail.component';
import { PartyRelationMySuffixUpdateComponent } from './party-relation-my-suffix-update.component';
import { PartyRelationMySuffixDeletePopupComponent } from './party-relation-my-suffix-delete-dialog.component';
import { IPartyRelationMySuffix } from 'app/shared/model/party-relation-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PartyRelationMySuffixResolve implements Resolve<IPartyRelationMySuffix> {
    constructor(private service: PartyRelationMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PartyRelationMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PartyRelationMySuffix>) => response.ok),
                map((partyRelation: HttpResponse<PartyRelationMySuffix>) => partyRelation.body)
            );
        }
        return of(new PartyRelationMySuffix());
    }
}

export const partyRelationRoute: Routes = [
    {
        path: 'party-relation-my-suffix',
        component: PartyRelationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PartyRelations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'party-relation-my-suffix/:id/view',
        component: PartyRelationMySuffixDetailComponent,
        resolve: {
            partyRelation: PartyRelationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PartyRelations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'party-relation-my-suffix/new',
        component: PartyRelationMySuffixUpdateComponent,
        resolve: {
            partyRelation: PartyRelationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PartyRelations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'party-relation-my-suffix/:id/edit',
        component: PartyRelationMySuffixUpdateComponent,
        resolve: {
            partyRelation: PartyRelationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PartyRelations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const partyRelationPopupRoute: Routes = [
    {
        path: 'party-relation-my-suffix/:id/delete',
        component: PartyRelationMySuffixDeletePopupComponent,
        resolve: {
            partyRelation: PartyRelationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PartyRelations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
