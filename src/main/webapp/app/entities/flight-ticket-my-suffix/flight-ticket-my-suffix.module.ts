import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtaSharedModule } from 'app/shared';
import {
    FlightTicketMySuffixComponent,
    FlightTicketMySuffixDetailComponent,
    FlightTicketMySuffixUpdateComponent,
    FlightTicketMySuffixDeletePopupComponent,
    FlightTicketMySuffixDeleteDialogComponent,
    flightTicketRoute,
    flightTicketPopupRoute
} from './';

const ENTITY_STATES = [...flightTicketRoute, ...flightTicketPopupRoute];

@NgModule({
    imports: [OtaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FlightTicketMySuffixComponent,
        FlightTicketMySuffixDetailComponent,
        FlightTicketMySuffixUpdateComponent,
        FlightTicketMySuffixDeleteDialogComponent,
        FlightTicketMySuffixDeletePopupComponent
    ],
    entryComponents: [
        FlightTicketMySuffixComponent,
        FlightTicketMySuffixUpdateComponent,
        FlightTicketMySuffixDeleteDialogComponent,
        FlightTicketMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtaFlightTicketMySuffixModule {}
