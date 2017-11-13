import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoilerLandingPageComponent } from "./landing-page/landing-page.component";

@NgModule({
    declarations: [
        BoilerLandingPageComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        BoilerLandingPageComponent,
    ]
})
export class BoilerModule {
}
