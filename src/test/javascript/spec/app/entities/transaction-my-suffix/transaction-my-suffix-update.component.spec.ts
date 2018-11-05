/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { TransactionMySuffixUpdateComponent } from 'app/entities/transaction-my-suffix/transaction-my-suffix-update.component';
import { TransactionMySuffixService } from 'app/entities/transaction-my-suffix/transaction-my-suffix.service';
import { TransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';

describe('Component Tests', () => {
    describe('TransactionMySuffix Management Update Component', () => {
        let comp: TransactionMySuffixUpdateComponent;
        let fixture: ComponentFixture<TransactionMySuffixUpdateComponent>;
        let service: TransactionMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [TransactionMySuffixUpdateComponent]
            })
                .overrideTemplate(TransactionMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransactionMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransactionMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transaction = entity;
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
                    const entity = new TransactionMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transaction = entity;
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
