/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OtaTestModule } from '../../../test.module';
import { PartyMySuffixComponent } from 'app/entities/party-my-suffix/party-my-suffix.component';
import { PartyMySuffixService } from 'app/entities/party-my-suffix/party-my-suffix.service';
import { PartyMySuffix } from 'app/shared/model/party-my-suffix.model';

describe('Component Tests', () => {
    describe('PartyMySuffix Management Component', () => {
        let comp: PartyMySuffixComponent;
        let fixture: ComponentFixture<PartyMySuffixComponent>;
        let service: PartyMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [PartyMySuffixComponent],
                providers: []
            })
                .overrideTemplate(PartyMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PartyMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartyMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PartyMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.parties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
