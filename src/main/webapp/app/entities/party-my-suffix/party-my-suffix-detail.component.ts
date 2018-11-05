import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartyMySuffix } from 'app/shared/model/party-my-suffix.model';

@Component({
    selector: 'jhi-party-my-suffix-detail',
    templateUrl: './party-my-suffix-detail.component.html'
})
export class PartyMySuffixDetailComponent implements OnInit {
    party: IPartyMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ party }) => {
            this.party = party;
        });
    }

    previousState() {
        window.history.back();
    }
}
