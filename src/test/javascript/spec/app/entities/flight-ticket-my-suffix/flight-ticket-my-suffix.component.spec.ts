/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OtaTestModule } from '../../../test.module';
import { FlightTicketMySuffixComponent } from 'app/entities/flight-ticket-my-suffix/flight-ticket-my-suffix.component';
import { FlightTicketMySuffixService } from 'app/entities/flight-ticket-my-suffix/flight-ticket-my-suffix.service';
import { FlightTicketMySuffix } from 'app/shared/model/flight-ticket-my-suffix.model';

describe('Component Tests', () => {
    describe('FlightTicketMySuffix Management Component', () => {
        let comp: FlightTicketMySuffixComponent;
        let fixture: ComponentFixture<FlightTicketMySuffixComponent>;
        let service: FlightTicketMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [FlightTicketMySuffixComponent],
                providers: []
            })
                .overrideTemplate(FlightTicketMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlightTicketMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightTicketMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FlightTicketMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.flightTickets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
