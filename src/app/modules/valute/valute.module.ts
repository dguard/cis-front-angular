import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~utils/shared.module';

import { ValuteComponent } from './valute.component';

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: ValuteComponent}]),
    SharedModule
  ],
  declarations: [
    ValuteComponent,
  ],
  providers: [],
  entryComponents: [
  ],
  exports: [
    RouterModule,
  ]
})
export class ValuteModule { }

