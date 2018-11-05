import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcountMySuffix } from 'app/shared/model/acount-my-suffix.model';
import { AcountMySuffixService } from './acount-my-suffix.service';

@Component({
    selector: 'jhi-acount-my-suffix-delete-dialog',
    templateUrl: './acount-my-suffix-delete-dialog.component.html'
})
export class AcountMySuffixDeleteDialogComponent {
    acount: IAcountMySuffix;

    constructor(private acountService: AcountMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'acountListModification',
                content: 'Deleted an acount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acount-my-suffix-delete-popup',
    template: ''
})
export class AcountMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acount }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AcountMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.acount = acount;
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
