import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtaSharedModule } from 'app/shared';
import {
    PartyRelationMySuffixComponent,
    PartyRelationMySuffixDetailComponent,
    PartyRelationMySuffixUpdateComponent,
    PartyRelationMySuffixDeletePopupComponent,
    PartyRelationMySuffixDeleteDialogComponent,
    partyRelationRoute,
    partyRelationPopupRoute
} from './';

const ENTITY_STATES = [...partyRelationRoute, ...partyRelationPopupRoute];

@NgModule({
    imports: [OtaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PartyRelationMySuffixComponent,
        PartyRelationMySuffixDetailComponent,
        PartyRelationMySuffixUpdateComponent,
        PartyRelationMySuffixDeleteDialogComponent,
        PartyRelationMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PartyRelationMySuffixComponent,
        PartyRelationMySuffixUpdateComponent,
        PartyRelationMySuffixDeleteDialogComponent,
        PartyRelationMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtaPartyRelationMySuffixModule {}
