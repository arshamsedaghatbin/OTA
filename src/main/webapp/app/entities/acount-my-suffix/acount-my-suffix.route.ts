import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AcountMySuffix } from 'app/shared/model/acount-my-suffix.model';
import { AcountMySuffixService } from './acount-my-suffix.service';
import { AcountMySuffixComponent } from './acount-my-suffix.component';
import { AcountMySuffixDetailComponent } from './acount-my-suffix-detail.component';
import { AcountMySuffixUpdateComponent } from './acount-my-suffix-update.component';
import { AcountMySuffixDeletePopupComponent } from './acount-my-suffix-delete-dialog.component';
import { IAcountMySuffix } from 'app/shared/model/acount-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class AcountMySuffixResolve implements Resolve<IAcountMySuffix> {
    constructor(private service: AcountMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AcountMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AcountMySuffix>) => response.ok),
                map((acount: HttpResponse<AcountMySuffix>) => acount.body)
            );
        }
        return of(new AcountMySuffix());
    }
}

export const acountRoute: Routes = [
    {
        path: 'acount-my-suffix',
        component: AcountMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acount-my-suffix/:id/view',
        component: AcountMySuffixDetailComponent,
        resolve: {
            acount: AcountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acount-my-suffix/new',
        component: AcountMySuffixUpdateComponent,
        resolve: {
            acount: AcountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acount-my-suffix/:id/edit',
        component: AcountMySuffixUpdateComponent,
        resolve: {
            acount: AcountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acounts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acountPopupRoute: Routes = [
    {
        path: 'acount-my-suffix/:id/delete',
        component: AcountMySuffixDeletePopupComponent,
        resolve: {
            acount: AcountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Acounts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
