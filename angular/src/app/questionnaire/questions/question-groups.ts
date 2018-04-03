import {PostcodeEpcQuestionMetadata} from './postcode-epc-question/postcode-epc-question-metadata';
import {ConfirmEpcQuestionMetadata} from './confirm-epc-question/confirm-epc-question-metadata';
import {HomeAgeQuestionMetadata} from './home-age-question/home-age-question-metadata';
import {HomeTypeQuestionMetadata} from './home-type-question/home-type-question-metadata';
import {HouseStoreysQuestionMetadata} from './house-storeys-question/house-storeys-question-metadata';
import {BedroomsQuestionMetadata} from './bedrooms-question/bedrooms-question-metadata';
import {BoilerTypeQuestionMetadata} from './boiler-type-question/boiler-type-question-metadata';
import {ElectricityTariffQuestionMetadata} from './electricity-tariff-question/electricity-tariff-question-metadata';
import {FuelTypeQuestionMetadata} from './fuel-type-question/fuel-type-question-metadata';
import {LivingRoomTemperatureQuestionMetadata} from './living-room-temperature-question/living-room-temperature-question-metadata';
import {OccupantsQuestionMetadata} from './occupants-question/occupants-question-metadata';
import {ShowerTypeQuestionMetadata} from './shower-type-question/shower-type-question-metadata';
import {ShowersAndBathsQuestionMetadata} from './showers-and-baths-question/showers-and-baths-question-metadata';
import {FridgeFreezerQuestionMetadata} from './fridge-freezer-question/fridge-freezer-question-metadata';
import {TenureTypeQuestionMetadata} from './tenure-type-question/tenure-type-question-metadata';
import {GrantsQuestionnaireQuestionMetadata} from './grants-questionnaire-question/grants-questionnaire-question-metadata';
import {BenefitsQuestionMetadata} from './benefits-question/benefits-question-metadata';
import {IncomeQuestionMetadata} from './income-question/income-question-metadata';
import {HeatingCostQuestionMetadata} from './heating-cost-question/heating-cost-question-metadata';
import {TumbleDryQuestionMetadata} from './tumble-dry-question/tumble-dry-question-metadata';
import {ConstructionQuestionMetadata} from './construction-question/construction-question-metadata';
import {WaterTankQuestionMetadata} from './water-tank-question/water-tank-question-metadata';
import {GardenQuestionMetadata} from './garden-question/garden-question-metadata';
import {RoofSpaceQuestionMetadata} from './roof-space-question/roof-space-question-metadata';
import {OptionalPropertyQuestionMetadata} from './optional-property-question/optional-property-question-metadata';
import {FloorAreaQuestionMetadata} from './floor-area-question/floor-area-question-metadata';
import {DetailedLengthOfHeatingOnQuestionMetadata} from
    './detailed-length-of-heating-on-question/detailed-length-of-heating-on-question-metadata';
import {FlatStoreysQuestionMetadata} from './flat-storeys-question/flat-storeys-question-metadata';
import {FloorLevelQuestionMetadata} from './floor-level-question/floor-level-question-metadata';
import {FloorSpanQuestionMetadata} from './floor-span-question/floor-span-question-metadata';
import {FlatExposedWallQuestionMetadata} from './flat-exposed-wall-question/flat-exposed-wall-question-metadata';
import {HouseExposedWallQuestionMetadata} from './house-exposed-wall-question/house-exposed-wall-question-metadata';
import {DomesticPropertyAfter2018QuestionMetadata} from
    './mees/domestic-property-after-2018-question/domestic-property-after-2018-question-metadata';
import {PropertyAfter2020QuestionMetadata} from './mees/property-after-2020-question/property-after-2020-question-metadata';
import {EpcRequiredQuestionMetadata} from './mees/epc-required-question/epc-required-question-metadata';
import {TenancyTypeQuestionMetadata} from './mees/tenancy-type-question/tenancy-type-question-metadata';
import {EpcBelowEQuestionMetadata} from './mees/epc-below-e-question/epc-below-e-question-metadata';
import {RecommendedImprovementsQuestionMetadata} from './mees/recommended-improvements-question/recommended-improvements-question-metadata';
import {ImprovementsAtNoCostQuestionMetadata} from './mees/improvements-at-no-cost-question/improvements-at-no-cost-question-metadata';
import {TenantConsentQuestionMetadata} from './mees/tenant-consent-question/tenant-consent-question-metadata';
import {TemporaryExclusionsQuestionMetadata} from './mees/temporary-exclusions-question/temporary-exclusions-question-metadata';
import {PropertyDevaluationQuestionMetadata} from './mees/property-devaluation-question/property-devaluation-question-metadata';

export const ADDRESS = [
    new PostcodeEpcQuestionMetadata()
];

export const EPC_AND_OWNERSHIP_STATUS = [
    new ConfirmEpcQuestionMetadata(),
    new TenureTypeQuestionMetadata(),
];

export const CORE_BRE_QUESTIONS = [
    new HomeTypeQuestionMetadata(),
    new HouseStoreysQuestionMetadata(),
    new FlatStoreysQuestionMetadata(),
    new FloorLevelQuestionMetadata(),
    new FloorSpanQuestionMetadata(),
    new HouseExposedWallQuestionMetadata(),
    new FlatExposedWallQuestionMetadata(),
    new HomeAgeQuestionMetadata(),
    new BedroomsQuestionMetadata(),
    new OptionalPropertyQuestionMetadata(),
    new FloorAreaQuestionMetadata(),
    new ConstructionQuestionMetadata(),
    new GardenQuestionMetadata(),
    new FuelTypeQuestionMetadata(),
    new BoilerTypeQuestionMetadata(),
    new ElectricityTariffQuestionMetadata(),
    new HeatingCostQuestionMetadata(),
    new DetailedLengthOfHeatingOnQuestionMetadata()
];

export const BASIC_BEHAVIOURAL_QUESTIONS = [
    new LivingRoomTemperatureQuestionMetadata(),
    new OccupantsQuestionMetadata(),
    new ShowersAndBathsQuestionMetadata()
];

export const OTHER_BEHAVIOURAL_QUESTIONS = [
    new ShowerTypeQuestionMetadata(),
    new TumbleDryQuestionMetadata(),
    new FridgeFreezerQuestionMetadata(),
];

export const GRANTS_QUESTIONNAIRE_QUESTION = [
    new GrantsQuestionnaireQuestionMetadata()
];

export const GRANTS_QUESTIONS = [
    new PostcodeEpcQuestionMetadata(),
    new TenureTypeQuestionMetadata(),
    new BenefitsQuestionMetadata(),
    new OccupantsQuestionMetadata(),
    new IncomeQuestionMetadata()
];

export const BOILER_QUESTIONS = [
    new ConstructionQuestionMetadata(),
    new WaterTankQuestionMetadata(),
    new GardenQuestionMetadata(),
    new RoofSpaceQuestionMetadata(),
    new FuelTypeQuestionMetadata(),
    new OccupantsQuestionMetadata(),
    new ShowersAndBathsQuestionMetadata(),
];

export const MEES_QUESTIONS = [
    new DomesticPropertyAfter2018QuestionMetadata(),
    new PropertyAfter2020QuestionMetadata(),
    new EpcRequiredQuestionMetadata(),
    new TenancyTypeQuestionMetadata(),
    new EpcBelowEQuestionMetadata(),
    new RecommendedImprovementsQuestionMetadata(),
    new ImprovementsAtNoCostQuestionMetadata(),
    new TenantConsentQuestionMetadata(),
    new PropertyDevaluationQuestionMetadata(),
    new TemporaryExclusionsQuestionMetadata(),
];
