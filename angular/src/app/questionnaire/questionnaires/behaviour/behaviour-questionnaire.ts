import {Injectable} from "@angular/core";
import {Questionnaire} from "../../base-questionnaire/questionnaire";
import {ResponseData} from "../../../shared/response-data/response-data";
import {OccupantsQuestionMetadata} from "./questions/occupants-question/occupants-question-metadata";
import {ShowersQuestionMetadata} from "./questions/showers-question/showers-question-metadata";
import {FridgeFreezerQuestionMetadata} from "./questions/fridge-freezer-question/fridge-freezer-question-metadata";
import {LivingRoomTemperatureQuestionMetadata} from "./questions/living-room-temperature-question/living-room-temperature-question-metadata";
import {BathsQuestionMetadata} from "./questions/baths-question/baths-question-metadata";

@Injectable()
export class BehaviourQuestionnaire extends Questionnaire {
    constructor(responseData: ResponseData) {
        super(responseData, [
            new OccupantsQuestionMetadata(),
            new ShowersQuestionMetadata(),
            new BathsQuestionMetadata(),
            new LivingRoomTemperatureQuestionMetadata(),
            new FridgeFreezerQuestionMetadata()
        ]);
    }
}
