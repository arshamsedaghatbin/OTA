/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OtaTestModule } from '../../../test.module';
import { DocumentMySuffixComponent } from 'app/entities/document-my-suffix/document-my-suffix.component';
import { DocumentMySuffixService } from 'app/entities/document-my-suffix/document-my-suffix.service';
import { DocumentMySuffix } from 'app/shared/model/document-my-suffix.model';

describe('Component Tests', () => {
    describe('DocumentMySuffix Management Component', () => {
        let comp: DocumentMySuffixComponent;
        let fixture: ComponentFixture<DocumentMySuffixComponent>;
        let service: DocumentMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [DocumentMySuffixComponent],
                providers: []
            })
                .overrideTemplate(DocumentMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DocumentMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.documents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
