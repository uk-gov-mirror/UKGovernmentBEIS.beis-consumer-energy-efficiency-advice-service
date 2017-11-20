import {PostcodeEpcQuestionMetadata} from "./postcode-epc-question/postcode-epc-question-metadata";
import {ConfirmEpcQuestionMetadata} from "./confirm-epc-question/confirm-epc-question-metadata";
import {FlatPositionQuestionMetadata} from "./flat-position-question/flat-position-question-metadata";
import {HomeAgeQuestionMetadata} from "./home-age-question/home-age-question-metadata";
import {HomeTypeQuestionMetadata} from "./home-type-question/home-type-question-metadata";
import {StoreysQuestionMetadata} from "./storeys-question/storeys-question-metadata";
import {BedroomsQuestionMetadata} from "./bedrooms-question/bedrooms-question-metadata";
import {BoilerTypeQuestionMetadata} from "./boiler-type-question/boiler-type-question-metadata";
import {ElectricityTariffQuestionMetadata} from "./electricity-tariff-question/electricity-tariff-question-metadata";
import {FuelTypeQuestionMetadata} from "./fuel-type-question/fuel-type-question-metadata";
import {LivingRoomTemperatureQuestionMetadata} from "./living-room-temperature-question/living-room-temperature-question-metadata";
import {OccupantsQuestionMetadata} from "./occupants-question/occupants-question-metadata";
import {ShowerTypeQuestionMetadata} from "./shower-type-question/shower-type-question-metadata";
import {ShowersAndBathsQuestionMetadata} from "./showers-and-baths-question/showers-and-baths-question-metadata";
import {FridgeFreezerQuestionMetadata} from "./fridge-freezer-question/fridge-freezer-question-metadata";
import {TenureTypeQuestionMetadata} from "./tenure-type-question/tenure-type-question-metadata";
import {GrantsQuestionnaireQuestionMetadata} from "./grants-questionnaire-question/grants-questionnaire-question-metadata";
import {BenefitsQuestionMetadata} from "./benefits-question/benefits-question-metadata";
import {IncomeQuestionMetadata} from "./income-question/income-question-metadata";
import {HeatingCostQuestionMetadata} from "./heating-cost-question/heating-cost-question-metadata";
import {LengthOfHeatingOnQuestionMetadata} from "./length-of-heating-on-question/length-of-heating-on-question-metadata";
import {TumbleDryQuestionMetadata} from "./tumble-dry-question/tumble-dry-question-metadata";
import {ConstructionQuestionMetadata} from "./construction-question/construction-question-metadata";
import {WaterTankQuestionMetadata} from "./water-tank-question/water-tank-question-metadata";
import {GardenQuestionMetadata} from "./garden-question/garden-question-metadata";
import {RoofSpaceQuestionMetadata} from "./roof-space-question/roof-space-question-metadata";
import {OptionalPropertyQuestionMetadata} from "./optional-property-question/optional-property-question-metadata";

export const ADDRESS_AND_OWNERSHIP_STATUS = [
    new PostcodeEpcQuestionMetadata(),
    new TenureTypeQuestionMetadata(),
    new ConfirmEpcQuestionMetadata(),
];

export const CORE_BRE_QUESTIONS = [
    new HomeTypeQuestionMetadata(),
    new FlatPositionQuestionMetadata(),
    new HomeAgeQuestionMetadata(),
    new StoreysQuestionMetadata(),
    new BedroomsQuestionMetadata(),
    new OptionalPropertyQuestionMetadata(),
    new FuelTypeQuestionMetadata(),
    new BoilerTypeQuestionMetadata(),
    new ElectricityTariffQuestionMetadata(),
    new HeatingCostQuestionMetadata(),
    new LengthOfHeatingOnQuestionMetadata()
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