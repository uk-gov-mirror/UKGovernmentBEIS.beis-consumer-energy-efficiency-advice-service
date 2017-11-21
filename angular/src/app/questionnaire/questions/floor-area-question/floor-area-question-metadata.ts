import {ResponseData} from "../../../shared/response-data/response-data";
import {QuestionMetadata} from "../../base-question/question-metadata";
import {QuestionType} from "../question-type";
import {FloorAreaQuestionComponent} from "./floor-area-question.component";

export class FloorAreaQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            FloorAreaQuestionComponent,
            'floor_area',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.shouldIncludeOptionalPropertyQuestions === undefined || responseData.shouldIncludeOptionalPropertyQuestions;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.floorArea !== undefined;
    }
}
