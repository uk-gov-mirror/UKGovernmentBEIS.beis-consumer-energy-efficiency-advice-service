import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {SharedModule} from "../shared/shared.module";
import {RoutingModule} from "../app-routing.module";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RoutingModule,
        SharedModule
    ],
})
export class LayoutComponentsModule {
}