/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OtaTestModule } from '../../../test.module';
import { AcountMySuffixComponent } from 'app/entities/acount-my-suffix/acount-my-suffix.component';
import { AcountMySuffixService } from 'app/entities/acount-my-suffix/acount-my-suffix.service';
import { AcountMySuffix } from 'app/shared/model/acount-my-suffix.model';

describe('Component Tests', () => {
    describe('AcountMySuffix Management Component', () => {
        let comp: AcountMySuffixComponent;
        let fixture: ComponentFixture<AcountMySuffixComponent>;
        let service: AcountMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [AcountMySuffixComponent],
                providers: []
            })
                .overrideTemplate(AcountMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AcountMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcountMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AcountMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.acounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
