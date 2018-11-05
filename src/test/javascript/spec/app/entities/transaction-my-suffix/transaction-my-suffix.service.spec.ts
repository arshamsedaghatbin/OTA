/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TransactionMySuffixService } from 'app/entities/transaction-my-suffix/transaction-my-suffix.service';
import { ITransactionMySuffix, TransactionMySuffix } from 'app/shared/model/transaction-my-suffix.model';

describe('Service Tests', () => {
    describe('TransactionMySuffix Service', () => {
        let injector: TestBed;
        let service: TransactionMySuffixService;
        let httpMock: HttpTestingController;
        let elemDefault: ITransactionMySuffix;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(TransactionMySuffixService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new TransactionMySuffix(0, currentDate, 'AAAAAAA', 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        transactiondate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a TransactionMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        transactiondate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        transactiondate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new TransactionMySuffix(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a TransactionMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        transactiondate: currentDate.format(DATE_TIME_FORMAT),
                        transactionNumber: 'BBBBBB',
                        transactionAmount: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        transactiondate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of TransactionMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        transactiondate: currentDate.format(DATE_TIME_FORMAT),
                        transactionNumber: 'BBBBBB',
                        transactionAmount: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        transactiondate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a TransactionMySuffix', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
