import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {HomePageComponent} from "./home-page.component";
import {SharedModule} from "../shared/shared.module";
import {RoutingModule} from "../app-routing.module";

@NgModule({
    declarations: [
        HomePageComponent,
    ],
    exports: [
        HomePageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule
    ]
})
export class HomePageModule {
}