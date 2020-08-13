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
import {FuelTypeQuestionComponent} from './fuel-type-question/fuel-type-question.component';
import {HomeAgeQuestionComponent} from './home-age-question/home-age-question.component';
import {HomeTypeQuestionComponent} from './home-type-question/home-type-question.component';
import {LivingRoomTemperatureQuestionComponent} from './living-room-temperature-question/living-room-temperature-question.component';
import {OccupantsQuestionComponent} from './occupants-question/occupants-question.component';
import {PostcodeEpcQuestionComponent} from './postcode-epc-question/postcode-epc-question.component';
import {ShowersAndBathsQuestionComponent} from './showers-and-baths-question/showers-and-baths-question.component';
import {HouseStoreysQuestionComponent} from './house-storeys-question/house-storeys-question.component';
import {CommonQuestionsModule} from '../common-questions/common-questions.module';
import {TenureTypeQuestionComponent} from './tenure-type-question/tenure-type-question.component';
import {GrantsQuestionnaireQuestionComponent} from './grants-questionnaire-question/grants-questionnaire-question.component';
import {IncomeQuestionComponent} from './income-question/income-question.component';
import {ConstructionQuestionComponent} from './construction-question/construction-question.component';
import {WaterTankQuestionComponent} from './water-tank-question/water-tank-question.component';
import {GardenQuestionComponent} from './garden-question/garden-question.component';
import {RoofSpaceQuestionComponent} from './roof-space-question/roof-space-question.component';
import {OptionalPropertyQuestionComponent} from './optional-property-question/optional-property-question.component';
import {FloorAreaQuestionComponent} from './floor-area-question/floor-area-question.component';
import {DetailedLengthOfHeatingOnQuestionComponent} from './detailed-length-of-heating-on-question/detailed-length-of-heating-on-question.component';
import {FlatStoreysQuestionComponent} from './flat-storeys-question/flat-storeys-question.component';
import {FloorLevelQuestionComponent} from './floor-level-question/floor-level-question.component';
import {FloorSpanQuestionComponent} from './floor-span-question/floor-span-question.component';
import {FlatExposedWallQuestionComponent} from './flat-exposed-wall-question/flat-exposed-wall-question.component';
import {LettingDomesticPropertyQuestionComponent} from './mees/letting-domestic-property-question/letting-domestic-property-question.component';
import {EpcRequiredQuestionComponent} from './mees/epc-required-question/epc-required-question.component';
import {TenancyTypeQuestionComponent} from './mees/tenancy-type-question/tenancy-type-question.component';
import {PropertyEpcQuestionComponent} from './mees/property-epc-question/property-epc-question.component';
import {EpcNotFoundComponent} from './mees/epc-not-found-question/epc-not-found.component';
import {AgriculturalTenancyTypeQuestionComponent} from './mees/agricultural-tenancy-type-question/agricultural-tenancy-type-question.component';
import {BuiltFormQuestionComponent} from "./built-form-question/built-form-question.component";
import {IncomeRelatedBenefitsQuestionComponent} from "./benefits-questions/income-related-benefits-question.component";
import {ContributionBasedBenefitsQuestionComponent} from "./benefits-questions/contribution-based-benefits-question.component";
import {PensionGuaranteeCreditQuestionComponent} from "./benefits-questions/pension-guarantee-credit-question.component";
import {ChildBenefitsQuestionComponent} from "./benefits-questions/child-benefits-question.component";
import {DefenseRelatedBenefitsQuestionComponent} from "./benefits-questions/defense-related-benefits-question.component";
import {SocietalBenefitsQuestionComponent} from "./benefits-questions/societal-benefits-question.component";
import {ContactDetailsQuestionComponent} from "./contact-details-question/contact-details-question.component";
import {HasLoftQuestionComponent} from "./has-loft-question/has-loft-question.component";
import {LoftInsulationQuestionComponent} from "./loft-insulation-question/loft-insulation-question.component";
import {LoftClutterQuestionComponent} from "./loft-clutter-question/loft-clutter-question.component";
import {LoftInfestationQuestionComponent} from "./loft-infestation-question/loft-infestation-question.component";
import {LoftWaterDamageQuestionComponent} from "./loft-water-damage-question/loft-water-damage-question.component";
import {WallTypeQuestionComponent} from "./wall-type-question/wall-type-question.component";
import {NewBuildQuestionComponent} from "./new-build-question/new-build-question.component";
import {OwnHomeQuestionComponent} from "./own-home-question/own-home-question.component";
import {CountryPostcodeQuestionComponent} from "./country-postcode-question/country-postcode-question.component";
import {AnyBenefitsQuestionComponent} from "./benefits-questions/any-benefits-question.component";
import {HousingBenefitQuestionComponent} from "./benefits-questions/housing-benefit-question.component";
import {EnglishPropertyQuestionComponent} from './english-property-question/english-property-question.component';


