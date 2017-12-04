import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {BoilerLandingPageComponent} from "./landing-page/boiler-landing-page.component";
import {CarouselComponent} from "./landing-page/carousel/carousel.component";
import {CarouselItemComponent} from "./landing-page/carousel/carousel-item/carousel-item.component";
import {SharedModule} from "../shared/shared.module";
import {BoilerEpcReplaceComponent} from "./epc-replace/boiler-epc-replace.component";
import {BoilerMakeModelLookupComponent} from "./make-model-lookup/boiler-make-model-lookup.component";
import {BoilerReplacementCardComponent} from "./boiler-replacement-card/boiler-replacement-card.component";
import {RoutingModule} from "../app-routing.module";
import {BoilerTypesService} from "./boiler-types-service/boiler-types.service";
import {BoilerQuestionnaireComponent} from "./boiler-questionnaire/boiler-questionnaire.component";
import {QuestionnaireModule} from "../questionnaire/questionnaire.module";
import {BoilerResultsPageComponent} from "./results-page/boiler-results-page.component";
import {BoilerMeasuresSectionComponent} from "./measures-section/boiler-measures-section.component";
import {BoilerPageMeasuresService} from "./measures-section/boiler-page-measures.service";
import {BoilerResultsPageRouteGuard} from "./results-page/boiler-results-page.guard";
import {BoilerReplacementPageComponent} from "./replacement-page/boiler-replacement-page.component";
import {GasAndOilBoilersService} from "./gas-and-oil-boilers/gas-and-oil-boilers.service";
import {BoilerMakeModelReplaceComponent} from "./make-model-replace/boiler-make-model-replace.component";
import {BoilerAdvicePageComponent} from "./advice-page/boiler-advice-page.component";
import {BoilerRegulationCardComponent} from "./advice-page/boiler-regulation-card/boiler-regulation-card.component";
import {BoilerLinkButtonComponent} from "./boiler-link-button/boiler-link-button.component";

@NgModule({
    declarations: [
        BoilerLandingPageComponent,
        CarouselComponent,
        CarouselItemComponent,
        BoilerEpcReplaceComponent,
        BoilerMakeModelLookupComponent,
        BoilerReplacementCardComponent,
        BoilerQuestionnaireComponent,
        BoilerResultsPageComponent,
        BoilerMeasuresSectionComponent,
        BoilerReplacementPageComponent,
        BoilerMakeModelReplaceComponent,
        BoilerAdvicePageComponent,
        BoilerRegulationCardComponent,
        BoilerLinkButtonComponent,
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
        BoilerResultsPageComponent,
        BoilerReplacementPageComponent,
        BoilerMakeModelReplaceComponent,
        BoilerAdvicePageComponent,
    ],
})
export class BoilerModule {
    static forRoot() {
        return {
            ngModule: BoilerModule,
            providers: [
                BoilerTypesService,
                BoilerPageMeasuresService,
                BoilerResultsPageRouteGuard,
                GasAndOilBoilersService,
            ]
        };
    }
}
