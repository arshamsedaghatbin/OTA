import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransactionRelationMySuffix } from 'app/shared/model/transaction-relation-my-suffix.model';
import { Principal } from 'app/core';
import { TransactionRelationMySuffixService } from './transaction-relation-my-suffix.service';

@Component({
    selector: 'jhi-transaction-relation-my-suffix',
    templateUrl: './transaction-relation-my-suffix.component.html'
})
export class TransactionRelationMySuffixComponent implements OnInit, OnDestroy {
    transactionRelations: ITransactionRelationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transactionRelationService: TransactionRelationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.transactionRelationService.query().subscribe(
            (res: HttpResponse<ITransactionRelationMySuffix[]>) => {
                this.transactionRelations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTransactionRelations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransactionRelationMySuffix) {
        return item.id;
    }

    registerChangeInTransactionRelations() {
        this.eventSubscriber = this.eventManager.subscribe('transactionRelationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
