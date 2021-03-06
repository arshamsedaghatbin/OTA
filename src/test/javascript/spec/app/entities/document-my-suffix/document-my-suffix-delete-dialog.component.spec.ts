/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OtaTestModule } from '../../../test.module';
import { DocumentMySuffixDeleteDialogComponent } from 'app/entities/document-my-suffix/document-my-suffix-delete-dialog.component';
import { DocumentMySuffixService } from 'app/entities/document-my-suffix/document-my-suffix.service';

describe('Component Tests', () => {
    describe('DocumentMySuffix Management Delete Component', () => {
        let comp: DocumentMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DocumentMySuffixDeleteDialogComponent>;
        let service: DocumentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [DocumentMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(DocumentMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
