import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPartyMySuffix } from 'app/shared/model/party-my-suffix.model';
import { PartyMySuffixService } from './party-my-suffix.service';
import { IPartyRelationMySuffix } from 'app/shared/model/party-relation-my-suffix.model';
import { PartyRelationMySuffixService } from 'app/entities/party-relation-my-suffix';

@Component({
    selector: 'jhi-party-my-suffix-update',
    templateUrl: './party-my-suffix-update.component.html'
})
export class PartyMySuffixUpdateComponent implements OnInit {
    party: IPartyMySuffix;
    isSaving: boolean;

    relations: IPartyRelationMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private partyService: PartyMySuffixService,
        private partyRelationService: PartyRelationMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ party }) => {
            this.party = party;
        });
        this.partyRelationService.query({ filter: 'party-is-null' }).subscribe(
            (res: HttpResponse<IPartyRelationMySuffix[]>) => {
                if (!this.party.relationId) {
                    this.relations = res.body;
                } else {
                    this.partyRelationService.find(this.party.relationId).subscribe(
                        (subRes: HttpResponse<IPartyRelationMySuffix>) => {
                            this.relations = [subRes.body].concat(res.body);
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
        if (this.party.id !== undefined) {
            this.subscribeToSaveResponse(this.partyService.update(this.party));
        } else {
            this.subscribeToSaveResponse(this.partyService.create(this.party));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPartyMySuffix>>) {
        result.subscribe((res: HttpResponse<IPartyMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPartyRelationById(index: number, item: IPartyRelationMySuffix) {
        return item.id;
    }
}
