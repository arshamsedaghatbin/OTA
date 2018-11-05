import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcountMySuffix } from 'app/shared/model/acount-my-suffix.model';

@Component({
    selector: 'jhi-acount-my-suffix-detail',
    templateUrl: './acount-my-suffix-detail.component.html'
})
export class AcountMySuffixDetailComponent implements OnInit {
    acount: IAcountMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acount }) => {
            this.acount = acount;
        });
    }

    previousState() {
        window.history.back();
    }
}
