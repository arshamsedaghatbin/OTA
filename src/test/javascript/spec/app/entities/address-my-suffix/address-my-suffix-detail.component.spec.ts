/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { AddressMySuffixDetailComponent } from 'app/entities/address-my-suffix/address-my-suffix-detail.component';
import { AddressMySuffix } from 'app/shared/model/address-my-suffix.model';

describe('Component Tests', () => {
    describe('AddressMySuffix Management Detail Component', () => {
        let comp: AddressMySuffixDetailComponent;
        let fixture: ComponentFixture<AddressMySuffixDetailComponent>;
        const route = ({ data: of({ address: new AddressMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [AddressMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AddressMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AddressMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.address).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
