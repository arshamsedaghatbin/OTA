import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPartyRelationMySuffix } from 'app/shared/model/party-relation-my-suffix.model';
import { Principal } from 'app/core';
import { PartyRelationMySuffixService } from './party-relation-my-suffix.service';

@Component({
    selector: 'jhi-party-relation-my-suffix',
    templateUrl: './party-relation-my-suffix.component.html'
})
export class PartyRelationMySuffixComponent implements OnInit, OnDestroy {
    partyRelations: IPartyRelationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private partyRelationService: PartyRelationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.partyRelationService.query().subscribe(
            (res: HttpResponse<IPartyRelationMySuffix[]>) => {
                this.partyRelations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPartyRelations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPartyRelationMySuffix) {
        return item.id;
    }

    registerChangeInPartyRelations() {
        this.eventSubscriber = this.eventManager.subscribe('partyRelationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
