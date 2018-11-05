import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';
import { TransactionMySuffixService } from './transaction-my-suffix.service';

@Component({
    selector: 'jhi-transaction-my-suffix-delete-dialog',
    templateUrl: './transaction-my-suffix-delete-dialog.component.html'
})
export class TransactionMySuffixDeleteDialogComponent {
    transaction: ITransactionMySuffix;

    constructor(
        private transactionService: TransactionMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transactionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transactionListModification',
                content: 'Deleted an transaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-my-suffix-delete-popup',
    template: ''
})
export class TransactionMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transaction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransactionMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transaction = transaction;
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
