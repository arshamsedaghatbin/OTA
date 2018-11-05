import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtaSharedModule } from 'app/shared';
import {
    TransactionMySuffixComponent,
    TransactionMySuffixDetailComponent,
    TransactionMySuffixUpdateComponent,
    TransactionMySuffixDeletePopupComponent,
    TransactionMySuffixDeleteDialogComponent,
    transactionRoute,
    transactionPopupRoute
} from './';

const ENTITY_STATES = [...transactionRoute, ...transactionPopupRoute];

@NgModule({
    imports: [OtaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransactionMySuffixComponent,
        TransactionMySuffixDetailComponent,
        TransactionMySuffixUpdateComponent,
        TransactionMySuffixDeleteDialogComponent,
        TransactionMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TransactionMySuffixComponent,
        TransactionMySuffixUpdateComponent,
        TransactionMySuffixDeleteDialogComponent,
        TransactionMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtaTransactionMySuffixModule {}
