import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFlightTicketMySuffix } from 'app/shared/model/flight-ticket-my-suffix.model';
import { FlightTicketMySuffixService } from './flight-ticket-my-suffix.service';

@Component({
    selector: 'jhi-flight-ticket-my-suffix-delete-dialog',
    templateUrl: './flight-ticket-my-suffix-delete-dialog.component.html'
})
export class FlightTicketMySuffixDeleteDialogComponent {
    flightTicket: IFlightTicketMySuffix;

    constructor(
        private flightTicketService: FlightTicketMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flightTicketService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'flightTicketListModification',
                content: 'Deleted an flightTicket'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-flight-ticket-my-suffix-delete-popup',
    template: ''
})
export class FlightTicketMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flightTicket }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FlightTicketMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.flightTicket = flightTicket;
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
