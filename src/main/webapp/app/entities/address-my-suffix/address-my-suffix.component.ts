import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAddressMySuffix } from 'app/shared/model/address-my-suffix.model';
import { Principal } from 'app/core';
import { AddressMySuffixService } from './address-my-suffix.service';

@Component({
    selector: 'jhi-address-my-suffix',
    templateUrl: './address-my-suffix.component.html'
})
export class AddressMySuffixComponent implements OnInit, OnDestroy {
    addresses: IAddressMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private addressService: AddressMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.addressService.query().subscribe(
            (res: HttpResponse<IAddressMySuffix[]>) => {
                this.addresses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAddresses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAddressMySuffix) {
        return item.id;
    }

    registerChangeInAddresses() {
        this.eventSubscriber = this.eventManager.subscribe('addressListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
