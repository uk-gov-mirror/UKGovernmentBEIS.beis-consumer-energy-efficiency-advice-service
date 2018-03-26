import {NgModule} from '@angular/core';
import {MeesPageComponent} from "./mees-page.component";
import {SharedModule} from "../shared/shared.module";
import {InlineSVGModule} from "ng-inline-svg";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        MeesPageComponent,
    ],
    exports: [
        MeesPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineSVGModule
    ]
})
export class MeesPageModule {
}
