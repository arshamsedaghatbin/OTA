/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { PartyRelationMySuffixUpdateComponent } from 'app/entities/party-relation-my-suffix/party-relation-my-suffix-update.component';
import { PartyRelationMySuffixService } from 'app/entities/party-relation-my-suffix/party-relation-my-suffix.service';
import { PartyRelationMySuffix } from 'app/shared/model/party-relation-my-suffix.model';

describe('Component Tests', () => {
    describe('PartyRelationMySuffix Management Update Component', () => {
        let comp: PartyRelationMySuffixUpdateComponent;
        let fixture: ComponentFixture<PartyRelationMySuffixUpdateComponent>;
        let service: PartyRelationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [PartyRelationMySuffixUpdateComponent]
            })
                .overrideTemplate(PartyRelationMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PartyRelationMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartyRelationMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PartyRelationMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.partyRelation = entity;
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
                    const entity = new PartyRelationMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.partyRelation = entity;
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
