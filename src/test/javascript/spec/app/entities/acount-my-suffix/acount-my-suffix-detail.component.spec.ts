/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OtaTestModule } from '../../../test.module';
import { AcountMySuffixDetailComponent } from 'app/entities/acount-my-suffix/acount-my-suffix-detail.component';
import { AcountMySuffix } from 'app/shared/model/acount-my-suffix.model';

describe('Component Tests', () => {
    describe('AcountMySuffix Management Detail Component', () => {
        let comp: AcountMySuffixDetailComponent;
        let fixture: ComponentFixture<AcountMySuffixDetailComponent>;
        const route = ({ data: of({ acount: new AcountMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [AcountMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AcountMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcountMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.acount).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
