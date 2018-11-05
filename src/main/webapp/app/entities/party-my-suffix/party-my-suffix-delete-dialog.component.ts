import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartyMySuffix } from 'app/shared/model/party-my-suffix.model';
import { PartyMySuffixService } from './party-my-suffix.service';

@Component({
    selector: 'jhi-party-my-suffix-delete-dialog',
    templateUrl: './party-my-suffix-delete-dialog.component.html'
})
export class PartyMySuffixDeleteDialogComponent {
    party: IPartyMySuffix;

    constructor(private partyService: PartyMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.partyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'partyListModification',
                content: 'Deleted an party'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-party-my-suffix-delete-popup',
    template: ''
})
export class PartyMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ party }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PartyMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.party = party;
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
