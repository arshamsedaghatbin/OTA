import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAcountMySuffix } from 'app/shared/model/acount-my-suffix.model';
import { AcountMySuffixService } from './acount-my-suffix.service';
import { IPartyMySuffix } from 'app/shared/model/party-my-suffix.model';
import { PartyMySuffixService } from 'app/entities/party-my-suffix';

@Component({
    selector: 'jhi-acount-my-suffix-update',
    templateUrl: './acount-my-suffix-update.component.html'
})
export class AcountMySuffixUpdateComponent implements OnInit {
    acount: IAcountMySuffix;
    isSaving: boolean;

    parties: IPartyMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private acountService: AcountMySuffixService,
        private partyService: PartyMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ acount }) => {
            this.acount = acount;
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
        if (this.acount.id !== undefined) {
            this.subscribeToSaveResponse(this.acountService.update(this.acount));
        } else {
            this.subscribeToSaveResponse(this.acountService.create(this.acount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAcountMySuffix>>) {
        result.subscribe((res: HttpResponse<IAcountMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
