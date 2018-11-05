import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TransactionRelationMySuffix } from 'app/shared/model/transaction-relation-my-suffix.model';
import { TransactionRelationMySuffixService } from './transaction-relation-my-suffix.service';
import { TransactionRelationMySuffixComponent } from './transaction-relation-my-suffix.component';
import { TransactionRelationMySuffixDetailComponent } from './transaction-relation-my-suffix-detail.component';
import { TransactionRelationMySuffixUpdateComponent } from './transaction-relation-my-suffix-update.component';
import { TransactionRelationMySuffixDeletePopupComponent } from './transaction-relation-my-suffix-delete-dialog.component';
import { ITransactionRelationMySuffix } from 'app/shared/model/transaction-relation-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TransactionRelationMySuffixResolve implements Resolve<ITransactionRelationMySuffix> {
    constructor(private service: TransactionRelationMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TransactionRelationMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TransactionRelationMySuffix>) => response.ok),
                map((transactionRelation: HttpResponse<TransactionRelationMySuffix>) => transactionRelation.body)
            );
        }
        return of(new TransactionRelationMySuffix());
    }
}

export const transactionRelationRoute: Routes = [
    {
        path: 'transaction-relation-my-suffix',
        component: TransactionRelationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionRelations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-relation-my-suffix/:id/view',
        component: TransactionRelationMySuffixDetailComponent,
        resolve: {
            transactionRelation: TransactionRelationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionRelations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-relation-my-suffix/new',
        component: TransactionRelationMySuffixUpdateComponent,
        resolve: {
            transactionRelation: TransactionRelationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionRelations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-relation-my-suffix/:id/edit',
        component: TransactionRelationMySuffixUpdateComponent,
        resolve: {
            transactionRelation: TransactionRelationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionRelations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionRelationPopupRoute: Routes = [
    {
        path: 'transaction-relation-my-suffix/:id/delete',
        component: TransactionRelationMySuffixDeletePopupComponent,
        resolve: {
            transactionRelation: TransactionRelationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionRelations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
