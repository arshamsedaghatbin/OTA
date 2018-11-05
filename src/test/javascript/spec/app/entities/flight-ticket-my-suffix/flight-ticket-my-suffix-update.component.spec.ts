/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { FlightTicketMySuffixUpdateComponent } from 'app/entities/flight-ticket-my-suffix/flight-ticket-my-suffix-update.component';
import { FlightTicketMySuffixService } from 'app/entities/flight-ticket-my-suffix/flight-ticket-my-suffix.service';
import { FlightTicketMySuffix } from 'app/shared/model/flight-ticket-my-suffix.model';

describe('Component Tests', () => {
    describe('FlightTicketMySuffix Management Update Component', () => {
        let comp: FlightTicketMySuffixUpdateComponent;
        let fixture: ComponentFixture<FlightTicketMySuffixUpdateComponent>;
        let service: FlightTicketMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [FlightTicketMySuffixUpdateComponent]
            })
                .overrideTemplate(FlightTicketMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlightTicketMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightTicketMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FlightTicketMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.flightTicket = entity;
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
                    const entity = new FlightTicketMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.flightTicket = entity;
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
