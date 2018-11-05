/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OtaTestModule } from '../../../test.module';
import { FlightTicketMySuffixDeleteDialogComponent } from 'app/entities/flight-ticket-my-suffix/flight-ticket-my-suffix-delete-dialog.component';
import { FlightTicketMySuffixService } from 'app/entities/flight-ticket-my-suffix/flight-ticket-my-suffix.service';

describe('Component Tests', () => {
    describe('FlightTicketMySuffix Management Delete Component', () => {
        let comp: FlightTicketMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<FlightTicketMySuffixDeleteDialogComponent>;
        let service: FlightTicketMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [FlightTicketMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(FlightTicketMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlightTicketMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightTicketMySuffixService);
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
