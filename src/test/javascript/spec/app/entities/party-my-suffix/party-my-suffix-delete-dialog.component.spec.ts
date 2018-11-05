/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OtaTestModule } from '../../../test.module';
import { PartyMySuffixDeleteDialogComponent } from 'app/entities/party-my-suffix/party-my-suffix-delete-dialog.component';
import { PartyMySuffixService } from 'app/entities/party-my-suffix/party-my-suffix.service';

describe('Component Tests', () => {
    describe('PartyMySuffix Management Delete Component', () => {
        let comp: PartyMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PartyMySuffixDeleteDialogComponent>;
        let service: PartyMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [PartyMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PartyMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PartyMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartyMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
