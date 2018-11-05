import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionRelationMySuffix } from 'app/shared/model/transaction-relation-my-suffix.model';

@Component({
    selector: 'jhi-transaction-relation-my-suffix-detail',
    templateUrl: './transaction-relation-my-suffix-detail.component.html'
})
export class TransactionRelationMySuffixDetailComponent implements OnInit {
    transactionRelation: ITransactionRelationMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transactionRelation }) => {
            this.transactionRelation = transactionRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
