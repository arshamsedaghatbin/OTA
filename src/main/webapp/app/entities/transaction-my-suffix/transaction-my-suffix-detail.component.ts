import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';

@Component({
    selector: 'jhi-transaction-my-suffix-detail',
    templateUrl: './transaction-my-suffix-detail.component.html'
})
export class TransactionMySuffixDetailComponent implements OnInit {
    transaction: ITransactionMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transaction }) => {
            this.transaction = transaction;
        });
    }

    previousState() {
        window.history.back();
    }
}
