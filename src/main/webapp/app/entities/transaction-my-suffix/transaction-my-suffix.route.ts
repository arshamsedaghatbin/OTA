import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';
import { TransactionMySuffixService } from './transaction-my-suffix.service';
import { TransactionMySuffixComponent } from './transaction-my-suffix.component';
import { TransactionMySuffixDetailComponent } from './transaction-my-suffix-detail.component';
import { TransactionMySuffixUpdateComponent } from './transaction-my-suffix-update.component';
import { TransactionMySuffixDeletePopupComponent } from './transaction-my-suffix-delete-dialog.component';
import { ITransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TransactionMySuffixResolve implements Resolve<ITransactionMySuffix> {
    constructor(private service: TransactionMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TransactionMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TransactionMySuffix>) => response.ok),
                map((transaction: HttpResponse<TransactionMySuffix>) => transaction.body)
            );
        }
        return of(new TransactionMySuffix());
    }
}

export const transactionRoute: Routes = [
    {
        path: 'transaction-my-suffix',
        component: TransactionMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Transactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-my-suffix/:id/view',
        component: TransactionMySuffixDetailComponent,
        resolve: {
            transaction: TransactionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Transactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-my-suffix/new',
        component: TransactionMySuffixUpdateComponent,
        resolve: {
            transaction: TransactionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Transactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-my-suffix/:id/edit',
        component: TransactionMySuffixUpdateComponent,
        resolve: {
            transaction: TransactionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Transactions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionPopupRoute: Routes = [
    {
        path: 'transaction-my-suffix/:id/delete',
        component: TransactionMySuffixDeletePopupComponent,
        resolve: {
            transaction: TransactionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Transactions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
