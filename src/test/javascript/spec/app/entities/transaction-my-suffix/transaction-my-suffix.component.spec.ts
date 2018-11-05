/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OtaTestModule } from '../../../test.module';
import { TransactionMySuffixComponent } from 'app/entities/transaction-my-suffix/transaction-my-suffix.component';
import { TransactionMySuffixService } from 'app/entities/transaction-my-suffix/transaction-my-suffix.service';
import { TransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';

describe('Component Tests', () => {
    describe('TransactionMySuffix Management Component', () => {
        let comp: TransactionMySuffixComponent;
        let fixture: ComponentFixture<TransactionMySuffixComponent>;
        let service: TransactionMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [TransactionMySuffixComponent],
                providers: []
            })
                .overrideTemplate(TransactionMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransactionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TransactionMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.transactions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
