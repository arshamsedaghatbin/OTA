import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDocumentMySuffix } from 'app/shared/model/document-my-suffix.model';
import { Principal } from 'app/core';
import { DocumentMySuffixService } from './document-my-suffix.service';

@Component({
    selector: 'jhi-document-my-suffix',
    templateUrl: './document-my-suffix.component.html'
})
export class DocumentMySuffixComponent implements OnInit, OnDestroy {
    documents: IDocumentMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private documentService: DocumentMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.documentService.query().subscribe(
            (res: HttpResponse<IDocumentMySuffix[]>) => {
                this.documents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDocuments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDocumentMySuffix) {
        return item.id;
    }

    registerChangeInDocuments() {
        this.eventSubscriber = this.eventManager.subscribe('documentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
