import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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
        RoutingModule
  ]
})
export class YourHomeModule {
}
