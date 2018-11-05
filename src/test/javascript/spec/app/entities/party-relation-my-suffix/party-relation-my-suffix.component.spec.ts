/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OtaTestModule } from '../../../test.module';
import { PartyRelationMySuffixComponent } from 'app/entities/party-relation-my-suffix/party-relation-my-suffix.component';
import { PartyRelationMySuffixService } from 'app/entities/party-relation-my-suffix/party-relation-my-suffix.service';
import { PartyRelationMySuffix } from 'app/shared/model/party-relation-my-suffix.model';

describe('Component Tests', () => {
    describe('PartyRelationMySuffix Management Component', () => {
        let comp: PartyRelationMySuffixComponent;
        let fixture: ComponentFixture<PartyRelationMySuffixComponent>;
        let service: PartyRelationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [PartyRelationMySuffixComponent],
                providers: []
            })
                .overrideTemplate(PartyRelationMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PartyRelationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartyRelationMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PartyRelationMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.partyRelations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
