import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFlightTicketMySuffix } from 'app/shared/model/flight-ticket-my-suffix.model';

@Component({
    selector: 'jhi-flight-ticket-my-suffix-detail',
    templateUrl: './flight-ticket-my-suffix-detail.component.html'
})
export class FlightTicketMySuffixDetailComponent implements OnInit {
    flightTicket: IFlightTicketMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flightTicket }) => {
            this.flightTicket = flightTicket;
        });
    }

    previousState() {
        window.history.back();
    }
}
