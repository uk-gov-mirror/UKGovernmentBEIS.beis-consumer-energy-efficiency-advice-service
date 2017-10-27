import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {BedroomsQuestionComponent} from "./questions/bedrooms-question/bedrooms-question.component";
import {BoilerTypeQuestionComponent} from "./questions/boiler-type-question/boiler-type-question.component";
import {ConfirmEpcQuestionComponent} from "./questions/confirm-epc-question/confirm-epc-question.component";
import {ElectricityTariffQuestionComponent} from "./questions/electricity-tariff-question/electricity-tariff-question.component";
import {FlatPositionQuestionComponent} from "./questions/flat-position-question/flat-position-question.component";
import {FuelTypeQuestionComponent} from "./questions/fuel-type-question/fuel-type-question.component";
import {HomeAgeQuestionComponent} from "./questions/home-age-question/home-age-question.component";
import {HomeTypeQuestionComponent} from "./questions/home-type-question/home-type-question.component";
import {PostcodeEpcQuestionComponent} from "./questions/postcode-epc-question/postcode-epc-question.component";
import {StoreysQuestionComponent} from "./questions/storeys-question/storeys-question.component";
import {CommonQuestionsModule} from "../../common-questions/common-questions.module";
import {CommonModule} from "../../../common/common.module";
import {HomeBasicsQuestionnaire} from "./home-basics-questionnaire";

@NgModule({
    declarations: [
        BedroomsQuestionComponent,
        BoilerTypeQuestionComponent,
        ConfirmEpcQuestionComponent,
        ElectricityTariffQuestionComponent,
        FlatPositionQuestionComponent,
        FuelTypeQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        PostcodeEpcQuestionComponent,
        StoreysQuestionComponent,
    ],
    exports: [
        BedroomsQuestionComponent,
        BoilerTypeQuestionComponent,
        ConfirmEpcQuestionComponent,
        ElectricityTariffQuestionComponent,
        FlatPositionQuestionComponent,
        FuelTypeQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        PostcodeEpcQuestionComponent,
        StoreysQuestionComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        CommonQuestionsModule,
    ],
    entryComponents: [
        BedroomsQuestionComponent,
        BoilerTypeQuestionComponent,
        ConfirmEpcQuestionComponent,
        ElectricityTariffQuestionComponent,
        FlatPositionQuestionComponent,
        FuelTypeQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        PostcodeEpcQuestionComponent,
        StoreysQuestionComponent,
    ],
    providers: [HomeBasicsQuestionnaire]
})
export class HomeBasicsQuestionnaireModule {
}