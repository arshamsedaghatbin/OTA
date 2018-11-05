import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAddressMySuffix } from 'app/shared/model/address-my-suffix.model';

@Component({
    selector: 'jhi-address-my-suffix-detail',
    templateUrl: './address-my-suffix-detail.component.html'
})
export class AddressMySuffixDetailComponent implements OnInit {
    address: IAddressMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ address }) => {
            this.address = address;
        });
    }

    previousState() {
        window.history.back();
    }
}
