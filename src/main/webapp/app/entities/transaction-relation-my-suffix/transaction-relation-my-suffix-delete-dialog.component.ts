import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransactionRelationMySuffix } from 'app/shared/model/transaction-relation-my-suffix.model';
import { TransactionRelationMySuffixService } from './transaction-relation-my-suffix.service';

@Component({
    selector: 'jhi-transaction-relation-my-suffix-delete-dialog',
    templateUrl: './transaction-relation-my-suffix-delete-dialog.component.html'
})
export class TransactionRelationMySuffixDeleteDialogComponent {
    transactionRelation: ITransactionRelationMySuffix;

    constructor(
        private transactionRelationService: TransactionRelationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transactionRelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transactionRelationListModification',
                content: 'Deleted an transactionRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-relation-my-suffix-delete-popup',
    template: ''
})
export class TransactionRelationMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transactionRelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransactionRelationMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transactionRelation = transactionRelation;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
