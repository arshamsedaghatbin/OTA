import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DocumentMySuffix } from 'app/shared/model/document-my-suffix.model';
import { DocumentMySuffixService } from './document-my-suffix.service';
import { DocumentMySuffixComponent } from './document-my-suffix.component';
import { DocumentMySuffixDetailComponent } from './document-my-suffix-detail.component';
import { DocumentMySuffixUpdateComponent } from './document-my-suffix-update.component';
import { DocumentMySuffixDeletePopupComponent } from './document-my-suffix-delete-dialog.component';
import { IDocumentMySuffix } from 'app/shared/model/document-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class DocumentMySuffixResolve implements Resolve<IDocumentMySuffix> {
    constructor(private service: DocumentMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DocumentMySuffix>) => response.ok),
                map((document: HttpResponse<DocumentMySuffix>) => document.body)
            );
        }
        return of(new DocumentMySuffix());
    }
}

export const documentRoute: Routes = [
    {
        path: 'document-my-suffix',
        component: DocumentMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document-my-suffix/:id/view',
        component: DocumentMySuffixDetailComponent,
        resolve: {
            document: DocumentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document-my-suffix/new',
        component: DocumentMySuffixUpdateComponent,
        resolve: {
            document: DocumentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document-my-suffix/:id/edit',
        component: DocumentMySuffixUpdateComponent,
        resolve: {
            document: DocumentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentPopupRoute: Routes = [
    {
        path: 'document-my-suffix/:id/delete',
        component: DocumentMySuffixDeletePopupComponent,
        resolve: {
            document: DocumentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
