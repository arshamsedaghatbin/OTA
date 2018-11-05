/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { TransactionRelationMySuffixUpdateComponent } from 'app/entities/transaction-relation-my-suffix/transaction-relation-my-suffix-update.component';
import { TransactionRelationMySuffixService } from 'app/entities/transaction-relation-my-suffix/transaction-relation-my-suffix.service';
import { TransactionRelationMySuffix } from 'app/shared/model/transaction-relation-my-suffix.model';

describe('Component Tests', () => {
    describe('TransactionRelationMySuffix Management Update Component', () => {
        let comp: TransactionRelationMySuffixUpdateComponent;
        let fixture: ComponentFixture<TransactionRelationMySuffixUpdateComponent>;
        let service: TransactionRelationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [TransactionRelationMySuffixUpdateComponent]
            })
                .overrideTemplate(TransactionRelationMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransactionRelationMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionRelationMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransactionRelationMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transactionRelation = entity;
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
                    const entity = new TransactionRelationMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transactionRelation = entity;
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
