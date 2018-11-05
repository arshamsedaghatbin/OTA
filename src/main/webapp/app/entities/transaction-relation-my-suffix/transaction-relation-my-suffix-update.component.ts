import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITransactionRelationMySuffix } from 'app/shared/model/transaction-relation-my-suffix.model';
import { TransactionRelationMySuffixService } from './transaction-relation-my-suffix.service';
import { ITransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';
import { TransactionMySuffixService } from 'app/entities/transaction-my-suffix';

@Component({
    selector: 'jhi-transaction-relation-my-suffix-update',
    templateUrl: './transaction-relation-my-suffix-update.component.html'
})
export class TransactionRelationMySuffixUpdateComponent implements OnInit {
    transactionRelation: ITransactionRelationMySuffix;
    isSaving: boolean;

    sourceacounts: ITransactionMySuffix[];

    destinationacounts: ITransactionMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private transactionRelationService: TransactionRelationMySuffixService,
        private transactionService: TransactionMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transactionRelation }) => {
            this.transactionRelation = transactionRelation;
        });
        this.transactionService.query({ filter: 'transactionrelation-is-null' }).subscribe(
            (res: HttpResponse<ITransactionMySuffix[]>) => {
                if (!this.transactionRelation.sourceAcountId) {
                    this.sourceacounts = res.body;
                } else {
                    this.transactionService.find(this.transactionRelation.sourceAcountId).subscribe(
                        (subRes: HttpResponse<ITransactionMySuffix>) => {
                            this.sourceacounts = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.transactionService.query({ filter: 'transactionrelation-is-null' }).subscribe(
            (res: HttpResponse<ITransactionMySuffix[]>) => {
                if (!this.transactionRelation.destinationAcountId) {
                    this.destinationacounts = res.body;
                } else {
                    this.transactionService.find(this.transactionRelation.destinationAcountId).subscribe(
                        (subRes: HttpResponse<ITransactionMySuffix>) => {
                            this.destinationacounts = [subRes.body].concat(res.body);
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
        if (this.transactionRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.transactionRelationService.update(this.transactionRelation));
        } else {
            this.subscribeToSaveResponse(this.transactionRelationService.create(this.transactionRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionRelationMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ITransactionRelationMySuffix>) => this.onSaveSuccess(),
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

    trackTransactionById(index: number, item: ITransactionMySuffix) {
        return item.id;
    }
}
