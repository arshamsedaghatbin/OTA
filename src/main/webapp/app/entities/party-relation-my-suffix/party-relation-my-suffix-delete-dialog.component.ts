import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartyRelationMySuffix } from 'app/shared/model/party-relation-my-suffix.model';
import { PartyRelationMySuffixService } from './party-relation-my-suffix.service';

@Component({
    selector: 'jhi-party-relation-my-suffix-delete-dialog',
    templateUrl: './party-relation-my-suffix-delete-dialog.component.html'
})
export class PartyRelationMySuffixDeleteDialogComponent {
    partyRelation: IPartyRelationMySuffix;

    constructor(
        private partyRelationService: PartyRelationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.partyRelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'partyRelationListModification',
                content: 'Deleted an partyRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-party-relation-my-suffix-delete-popup',
    template: ''
})
export class PartyRelationMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ partyRelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PartyRelationMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.partyRelation = partyRelation;
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
