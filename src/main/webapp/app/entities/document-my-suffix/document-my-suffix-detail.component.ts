import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentMySuffix } from 'app/shared/model/document-my-suffix.model';

@Component({
    selector: 'jhi-document-my-suffix-detail',
    templateUrl: './document-my-suffix-detail.component.html'
})
export class DocumentMySuffixDetailComponent implements OnInit {
    document: IDocumentMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ document }) => {
            this.document = document;
        });
    }

    previousState() {
        window.history.back();
    }
}