@NgModule({
    declarations: [
        AnyBenefitsQuestionComponent,
        BedroomsQuestionComponent,
        BoilerTypeQuestionComponent,
        BuiltFormQuestionComponent,
        ChildBenefitsQuestionComponent,
        ConfirmEpcQuestionComponent,
        CountryPostcodeQuestionComponent,
        ContributionBasedBenefitsQuestionComponent,
        DefenseRelatedBenefitsQuestionComponent,
        DetailedLengthOfHeatingOnQuestionComponent,
        ElectricityTariffQuestionComponent,
        EnglishPropertyQuestionComponent,
        FlatExposedWallQuestionComponent,
        FlatStoreysQuestionComponent,
        FloorAreaQuestionComponent,
        FloorLevelQuestionComponent,
        FloorSpanQuestionComponent,
        FuelTypeQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        HotWaterCylinderQuestionComponent,
        HouseStoreysQuestionComponent,
        HousingBenefitQuestionComponent,
        IncomeQuestionComponent,
        IncomeRelatedBenefitsQuestionComponent,
        LivingRoomTemperatureQuestionComponent,
        NewBuildQuestionComponent,
        OccupantsQuestionComponent,
        OptionalPropertyQuestionComponent,
        OwnHomeQuestionComponent,
        TenureTypeQuestionComponent,
        PensionGuaranteeCreditQuestionComponent,
        PostcodeEpcQuestionComponent,
        ShowersAndBathsQuestionComponent,
        SocietalBenefitsQuestionComponent,
        GrantsQuestionnaireQuestionComponent,
        ConstructionQuestionComponent,
        WaterTankQuestionComponent,
        GardenQuestionComponent,
        RoofSpaceQuestionComponent,
        LettingDomesticPropertyQuestionComponent,
        EpcRequiredQuestionComponent,
        TenancyTypeQuestionComponent,
        AgriculturalTenancyTypeQuestionComponent,
        PropertyEpcQuestionComponent,
        EpcNotFoundComponent,
        ContactDetailsQuestionComponent,
        HasLoftQuestionComponent,
        LoftInsulationQuestionComponent,
        LoftClutterQuestionComponent,
        LoftInfestationQuestionComponent,
        LoftWaterDamageQuestionComponent,
        WallTypeQuestionComponent
    ],
    exports: [
        AnyBenefitsQuestionComponent,
        BedroomsQuestionComponent,
        BoilerTypeQuestionComponent,
        BuiltFormQuestionComponent,
        ChildBenefitsQuestionComponent,
        ConfirmEpcQuestionComponent,
        ContributionBasedBenefitsQuestionComponent,
        CountryPostcodeQuestionComponent,
        DefenseRelatedBenefitsQuestionComponent,
        DetailedLengthOfHeatingOnQuestionComponent,
        ElectricityTariffQuestionComponent,
        EnglishPropertyQuestionComponent,
        FlatExposedWallQuestionComponent,
        FlatStoreysQuestionComponent,
        FloorAreaQuestionComponent,
        FloorLevelQuestionComponent,
        FloorSpanQuestionComponent,
        FuelTypeQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        HotWaterCylinderQuestionComponent,
        HouseStoreysQuestionComponent,
        HousingBenefitQuestionComponent,
        IncomeQuestionComponent,
        IncomeRelatedBenefitsQuestionComponent,
        LivingRoomTemperatureQuestionComponent,
        NewBuildQuestionComponent,
        OccupantsQuestionComponent,
        OptionalPropertyQuestionComponent,
        OwnHomeQuestionComponent,
        TenureTypeQuestionComponent,
        PensionGuaranteeCreditQuestionComponent,
        PostcodeEpcQuestionComponent,
        ShowersAndBathsQuestionComponent,
        SocietalBenefitsQuestionComponent,
        GrantsQuestionnaireQuestionComponent,
        ConstructionQuestionComponent,
        WaterTankQuestionComponent,
        GardenQuestionComponent,
        RoofSpaceQuestionComponent,
        LettingDomesticPropertyQuestionComponent,
        EpcRequiredQuestionComponent,
        TenancyTypeQuestionComponent,
        AgriculturalTenancyTypeQuestionComponent,
        PropertyEpcQuestionComponent,
        EpcNotFoundComponent,
        ContactDetailsQuestionComponent,
        HasLoftQuestionComponent,
        LoftInsulationQuestionComponent,
        LoftClutterQuestionComponent,
        LoftInfestationQuestionComponent,
        LoftWaterDamageQuestionComponent,
        WallTypeQuestionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        CommonQuestionsModule,
        NouisliderModule,
    ],
    entryComponents: [
        AnyBenefitsQuestionComponent,
        BedroomsQuestionComponent,
        BoilerTypeQuestionComponent,
        BuiltFormQuestionComponent,
        ChildBenefitsQuestionComponent,
        ConfirmEpcQuestionComponent,
        ContributionBasedBenefitsQuestionComponent,
        CountryPostcodeQuestionComponent,
        DefenseRelatedBenefitsQuestionComponent,
        DetailedLengthOfHeatingOnQuestionComponent,
        ElectricityTariffQuestionComponent,
        EnglishPropertyQuestionComponent,
        FlatExposedWallQuestionComponent,
        FlatStoreysQuestionComponent,
        FloorAreaQuestionComponent,
        FloorLevelQuestionComponent,
        FloorSpanQuestionComponent,
        FuelTypeQuestionComponent,
        HomeAgeQuestionComponent,
        HomeTypeQuestionComponent,
        HotWaterCylinderQuestionComponent,
        HouseStoreysQuestionComponent,
        HousingBenefitQuestionComponent,
        IncomeQuestionComponent,
        IncomeRelatedBenefitsQuestionComponent,
        LivingRoomTemperatureQuestionComponent,
        NewBuildQuestionComponent,
        OccupantsQuestionComponent,
        OptionalPropertyQuestionComponent,
        OwnHomeQuestionComponent,
        TenureTypeQuestionComponent,
        PensionGuaranteeCreditQuestionComponent,
        PostcodeEpcQuestionComponent,
        ShowersAndBathsQuestionComponent,
        SocietalBenefitsQuestionComponent,
        GrantsQuestionnaireQuestionComponent,
        ConstructionQuestionComponent,
        WaterTankQuestionComponent,
        GardenQuestionComponent,
        RoofSpaceQuestionComponent,
        LettingDomesticPropertyQuestionComponent,
        EpcRequiredQuestionComponent,
        TenancyTypeQuestionComponent,
        AgriculturalTenancyTypeQuestionComponent,
        PropertyEpcQuestionComponent,
        EpcNotFoundComponent,
        ContactDetailsQuestionComponent,
        HasLoftQuestionComponent,
        LoftInsulationQuestionComponent,
        LoftClutterQuestionComponent,
        LoftInfestationQuestionComponent,
        LoftWaterDamageQuestionComponent,
        WallTypeQuestionComponent
    ]
})
export class QuestionsModule {
}
