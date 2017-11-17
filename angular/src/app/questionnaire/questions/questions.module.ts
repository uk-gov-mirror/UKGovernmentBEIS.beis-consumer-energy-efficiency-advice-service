import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {SharedModule} from "../../shared/shared.module";
import {BedroomsQuestionComponent} from "./bedrooms-question/bedrooms-question.component";
import {BoilerTypeQuestionComponent} from "./boiler-type-question/boiler-type-question.component";
import {ConfirmEpcQuestionComponent} from "./confirm-epc-question/confirm-epc-question.component";
import {ElectricityTariffQuestionComponent} from "./electricity-tariff-question/electricity-tariff-question.component";
import {FlatPositionQuestionComponent} from "./flat-position-question/flat-position-question.component";
import {FridgeFreezerQuestionComponent} from "./fridge-freezer-question/fridge-freezer-question.component";
import {FuelTypeQuestionComponent} from "./fuel-type-question/fuel-type-question.component";
import {HomeAgeQuestionComponent} from "./home-age-question/home-age-question.component";
import {HomeTypeQuestionComponent} from "./home-type-question/home-type-question.component";
import {LivingRoomTemperatureQuestionComponent} from "./living-room-temperature-question/living-room-temperature-question.component";
import {OccupantsQuestionComponent} from "./occupants-question/occupants-question.component";
import {PostcodeEpcQuestionComponent} from "./postcode-epc-question/postcode-epc-question.component";
import {ShowerTypeQuestionComponent} from "./shower-type-question/shower-type-question.component";
import {ShowersAndBathsQuestionComponent} from "./showers-and-baths-question/showers-and-baths-question.component";
import {StoreysQuestionComponent} from "./storeys-question/storeys-question.component";
import {CommonQuestionsModule} from "../common-questions/common-questions.module";
import {TenureTypeQuestionComponent} from "./tenure-type-question/tenure-type-question.component";
import {GrantsQuestionnaireQuestionComponent} from "./grants-questionnaire-question/grants-questionnaire-question.component";
import {BenefitsQuestionComponent} from "./benefits-question/benefits-question.component";
import {IncomeQuestionComponent} from "./income-question/income-question.component";
import {ConstructionQuestionComponent} from "./construction-question/construction-question.component";

@NgModule({
    declarations: [
        BedroomsQuestionComponent,
        BenefitsQuestionComponent,
        BoilerTypeQuestionComponent,
        ConfirmEpcQuestionComponent,
        ElectricityTariffQuestionComponent,
        FlatPositionQuestionComponent,
        FridgeFreezerQuestionComponent,
        FuelTypeQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        IncomeQuestionComponent,
        LivingRoomTemperatureQuestionComponent,
        OccupantsQuestionComponent,
        TenureTypeQuestionComponent,
        PostcodeEpcQuestionComponent,
        ShowerTypeQuestionComponent,
        ShowersAndBathsQuestionComponent,
        StoreysQuestionComponent,
        GrantsQuestionnaireQuestionComponent,
        ConstructionQuestionComponent,
    ],
    exports: [
        BedroomsQuestionComponent,
        BenefitsQuestionComponent,
        BoilerTypeQuestionComponent,
        ConfirmEpcQuestionComponent,
        ElectricityTariffQuestionComponent,
        FlatPositionQuestionComponent,
        FridgeFreezerQuestionComponent,
        FuelTypeQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        IncomeQuestionComponent,
        LivingRoomTemperatureQuestionComponent,
        OccupantsQuestionComponent,
        TenureTypeQuestionComponent,
        PostcodeEpcQuestionComponent,
        ShowerTypeQuestionComponent,
        ShowersAndBathsQuestionComponent,
        StoreysQuestionComponent,
        GrantsQuestionnaireQuestionComponent,
        ConstructionQuestionComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        CommonQuestionsModule,
    ],
    entryComponents: [
        BedroomsQuestionComponent,
        BenefitsQuestionComponent,
        BoilerTypeQuestionComponent,
        ConfirmEpcQuestionComponent,
        ElectricityTariffQuestionComponent,
        FlatPositionQuestionComponent,
        FridgeFreezerQuestionComponent,
        FuelTypeQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        IncomeQuestionComponent,
        LivingRoomTemperatureQuestionComponent,
        OccupantsQuestionComponent,
        TenureTypeQuestionComponent,
        PostcodeEpcQuestionComponent,
        ShowerTypeQuestionComponent,
        ShowersAndBathsQuestionComponent,
        StoreysQuestionComponent,
        GrantsQuestionnaireQuestionComponent,
        ConstructionQuestionComponent,
    ]
})
export class QuestionsModule {
}