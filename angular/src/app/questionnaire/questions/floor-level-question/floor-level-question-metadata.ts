import {QuestionMetadata} from "../../base-question/question-metadata";
import {FloorLevelQuestionComponent} from "./floor-level-question.component";
import {QuestionType} from "../question-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {HomeType} from "../home-type-question/home-type";

export class FloorLevelQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            FloorLevelQuestionComponent,
            'floor_level',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.floorLevels !== undefined;
    }

    isApplicable(responseData: ResponseData): boolean {
        return (responseData.homeType === HomeType.FlatDuplexOrMaisonette && responseData.numberOfStoreys === 1) ||
            responseData.homeType === undefined ||
            responseData.numberOfStoreys === undefined;
    }
}