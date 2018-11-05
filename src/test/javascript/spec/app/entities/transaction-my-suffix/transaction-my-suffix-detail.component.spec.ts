/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { TransactionMySuffixDetailComponent } from 'app/entities/transaction-my-suffix/transaction-my-suffix-detail.component';
import { TransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';

describe('Component Tests', () => {
    describe('TransactionMySuffix Management Detail Component', () => {
        let comp: TransactionMySuffixDetailComponent;
        let fixture: ComponentFixture<TransactionMySuffixDetailComponent>;
        const route = ({ data: of({ transaction: new TransactionMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [TransactionMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransactionMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransactionMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transaction).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
