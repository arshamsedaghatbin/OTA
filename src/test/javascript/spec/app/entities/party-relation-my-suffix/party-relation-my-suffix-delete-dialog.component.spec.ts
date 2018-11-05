/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OtaTestModule } from '../../../test.module';
import { PartyRelationMySuffixDeleteDialogComponent } from 'app/entities/party-relation-my-suffix/party-relation-my-suffix-delete-dialog.component';
import { PartyRelationMySuffixService } from 'app/entities/party-relation-my-suffix/party-relation-my-suffix.service';

describe('Component Tests', () => {
    describe('PartyRelationMySuffix Management Delete Component', () => {
        let comp: PartyRelationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PartyRelationMySuffixDeleteDialogComponent>;
        let service: PartyRelationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OtaTestModule],
                declarations: [PartyRelationMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PartyRelationMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PartyRelationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartyRelationMySuffixService);
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
