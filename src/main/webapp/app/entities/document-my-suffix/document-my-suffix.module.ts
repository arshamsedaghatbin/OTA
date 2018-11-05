import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtaSharedModule } from 'app/shared';
import {
    DocumentMySuffixComponent,
    DocumentMySuffixDetailComponent,
    DocumentMySuffixUpdateComponent,
    DocumentMySuffixDeletePopupComponent,
    DocumentMySuffixDeleteDialogComponent,
    documentRoute,
    documentPopupRoute
} from './';

const ENTITY_STATES = [...documentRoute, ...documentPopupRoute];

@NgModule({
    imports: [OtaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentMySuffixComponent,
        DocumentMySuffixDetailComponent,
        DocumentMySuffixUpdateComponent,
        DocumentMySuffixDeleteDialogComponent,
        DocumentMySuffixDeletePopupComponent
    ],
    entryComponents: [
        DocumentMySuffixComponent,
        DocumentMySuffixUpdateComponent,
        DocumentMySuffixDeleteDialogComponent,
        DocumentMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtaDocumentMySuffixModule {}
