/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { TransactionRelationMySuffixDetailComponent } from 'app/entities/transaction-relation-my-suffix/transaction-relation-my-suffix-detail.component';
import { TransactionRelationMySuffix } from 'app/shared/model/transaction-relation-my-suffix.model';

describe('Component Tests', () => {
    describe('TransactionRelationMySuffix Management Detail Component', () => {
        let comp: TransactionRelationMySuffixDetailComponent;
        let fixture: ComponentFixture<TransactionRelationMySuffixDetailComponent>;
        const route = ({ data: of({ transactionRelation: new TransactionRelationMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [TransactionRelationMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransactionRelationMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransactionRelationMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transactionRelation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
