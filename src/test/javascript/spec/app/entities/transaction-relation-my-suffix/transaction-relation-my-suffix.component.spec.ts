/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OtaTestModule } from '../../../test.module';
import { TransactionRelationMySuffixComponent } from 'app/entities/transaction-relation-my-suffix/transaction-relation-my-suffix.component';
import { TransactionRelationMySuffixService } from 'app/entities/transaction-relation-my-suffix/transaction-relation-my-suffix.service';
import { TransactionRelationMySuffix } from 'app/shared/model/transaction-relation-my-suffix.model';

describe('Component Tests', () => {
    describe('TransactionRelationMySuffix Management Component', () => {
        let comp: TransactionRelationMySuffixComponent;
        let fixture: ComponentFixture<TransactionRelationMySuffixComponent>;
        let service: TransactionRelationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [TransactionRelationMySuffixComponent],
                providers: []
            })
                .overrideTemplate(TransactionRelationMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransactionRelationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionRelationMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TransactionRelationMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.transactionRelations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
