import {Injectable} from "@angular/core";
import {Questionnaire} from "../../base-questionnaire/questionnaire";
import {ResponseData} from "../../../shared/response-data/response-data";
import {OccupantsQuestionMetadata} from "./questions/occupants-question/occupants-question-metadata";
import {FridgeFreezerQuestionMetadata} from "./questions/fridge-freezer-question/fridge-freezer-question-metadata";

@Injectable()
export class BehaviourQuestionnaire extends Questionnaire {
    constructor(responseData: ResponseData) {
        super(responseData, [
            new OccupantsQuestionMetadata(),
            new FridgeFreezerQuestionMetadata(),
        ]);
    }
}
