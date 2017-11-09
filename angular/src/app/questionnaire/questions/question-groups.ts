import {PostcodeEpcQuestionMetadata} from "./postcode-epc-question/postcode-epc-question-metadata";
import {ConfirmEpcQuestionMetadata} from "./confirm-epc-question/confirm-epc-question-metadata";
import {OwnershipStatusQuestionMetadata} from "./ownership-status-question/ownership-status-question-metadata";
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
import {ShowersQuestionMetadata} from "./showers-question/showers-question-metadata";
import {BathsQuestionMetadata} from "./baths-question/baths-question-metadata";
import {FridgeFreezerQuestionMetadata} from "./fridge-freezer-question/fridge-freezer-question-metadata";

export const ADDRESS_AND_OWNERSHIP_STATUS = [
    new PostcodeEpcQuestionMetadata(),
    new OwnershipStatusQuestionMetadata(),
    new ConfirmEpcQuestionMetadata(),
];

export const CORE_BRE_QUESTIONS = [
    new HomeTypeQuestionMetadata(),
    new FlatPositionQuestionMetadata(),
    new HomeAgeQuestionMetadata(),
    new StoreysQuestionMetadata(),
    new BedroomsQuestionMetadata(),
    new FuelTypeQuestionMetadata(),
    new BoilerTypeQuestionMetadata(),
    new ElectricityTariffQuestionMetadata(),
];

export const BASIC_BEHAVIOURAL_QUESTIONS = [
    new LivingRoomTemperatureQuestionMetadata(),
    new OccupantsQuestionMetadata(),
];

export const OTHER_BEHAVIOURAL_QUESTIONS = [
    new ShowersQuestionMetadata(),
    new BathsQuestionMetadata(),
    new ShowerTypeQuestionMetadata(),
    new FridgeFreezerQuestionMetadata(),
];