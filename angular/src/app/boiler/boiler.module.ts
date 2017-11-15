import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BoilerLandingPageComponent} from "./landing-page/boiler-landing-page.component";
import {CarouselComponent} from "./landing-page/carousel/carousel.component";
import {CarouselItemComponent} from "./landing-page/carousel/carousel-item/carousel-item.component";
import {SharedModule} from "../shared/shared.module";
import {BoilerEpcReplaceComponent} from "./epc-replace/boiler-epc-replace.component";
import {BoilerPostcodeLookupComponent} from './postcode-lookup/boiler-postcode-lookup.component';
import {BoilerMakeModelLookupComponent} from './make-model-lookup/boiler-make-model-lookup.component';

@NgModule({
    declarations: [
        BoilerLandingPageComponent,
        CarouselComponent,
        CarouselItemComponent,
        BoilerEpcReplaceComponent,
        BoilerPostcodeLookupComponent,
        BoilerMakeModelLookupComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
    ],
    exports: [
        BoilerLandingPageComponent,
        BoilerEpcReplaceComponent,
    ]
})
export class BoilerModule {
}
