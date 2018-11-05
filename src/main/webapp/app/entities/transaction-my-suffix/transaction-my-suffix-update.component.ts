import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ITransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';
import { TransactionMySuffixService } from './transaction-my-suffix.service';
import { IAcountMySuffix } from 'app/shared/model/acount-my-suffix.model';
import { AcountMySuffixService } from 'app/entities/acount-my-suffix';
import { ITransactionRelationMySuffix } from 'app/shared/model/transaction-relation-my-suffix.model';
import { TransactionRelationMySuffixService } from 'app/entities/transaction-relation-my-suffix';

@Component({
    selector: 'jhi-transaction-my-suffix-update',
    templateUrl: './transaction-my-suffix-update.component.html'
})
export class TransactionMySuffixUpdateComponent implements OnInit {
    transaction: ITransactionMySuffix;
    isSaving: boolean;

    acounts: IAcountMySuffix[];

    transactionrelations: ITransactionRelationMySuffix[];
    transactiondate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private transactionService: TransactionMySuffixService,
        private acountService: AcountMySuffixService,
        private transactionRelationService: TransactionRelationMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transaction }) => {
            this.transaction = transaction;
            this.transactiondate =
                this.transaction.transactiondate != null ? this.transaction.transactiondate.format(DATE_TIME_FORMAT) : null;
        });
        this.acountService.query().subscribe(
            (res: HttpResponse<IAcountMySuffix[]>) => {
                this.acounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.transactionRelationService.query({ filter: 'transaction-is-null' }).subscribe(
            (res: HttpResponse<ITransactionRelationMySuffix[]>) => {
                if (!this.transaction.transactionRelationId) {
                    this.transactionrelations = res.body;
                } else {
                    this.transactionRelationService.find(this.transaction.transactionRelationId).subscribe(
                        (subRes: HttpResponse<ITransactionRelationMySuffix>) => {
                            this.transactionrelations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.transaction.transactiondate = this.transactiondate != null ? moment(this.transactiondate, DATE_TIME_FORMAT) : null;
        if (this.transaction.id !== undefined) {
            this.subscribeToSaveResponse(this.transactionService.update(this.transaction));
        } else {
            this.subscribeToSaveResponse(this.transactionService.create(this.transaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionMySuffix>>) {
        result.subscribe((res: HttpResponse<ITransactionMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAcountById(index: number, item: IAcountMySuffix) {
        return item.id;
    }

    trackTransactionRelationById(index: number, item: ITransactionRelationMySuffix) {
        return item.id;
    }
}
