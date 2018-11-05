/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { DocumentMySuffixDetailComponent } from 'app/entities/document-my-suffix/document-my-suffix-detail.component';
import { DocumentMySuffix } from 'app/shared/model/document-my-suffix.model';

describe('Component Tests', () => {
    describe('DocumentMySuffix Management Detail Component', () => {
        let comp: DocumentMySuffixDetailComponent;
        let fixture: ComponentFixture<DocumentMySuffixDetailComponent>;
        const route = ({ data: of({ document: new DocumentMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [DocumentMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DocumentMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.document).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
