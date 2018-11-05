import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtaSharedModule } from 'app/shared';
import {
    TransactionRelationMySuffixComponent,
    TransactionRelationMySuffixDetailComponent,
    TransactionRelationMySuffixUpdateComponent,
    TransactionRelationMySuffixDeletePopupComponent,
    TransactionRelationMySuffixDeleteDialogComponent,
    transactionRelationRoute,
    transactionRelationPopupRoute
} from './';

const ENTITY_STATES = [...transactionRelationRoute, ...transactionRelationPopupRoute];

@NgModule({
    imports: [OtaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransactionRelationMySuffixComponent,
        TransactionRelationMySuffixDetailComponent,
        TransactionRelationMySuffixUpdateComponent,
        TransactionRelationMySuffixDeleteDialogComponent,
        TransactionRelationMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TransactionRelationMySuffixComponent,
        TransactionRelationMySuffixUpdateComponent,
        TransactionRelationMySuffixDeleteDialogComponent,
        TransactionRelationMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtaTransactionRelationMySuffixModule {}
