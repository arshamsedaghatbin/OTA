import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPartyMySuffix } from 'app/shared/model/party-my-suffix.model';
import { Principal } from 'app/core';
import { PartyMySuffixService } from './party-my-suffix.service';

@Component({
    selector: 'jhi-party-my-suffix',
    templateUrl: './party-my-suffix.component.html'
})
export class PartyMySuffixComponent implements OnInit, OnDestroy {
    parties: IPartyMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private partyService: PartyMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.partyService.query().subscribe(
            (res: HttpResponse<IPartyMySuffix[]>) => {
                this.parties = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInParties();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPartyMySuffix) {
        return item.id;
    }

    registerChangeInParties() {
        this.eventSubscriber = this.eventManager.subscribe('partyListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
