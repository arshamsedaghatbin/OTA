/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { PartyRelationMySuffixDetailComponent } from 'app/entities/party-relation-my-suffix/party-relation-my-suffix-detail.component';
import { PartyRelationMySuffix } from 'app/shared/model/party-relation-my-suffix.model';

describe('Component Tests', () => {
    describe('PartyRelationMySuffix Management Detail Component', () => {
        let comp: PartyRelationMySuffixDetailComponent;
        let fixture: ComponentFixture<PartyRelationMySuffixDetailComponent>;
        const route = ({ data: of({ partyRelation: new PartyRelationMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [PartyRelationMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PartyRelationMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PartyRelationMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.partyRelation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
