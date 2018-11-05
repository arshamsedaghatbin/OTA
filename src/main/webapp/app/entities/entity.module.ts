import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OtaPartyMySuffixModule } from './party-my-suffix/party-my-suffix.module';
import { OtaAddressMySuffixModule } from './address-my-suffix/address-my-suffix.module';
import { OtaPartyRelationMySuffixModule } from './party-relation-my-suffix/party-relation-my-suffix.module';
import { OtaDocumentMySuffixModule } from './document-my-suffix/document-my-suffix.module';
import { OtaAcountMySuffixModule } from './acount-my-suffix/acount-my-suffix.module';
import { OtaTransactionMySuffixModule } from './transaction-my-suffix/transaction-my-suffix.module';
import { OtaFlightTicketMySuffixModule } from './flight-ticket-my-suffix/flight-ticket-my-suffix.module';
import { OtaTransactionRelationMySuffixModule } from './transaction-relation-my-suffix/transaction-relation-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        OtaPartyMySuffixModule,
        OtaAddressMySuffixModule,
        OtaPartyRelationMySuffixModule,
        OtaDocumentMySuffixModule,
        OtaAcountMySuffixModule,
        OtaTransactionMySuffixModule,
        OtaFlightTicketMySuffixModule,
        OtaTransactionRelationMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtaEntityModule {}
