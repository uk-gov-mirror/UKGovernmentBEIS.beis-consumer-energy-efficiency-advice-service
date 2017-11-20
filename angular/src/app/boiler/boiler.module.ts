import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BoilerLandingPageComponent} from "./landing-page/boiler-landing-page.component";
import {CarouselComponent} from "./landing-page/carousel/carousel.component";
import {CarouselItemComponent} from "./landing-page/carousel/carousel-item/carousel-item.component";
import {SharedModule} from "../shared/shared.module";
import {BoilerEpcReplaceComponent} from "./epc-replace/boiler-epc-replace.component";
import {BoilerPostcodeLookupComponent} from "./postcode-lookup/boiler-postcode-lookup.component";
import {BoilerMakeModelLookupComponent} from "./make-model-lookup/boiler-make-model-lookup.component";
import {BoilerReplacementCardComponent} from "./epc-replace/boiler-replacement-card/boiler-replacement-card.component";
import {RoutingModule} from "../app-routing.module";
import {BoilerTypesService} from "./boiler-types-service/boiler-types.service";
import {BoilerQuestionnaireComponent} from "./boiler-questionnaire/boiler-questionnaire.component";
import {QuestionnaireModule} from "../questionnaire/questionnaire.module";

@NgModule({
    declarations: [
        BoilerLandingPageComponent,
        CarouselComponent,
        CarouselItemComponent,
        BoilerEpcReplaceComponent,
        BoilerPostcodeLookupComponent,
        BoilerMakeModelLookupComponent,
        BoilerReplacementCardComponent,
        BoilerQuestionnaireComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        RoutingModule,
        QuestionnaireModule,
    ],
    exports: [
        BoilerLandingPageComponent,
        BoilerEpcReplaceComponent,
        BoilerQuestionnaireComponent,
    ]
})
export class BoilerModule {
    static forRoot() {
        return {
            ngModule: BoilerModule,
            providers: [
                BoilerTypesService,
            ]
        };
    }
}
