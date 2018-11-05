/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { PartyMySuffixDetailComponent } from 'app/entities/party-my-suffix/party-my-suffix-detail.component';
import { PartyMySuffix } from 'app/shared/model/party-my-suffix.model';

describe('Component Tests', () => {
    describe('PartyMySuffix Management Detail Component', () => {
        let comp: PartyMySuffixDetailComponent;
        let fixture: ComponentFixture<PartyMySuffixDetailComponent>;
        const route = ({ data: of({ party: new PartyMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [PartyMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PartyMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PartyMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.party).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
