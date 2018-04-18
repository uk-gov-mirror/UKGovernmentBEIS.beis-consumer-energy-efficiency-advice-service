import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';

import {SharedModule} from '../../shared/shared.module';
import {BedroomsQuestionComponent} from './bedrooms-question/bedrooms-question.component';
import {BoilerTypeQuestionComponent} from './boiler-type-question/boiler-type-question.component';
import {HotWaterCylinderQuestionComponent} from "./hot-water-cylinder-question/hot-water-cylinder-question.component";
import {ConfirmEpcQuestionComponent} from './confirm-epc-question/confirm-epc-question.component';
import {ElectricityTariffQuestionComponent} from './electricity-tariff-question/electricity-tariff-question.component';
import {FridgeFreezerQuestionComponent} from './fridge-freezer-question/fridge-freezer-question.component';
import {FuelTypeQuestionComponent} from './fuel-type-question/fuel-type-question.component';
import {HomeAgeQuestionComponent} from './home-age-question/home-age-question.component';
import {HomeTypeQuestionComponent} from './home-type-question/home-type-question.component';
import {LivingRoomTemperatureQuestionComponent} from './living-room-temperature-question/living-room-temperature-question.component';
import {OccupantsQuestionComponent} from './occupants-question/occupants-question.component';
import {PostcodeEpcQuestionComponent} from './postcode-epc-question/postcode-epc-question.component';
import {ShowerTypeQuestionComponent} from './shower-type-question/shower-type-question.component';
import {ShowersAndBathsQuestionComponent} from './showers-and-baths-question/showers-and-baths-question.component';
import {HouseStoreysQuestionComponent} from './house-storeys-question/house-storeys-question.component';
import {CommonQuestionsModule} from '../common-questions/common-questions.module';
import {TenureTypeQuestionComponent} from './tenure-type-question/tenure-type-question.component';
import {GrantsQuestionnaireQuestionComponent} from './grants-questionnaire-question/grants-questionnaire-question.component';
import {BenefitsQuestionComponent} from './benefits-question/benefits-question.component';
import {HeatingCostQuestionComponent} from './heating-cost-question/heating-cost-question.component';
import {IncomeQuestionComponent} from './income-question/income-question.component';
import {TumbleDryQuestionComponent} from './tumble-dry-question/tumble-dry-question.component';
import {ConstructionQuestionComponent} from './construction-question/construction-question.component';
import {WaterTankQuestionComponent} from './water-tank-question/water-tank-question.component';
import {GardenQuestionComponent} from './garden-question/garden-question.component';
import {RoofSpaceQuestionComponent} from './roof-space-question/roof-space-question.component';
import {OptionalPropertyQuestionComponent} from './optional-property-question/optional-property-question.component';
import {FloorAreaQuestionComponent} from './floor-area-question/floor-area-question.component';
import {DetailedLengthOfHeatingOnQuestionComponent} from
    './detailed-length-of-heating-on-question/detailed-length-of-heating-on-question.component';
import {FlatStoreysQuestionComponent} from './flat-storeys-question/flat-storeys-question.component';
import {FloorLevelQuestionComponent} from './floor-level-question/floor-level-question.component';
import {FloorSpanQuestionComponent} from './floor-span-question/floor-span-question.component';
import {FlatExposedWallQuestionComponent} from './flat-exposed-wall-question/flat-exposed-wall-question.component';
import {HouseExposedWallQuestionComponent} from './house-exposed-wall-question/house-exposed-wall-question.component';
import {DomesticPropertyAfter2018QuestionComponent} from
    './mees/domestic-property-after-2018-question/domestic-property-after-2018-question.component';
import {PropertyAfter2020QuestionComponent} from './mees/property-after-2020-question/property-after-2020-question.component';
import {EpcRequiredQuestionComponent} from './mees/epc-required-question/epc-required-question.component';
import {TenancyTypeQuestionComponent} from './mees/tenancy-type-question/tenancy-type-question.component';
import {EpcBelowEQuestionComponent} from "./mees/epc-below-e-question/epc-below-e-question.component";
import {RecommendedImprovementsQuestionComponent} from
    './mees/recommended-improvements-question/recommended-improvements-question.component';
import {ImprovementsAtNoCostQuestionComponent} from './mees/improvements-at-no-cost-question/improvements-at-no-cost-question.component';
import {TenantConsentQuestionComponent} from './mees/tenant-consent-question/tenant-consent-question.component';
import {PropertyDevaluationQuestionComponent} from './mees/property-devaluation-question/property-devaluation-question.component';
import {TemporaryExclusionsQuestionComponent} from './mees/temporary-exclusions-question/temporary-exclusions-question.component';

