import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDocumentMySuffix } from 'app/shared/model/document-my-suffix.model';
import { DocumentMySuffixService } from './document-my-suffix.service';
import { IPartyMySuffix } from 'app/shared/model/party-my-suffix.model';
import { PartyMySuffixService } from 'app/entities/party-my-suffix';

@Component({
    selector: 'jhi-document-my-suffix-update',
    templateUrl: './document-my-suffix-update.component.html'
})
export class DocumentMySuffixUpdateComponent implements OnInit {
    document: IDocumentMySuffix;
    isSaving: boolean;

    parties: IPartyMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private documentService: DocumentMySuffixService,
        private partyService: PartyMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ document }) => {
            this.document = document;
        });
        this.partyService.query().subscribe(
            (res: HttpResponse<IPartyMySuffix[]>) => {
                this.parties = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(this.documentService.create(this.document));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentMySuffix>>) {
        result.subscribe((res: HttpResponse<IDocumentMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPartyById(index: number, item: IPartyMySuffix) {
        return item.id;
    }
}
