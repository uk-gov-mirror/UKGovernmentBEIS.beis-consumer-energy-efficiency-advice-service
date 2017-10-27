import {Injectable} from "@angular/core";
import {Questionnaire} from "../../base-questionnaire/questionnaire";
import {ResponseData} from "../../../common/response-data/response-data";
import {PostcodeEpcQuestionMetadata} from "./questions/postcode-epc-question/postcode-epc-question-metadata";
import {ConfirmEpcQuestionMetadata} from "./questions/confirm-epc-question/confirm-epc-question-metadata";
import {HomeTypeQuestionMetadata} from "./questions/home-type-question/home-type-question-metadata";
import {FlatPositionQuestionMetadata} from "./questions/flat-position-question/flat-position-question-metadata";
import {HomeAgeQuestionMetadata} from "./questions/home-age-question/home-age-question-metadata";
import {BedroomsQuestionMetadata} from "./questions/bedrooms-question/bedrooms-question-metadata";
import {FuelTypeQuestionMetadata} from "./questions/fuel-type-question/fuel-type-question-metadata";
import {StoreysQuestionMetadata} from "./questions/storeys-question/storeys-question-metadata";
import {BoilerTypeQuestionMetadata} from "./questions/boiler-type-question/boiler-type-question-metadata";
import {ElectricityTariffQuestionMetadata} from "./questions/electricity-tariff-question/electricity-tariff-question-metadata";

@Injectable()
export class HomeBasicsQuestionnaire extends Questionnaire {
    constructor(responseData: ResponseData) {
        super(responseData, [
            new PostcodeEpcQuestionMetadata(),
            new ConfirmEpcQuestionMetadata(),
            new HomeTypeQuestionMetadata(),
            new FlatPositionQuestionMetadata(),
            new HomeAgeQuestionMetadata(),
            new StoreysQuestionMetadata(),
            new BedroomsQuestionMetadata(),
            new FuelTypeQuestionMetadata(),
            new BoilerTypeQuestionMetadata(),
            new ElectricityTariffQuestionMetadata()
        ]);
    }
}
