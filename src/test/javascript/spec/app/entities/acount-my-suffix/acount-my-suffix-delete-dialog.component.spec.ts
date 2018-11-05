/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OtaTestModule } from '../../../test.module';
import { AcountMySuffixDeleteDialogComponent } from 'app/entities/acount-my-suffix/acount-my-suffix-delete-dialog.component';
import { AcountMySuffixService } from 'app/entities/acount-my-suffix/acount-my-suffix.service';

describe('Component Tests', () => {
    describe('AcountMySuffix Management Delete Component', () => {
        let comp: AcountMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AcountMySuffixDeleteDialogComponent>;
        let service: AcountMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [AcountMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(AcountMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcountMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcountMySuffixService);
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
