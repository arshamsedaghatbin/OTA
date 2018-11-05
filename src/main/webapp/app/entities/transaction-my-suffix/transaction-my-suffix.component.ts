import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';
import { Principal } from 'app/core';
import { TransactionMySuffixService } from './transaction-my-suffix.service';

@Component({
    selector: 'jhi-transaction-my-suffix',
    templateUrl: './transaction-my-suffix.component.html'
})
export class TransactionMySuffixComponent implements OnInit, OnDestroy {
    transactions: ITransactionMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transactionService: TransactionMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.transactionService.query().subscribe(
            (res: HttpResponse<ITransactionMySuffix[]>) => {
                this.transactions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTransactions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransactionMySuffix) {
        return item.id;
    }

    registerChangeInTransactions() {
        this.eventSubscriber = this.eventManager.subscribe('transactionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
