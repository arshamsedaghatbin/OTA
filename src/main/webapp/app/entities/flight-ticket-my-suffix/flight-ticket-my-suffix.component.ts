import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFlightTicketMySuffix } from 'app/shared/model/flight-ticket-my-suffix.model';
import { Principal } from 'app/core';
import { FlightTicketMySuffixService } from './flight-ticket-my-suffix.service';

@Component({
    selector: 'jhi-flight-ticket-my-suffix',
    templateUrl: './flight-ticket-my-suffix.component.html'
})
export class FlightTicketMySuffixComponent implements OnInit, OnDestroy {
    flightTickets: IFlightTicketMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private flightTicketService: FlightTicketMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.flightTicketService.query().subscribe(
            (res: HttpResponse<IFlightTicketMySuffix[]>) => {
                this.flightTickets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFlightTickets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFlightTicketMySuffix) {
        return item.id;
    }

    registerChangeInFlightTickets() {
        this.eventSubscriber = this.eventManager.subscribe('flightTicketListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
