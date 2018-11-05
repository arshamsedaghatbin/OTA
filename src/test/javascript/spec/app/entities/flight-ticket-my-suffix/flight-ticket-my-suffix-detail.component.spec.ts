/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { FlightTicketMySuffixDetailComponent } from 'app/entities/flight-ticket-my-suffix/flight-ticket-my-suffix-detail.component';
import { FlightTicketMySuffix } from 'app/shared/model/flight-ticket-my-suffix.model';

describe('Component Tests', () => {
    describe('FlightTicketMySuffix Management Detail Component', () => {
        let comp: FlightTicketMySuffixDetailComponent;
        let fixture: ComponentFixture<FlightTicketMySuffixDetailComponent>;
        const route = ({ data: of({ flightTicket: new FlightTicketMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [FlightTicketMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FlightTicketMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlightTicketMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.flightTicket).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
