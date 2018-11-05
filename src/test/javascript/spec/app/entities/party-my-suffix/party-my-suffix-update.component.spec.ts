/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { PartyMySuffixUpdateComponent } from 'app/entities/party-my-suffix/party-my-suffix-update.component';
import { PartyMySuffixService } from 'app/entities/party-my-suffix/party-my-suffix.service';
import { PartyMySuffix } from 'app/shared/model/party-my-suffix.model';

describe('Component Tests', () => {
    describe('PartyMySuffix Management Update Component', () => {
        let comp: PartyMySuffixUpdateComponent;
        let fixture: ComponentFixture<PartyMySuffixUpdateComponent>;
        let service: PartyMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [PartyMySuffixUpdateComponent]
            })
                .overrideTemplate(PartyMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PartyMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartyMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PartyMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.party = entity;
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
                    const entity = new PartyMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.party = entity;
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