@NgModule({
    declarations: [
        BedroomsQuestionComponent,
        BenefitsQuestionComponent,
        BoilerTypeQuestionComponent,
        ConfirmEpcQuestionComponent,
        DetailedLengthOfHeatingOnQuestionComponent,
        ElectricityTariffQuestionComponent,
        FlatExposedWallQuestionComponent,
        FlatStoreysQuestionComponent,
        FloorAreaQuestionComponent,
        FloorLevelQuestionComponent,
        FloorSpanQuestionComponent,
        FridgeFreezerQuestionComponent,
        FuelTypeQuestionComponent,
        HeatingCostQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        HotWaterCylinderQuestionComponent,
        HouseExposedWallQuestionComponent,
        HouseStoreysQuestionComponent,
        IncomeQuestionComponent,
        LivingRoomTemperatureQuestionComponent,
        OccupantsQuestionComponent,
        OptionalPropertyQuestionComponent,
        TenureTypeQuestionComponent,
        PostcodeEpcQuestionComponent,
        ShowerTypeQuestionComponent,
        ShowersAndBathsQuestionComponent,
        TumbleDryQuestionComponent,
        GrantsQuestionnaireQuestionComponent,
        ConstructionQuestionComponent,
        WaterTankQuestionComponent,
        GardenQuestionComponent,
        RoofSpaceQuestionComponent,
        DomesticPropertyAfter2018QuestionComponent,
        PropertyAfter2020QuestionComponent,
        EpcRequiredQuestionComponent,
        TenancyTypeQuestionComponent,
        EpcBelowEQuestionComponent,
        RecommendedImprovementsQuestionComponent,
        ImprovementsAtNoCostQuestionComponent,
        TenantConsentQuestionComponent,
        PropertyDevaluationQuestionComponent,
        TemporaryExclusionsQuestionComponent,
    ],
    exports: [
        BedroomsQuestionComponent,
        BenefitsQuestionComponent,
        BoilerTypeQuestionComponent,
        ConfirmEpcQuestionComponent,
        DetailedLengthOfHeatingOnQuestionComponent,
        ElectricityTariffQuestionComponent,
        FlatExposedWallQuestionComponent,
        FlatStoreysQuestionComponent,
        FloorAreaQuestionComponent,
        FloorLevelQuestionComponent,
        FloorSpanQuestionComponent,
        FridgeFreezerQuestionComponent,
        FuelTypeQuestionComponent,
        HeatingCostQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        HotWaterCylinderQuestionComponent,
        HouseExposedWallQuestionComponent,
        HouseStoreysQuestionComponent,
        IncomeQuestionComponent,
        LivingRoomTemperatureQuestionComponent,
        OccupantsQuestionComponent,
        OptionalPropertyQuestionComponent,
        TenureTypeQuestionComponent,
        PostcodeEpcQuestionComponent,
        ShowerTypeQuestionComponent,
        ShowersAndBathsQuestionComponent,
        TumbleDryQuestionComponent,
        GrantsQuestionnaireQuestionComponent,
        ConstructionQuestionComponent,
        WaterTankQuestionComponent,
        GardenQuestionComponent,
        RoofSpaceQuestionComponent,
        DomesticPropertyAfter2018QuestionComponent,
        PropertyAfter2020QuestionComponent,
        EpcRequiredQuestionComponent,
        TenancyTypeQuestionComponent,
        EpcBelowEQuestionComponent,
        RecommendedImprovementsQuestionComponent,
        ImprovementsAtNoCostQuestionComponent,
        TenantConsentQuestionComponent,
        PropertyDevaluationQuestionComponent,
        TemporaryExclusionsQuestionComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        CommonQuestionsModule,
        NouisliderModule,
    ],
    entryComponents: [
        BedroomsQuestionComponent,
        BenefitsQuestionComponent,
        BoilerTypeQuestionComponent,
        ConfirmEpcQuestionComponent,
        DetailedLengthOfHeatingOnQuestionComponent,
        ElectricityTariffQuestionComponent,
        FlatExposedWallQuestionComponent,
        FlatStoreysQuestionComponent,
        FloorAreaQuestionComponent,
        FloorLevelQuestionComponent,
        FloorSpanQuestionComponent,
        FridgeFreezerQuestionComponent,
        FuelTypeQuestionComponent,
        HeatingCostQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        HotWaterCylinderQuestionComponent,
        HouseExposedWallQuestionComponent,
        HouseStoreysQuestionComponent,
        IncomeQuestionComponent,
        LivingRoomTemperatureQuestionComponent,
        OccupantsQuestionComponent,
        OptionalPropertyQuestionComponent,
        TenureTypeQuestionComponent,
        PostcodeEpcQuestionComponent,
        ShowerTypeQuestionComponent,
        ShowersAndBathsQuestionComponent,
        TumbleDryQuestionComponent,
        GrantsQuestionnaireQuestionComponent,
        ConstructionQuestionComponent,
        WaterTankQuestionComponent,
        GardenQuestionComponent,
        RoofSpaceQuestionComponent,
        DomesticPropertyAfter2018QuestionComponent,
        PropertyAfter2020QuestionComponent,
        EpcRequiredQuestionComponent,
        TenancyTypeQuestionComponent,
        EpcBelowEQuestionComponent,
        RecommendedImprovementsQuestionComponent,
        ImprovementsAtNoCostQuestionComponent,
        TenantConsentQuestionComponent,
        PropertyDevaluationQuestionComponent,
        TemporaryExclusionsQuestionComponent,
    ]
})
export class QuestionsModule {
}
