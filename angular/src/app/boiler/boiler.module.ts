import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BoilerLandingPageComponent} from "./landing-page/boiler-landing-page.component";
import {CarouselComponent} from "./landing-page/carousel/carousel.component";
import {CarouselItemComponent} from "./landing-page/carousel/carousel-item/carousel-item.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        BoilerLandingPageComponent,
        CarouselComponent,
        CarouselItemComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
    ],
    exports: [
        BoilerLandingPageComponent,
    ]
})
export class BoilerModule {
}
