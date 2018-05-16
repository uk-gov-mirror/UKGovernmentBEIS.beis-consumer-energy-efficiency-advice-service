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
import {ShowersAndBathsQuestionMetadata} from './showers-and-baths-question/showers-and-baths-question-metadata';
import {TenureTypeQuestionMetadata} from './tenure-type-question/tenure-type-question-metadata';
import {GrantsQuestionnaireQuestionMetadata} from './grants-questionnaire-question/grants-questionnaire-question-metadata';
import {BenefitsQuestionMetadata} from './benefits-question/benefits-question-metadata';
import {IncomeQuestionMetadata} from './income-question/income-question-metadata';
import {ConstructionQuestionMetadata} from './construction-question/construction-question-metadata';
import {WaterTankQuestionMetadata} from './water-tank-question/water-tank-question-metadata';
import {GardenQuestionMetadata} from './garden-question/garden-question-metadata';
import {RoofSpaceQuestionMetadata} from './roof-space-question/roof-space-question-metadata';
import {OptionalPropertyQuestionMetadata} from './optional-property-question/optional-property-question-metadata';
import {FloorAreaQuestionMetadata} from './floor-area-question/floor-area-question-metadata';
import {DetailedLengthOfHeatingOnQuestionMetadata} from './detailed-length-of-heating-on-question/detailed-length-of-heating-on-question-metadata';
import {FlatStoreysQuestionMetadata} from './flat-storeys-question/flat-storeys-question-metadata';
import {FloorLevelQuestionMetadata} from './floor-level-question/floor-level-question-metadata';
import {FloorSpanQuestionMetadata} from './floor-span-question/floor-span-question-metadata';
import {FlatExposedWallQuestionMetadata} from './flat-exposed-wall-question/flat-exposed-wall-question-metadata';
import {HouseExposedWallQuestionMetadata} from './house-exposed-wall-question/house-exposed-wall-question-metadata';
import {LettingDomesticPropertyQuestionMetadata} from './mees/letting-domestic-property-question/letting-domestic-property-question-metadata';
import {EpcRequiredQuestionMetadata} from './mees/epc-required-question/epc-required-question-metadata';
import {TenancyTypeQuestionMetadata} from './mees/tenancy-type-question/tenancy-type-question-metadata';
import {PropertyEpcQuestionMetadata} from './mees/property-epc-question/property-epc-question-metadata';
import {MeesPostcodeEpcQuestionMetadata} from './mees/mees-postcode-epc-question/mees-postcode-epc-question-metadata';
import {EpcNotFoundMetadata} from './mees/epc-not-found-question/epc-not-found-metadata';
import {HotWaterCylinderQuestionMetadata} from './hot-water-cylinder-question/hot-water-cylinder-question-metadata';
import {AgriculturalTenancyTypeQuestionMetadata} from './mees/agricultural-tenancy-type-question/agricultural-tenancy-type-question-metadata';
import {TenancyStartDateQuestionMetadata} from './mees/tenancy-start-date-question/tenancy-start-date-question-metadata';

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
    new FuelTypeQuestionMetadata(),
    new HotWaterCylinderQuestionMetadata(),
    new BoilerTypeQuestionMetadata(),
    new ElectricityTariffQuestionMetadata(),
    new DetailedLengthOfHeatingOnQuestionMetadata()
];

export const BASIC_BEHAVIOURAL_QUESTIONS = [
    new LivingRoomTemperatureQuestionMetadata(),
    new OccupantsQuestionMetadata(),
    new ShowersAndBathsQuestionMetadata()
];

export const GRANTS_QUESTIONNAIRE_QUESTION = [
    new GrantsQuestionnaireQuestionMetadata()
];

export const GRANTS_QUESTIONS = [
    // Used to determine the applicable Local Authority
    new PostcodeEpcQuestionMetadata(),
    // Used to show savings per-month or per-year,
    // and for some grant applicability e.g. EcoHhcroSocialEfg
    new TenureTypeQuestionMetadata(),
    // Used  for some grant applicability e.g. ColdWeatherPayments
    new BenefitsQuestionMetadata(),
    // Used  for some grant applicability e.g. EcoHhcroHelpToHeat
    new OccupantsQuestionMetadata(),
    // Used  for some grant applicability e.g. EcoHhcroHelpToHeat
    new IncomeQuestionMetadata()
];

export const BOILER_QUESTIONS = [
    // Used to decide if the property is "well insulated", restricts which boilers are offered
    new ConstructionQuestionMetadata(),
    // Used to decide if boilers with tanks can be offered
    new WaterTankQuestionMetadata(),
    // Used to decide if ground-source-heat-pump boilers can be offered
    new GardenQuestionMetadata(),
    // Used to decide if solar boilers can be offered
    new RoofSpaceQuestionMetadata(),
    // Restricts which boilers are offered
    new FuelTypeQuestionMetadata(),
];

// Questions for the "Minimum Energy Efficiency Standards" questionnaire ("MEES"), aimed at landlords.
export const MEES_QUESTIONS = [
    new LettingDomesticPropertyQuestionMetadata(),
    new TenancyStartDateQuestionMetadata(),
    new TenancyTypeQuestionMetadata(),
    new AgriculturalTenancyTypeQuestionMetadata(),
    new PropertyEpcQuestionMetadata(),
    new MeesPostcodeEpcQuestionMetadata(),
    new EpcNotFoundMetadata(),
    new EpcRequiredQuestionMetadata(),
];
