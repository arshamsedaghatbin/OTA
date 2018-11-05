/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OtaTestModule } from '../../../test.module';
import { AddressMySuffixDeleteDialogComponent } from 'app/entities/address-my-suffix/address-my-suffix-delete-dialog.component';
import { AddressMySuffixService } from 'app/entities/address-my-suffix/address-my-suffix.service';

describe('Component Tests', () => {
    describe('AddressMySuffix Management Delete Component', () => {
        let comp: AddressMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AddressMySuffixDeleteDialogComponent>;
        let service: AddressMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [AddressMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(AddressMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AddressMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressMySuffixService);
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
