import { NgModule } from '@angular/core';

import { OtaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [OtaSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [OtaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class OtaSharedCommonModule {}
