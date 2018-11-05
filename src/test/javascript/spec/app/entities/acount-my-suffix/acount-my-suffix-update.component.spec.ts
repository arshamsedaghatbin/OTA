/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { AcountMySuffixUpdateComponent } from 'app/entities/acount-my-suffix/acount-my-suffix-update.component';
import { AcountMySuffixService } from 'app/entities/acount-my-suffix/acount-my-suffix.service';
import { AcountMySuffix } from 'app/shared/model/acount-my-suffix.model';

describe('Component Tests', () => {
    describe('AcountMySuffix Management Update Component', () => {
        let comp: AcountMySuffixUpdateComponent;
        let fixture: ComponentFixture<AcountMySuffixUpdateComponent>;
        let service: AcountMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [AcountMySuffixUpdateComponent]
            })
                .overrideTemplate(AcountMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AcountMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcountMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AcountMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.acount = entity;
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
                    const entity = new AcountMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.acount = entity;
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
