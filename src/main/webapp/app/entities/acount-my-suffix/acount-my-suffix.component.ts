import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAcountMySuffix } from 'app/shared/model/acount-my-suffix.model';
import { Principal } from 'app/core';
import { AcountMySuffixService } from './acount-my-suffix.service';

@Component({
    selector: 'jhi-acount-my-suffix',
    templateUrl: './acount-my-suffix.component.html'
})
export class AcountMySuffixComponent implements OnInit, OnDestroy {
    acounts: IAcountMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private acountService: AcountMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.acountService.query().subscribe(
            (res: HttpResponse<IAcountMySuffix[]>) => {
                this.acounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAcounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAcountMySuffix) {
        return item.id;
    }

    registerChangeInAcounts() {
        this.eventSubscriber = this.eventManager.subscribe('acountListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
