/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { AddressMySuffixUpdateComponent } from 'app/entities/address-my-suffix/address-my-suffix-update.component';
import { AddressMySuffixService } from 'app/entities/address-my-suffix/address-my-suffix.service';
import { AddressMySuffix } from 'app/shared/model/address-my-suffix.model';

describe('Component Tests', () => {
    describe('AddressMySuffix Management Update Component', () => {
        let comp: AddressMySuffixUpdateComponent;
        let fixture: ComponentFixture<AddressMySuffixUpdateComponent>;
        let service: AddressMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [AddressMySuffixUpdateComponent]
            })
                .overrideTemplate(AddressMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AddressMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AddressMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.address = entity;
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
                    const entity = new AddressMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.address = entity;
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
