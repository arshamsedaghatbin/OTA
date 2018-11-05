/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { DocumentMySuffixUpdateComponent } from 'app/entities/document-my-suffix/document-my-suffix-update.component';
import { DocumentMySuffixService } from 'app/entities/document-my-suffix/document-my-suffix.service';
import { DocumentMySuffix } from 'app/shared/model/document-my-suffix.model';

describe('Component Tests', () => {
    describe('DocumentMySuffix Management Update Component', () => {
        let comp: DocumentMySuffixUpdateComponent;
        let fixture: ComponentFixture<DocumentMySuffixUpdateComponent>;
        let service: DocumentMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [DocumentMySuffixUpdateComponent]
            })
                .overrideTemplate(DocumentMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DocumentMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.document = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DocumentMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.document = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
