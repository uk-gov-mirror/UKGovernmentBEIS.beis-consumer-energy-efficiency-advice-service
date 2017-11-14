import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {SharedModule} from "../shared/shared.module";
import {RoutingModule} from "../app-routing.module";
import {PageComponent} from "./page.component";
import {PageService} from "./page.service";

@NgModule({
    declarations: [
        PageComponent,
    ],
    exports: [
        PageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule
    ]
})
export class PageModule {
    static forRoot() {
        return {
            ngModule: PageModule,
            providers: [PageService]
        };
    }
}