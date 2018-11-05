/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OtaTestModule } from '../../../test.module';
import { AddressMySuffixComponent } from 'app/entities/address-my-suffix/address-my-suffix.component';
import { AddressMySuffixService } from 'app/entities/address-my-suffix/address-my-suffix.service';
import { AddressMySuffix } from 'app/shared/model/address-my-suffix.model';

describe('Component Tests', () => {
    describe('AddressMySuffix Management Component', () => {
        let comp: AddressMySuffixComponent;
        let fixture: ComponentFixture<AddressMySuffixComponent>;
        let service: AddressMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [AddressMySuffixComponent],
                providers: []
            })
                .overrideTemplate(AddressMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AddressMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AddressMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.addresses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
