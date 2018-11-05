import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartyRelationMySuffix } from 'app/shared/model/party-relation-my-suffix.model';

@Component({
    selector: 'jhi-party-relation-my-suffix-detail',
    templateUrl: './party-relation-my-suffix-detail.component.html'
})
export class PartyRelationMySuffixDetailComponent implements OnInit {
    partyRelation: IPartyRelationMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ partyRelation }) => {
            this.partyRelation = partyRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
