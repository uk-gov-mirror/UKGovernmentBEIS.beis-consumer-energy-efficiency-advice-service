import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';

import {SharedModule} from "../shared/shared.module";
import {RoutingModule} from "../app-routing.module";
import {YourHomeComponent} from './your-home.component';

@NgModule({
    declarations: [
        YourHomeComponent
    ],
    exports: [
        YourHomeComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule,
        InlineSVGModule
  ]
})
export class YourHomeModule {
}
