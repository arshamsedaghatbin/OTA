import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtaSharedModule } from 'app/shared';
import {
    AcountMySuffixComponent,
    AcountMySuffixDetailComponent,
    AcountMySuffixUpdateComponent,
    AcountMySuffixDeletePopupComponent,
    AcountMySuffixDeleteDialogComponent,
    acountRoute,
    acountPopupRoute
} from './';

const ENTITY_STATES = [...acountRoute, ...acountPopupRoute];

@NgModule({
    imports: [OtaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AcountMySuffixComponent,
        AcountMySuffixDetailComponent,
        AcountMySuffixUpdateComponent,
        AcountMySuffixDeleteDialogComponent,
        AcountMySuffixDeletePopupComponent
    ],
    entryComponents: [
        AcountMySuffixComponent,
        AcountMySuffixUpdateComponent,
        AcountMySuffixDeleteDialogComponent,
        AcountMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtaAcountMySuffixModule {}
