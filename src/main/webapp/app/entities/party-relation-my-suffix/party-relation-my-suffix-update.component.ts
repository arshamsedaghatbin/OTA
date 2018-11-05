import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPartyRelationMySuffix } from 'app/shared/model/party-relation-my-suffix.model';
import { PartyRelationMySuffixService } from './party-relation-my-suffix.service';
import { IPartyMySuffix } from 'app/shared/model/party-my-suffix.model';
import { PartyMySuffixService } from 'app/entities/party-my-suffix';

@Component({
    selector: 'jhi-party-relation-my-suffix-update',
    templateUrl: './party-relation-my-suffix-update.component.html'
})
export class PartyRelationMySuffixUpdateComponent implements OnInit {
    partyRelation: IPartyRelationMySuffix;
    isSaving: boolean;

    fromparties: IPartyMySuffix[];

    toparties: IPartyMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private partyRelationService: PartyRelationMySuffixService,
        private partyService: PartyMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ partyRelation }) => {
            this.partyRelation = partyRelation;
        });
        this.partyService.query({ filter: 'partyrelation-is-null' }).subscribe(
            (res: HttpResponse<IPartyMySuffix[]>) => {
                if (!this.partyRelation.fromPartyId) {
                    this.fromparties = res.body;
                } else {
                    this.partyService.find(this.partyRelation.fromPartyId).subscribe(
                        (subRes: HttpResponse<IPartyMySuffix>) => {
                            this.fromparties = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.partyService.query({ filter: 'partyrelation-is-null' }).subscribe(
            (res: HttpResponse<IPartyMySuffix[]>) => {
                if (!this.partyRelation.toPartyId) {
                    this.toparties = res.body;
                } else {
                    this.partyService.find(this.partyRelation.toPartyId).subscribe(
                        (subRes: HttpResponse<IPartyMySuffix>) => {
                            this.toparties = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.partyRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.partyRelationService.update(this.partyRelation));
        } else {
            this.subscribeToSaveResponse(this.partyRelationService.create(this.partyRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPartyRelationMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IPartyRelationMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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
