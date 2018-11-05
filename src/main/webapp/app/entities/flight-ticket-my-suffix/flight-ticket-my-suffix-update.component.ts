import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFlightTicketMySuffix } from 'app/shared/model/flight-ticket-my-suffix.model';
import { FlightTicketMySuffixService } from './flight-ticket-my-suffix.service';
import { IPartyMySuffix } from 'app/shared/model/party-my-suffix.model';
import { PartyMySuffixService } from 'app/entities/party-my-suffix';

@Component({
    selector: 'jhi-flight-ticket-my-suffix-update',
    templateUrl: './flight-ticket-my-suffix-update.component.html'
})
export class FlightTicketMySuffixUpdateComponent implements OnInit {
    flightTicket: IFlightTicketMySuffix;
    isSaving: boolean;

    parties: IPartyMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private flightTicketService: FlightTicketMySuffixService,
        private partyService: PartyMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ flightTicket }) => {
            this.flightTicket = flightTicket;
        });
        this.partyService.query().subscribe(
            (res: HttpResponse<IPartyMySuffix[]>) => {
                this.parties = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.flightTicket.id !== undefined) {
            this.subscribeToSaveResponse(this.flightTicketService.update(this.flightTicket));
        } else {
            this.subscribeToSaveResponse(this.flightTicketService.create(this.flightTicket));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFlightTicketMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IFlightTicketMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPartyById(index: number, item: IPartyMySuffix) {
        return item.id;
    }
}
