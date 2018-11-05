import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtaSharedModule } from 'app/shared';
import {
    PartyMySuffixComponent,
    PartyMySuffixDetailComponent,
    PartyMySuffixUpdateComponent,
    PartyMySuffixDeletePopupComponent,
    PartyMySuffixDeleteDialogComponent,
    partyRoute,
    partyPopupRoute
} from './';

const ENTITY_STATES = [...partyRoute, ...partyPopupRoute];

@NgModule({
    imports: [OtaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PartyMySuffixComponent,
        PartyMySuffixDetailComponent,
        PartyMySuffixUpdateComponent,
        PartyMySuffixDeleteDialogComponent,
        PartyMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PartyMySuffixComponent,
        PartyMySuffixUpdateComponent,
        PartyMySuffixDeleteDialogComponent,
        PartyMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtaPartyMySuffixModule {}
