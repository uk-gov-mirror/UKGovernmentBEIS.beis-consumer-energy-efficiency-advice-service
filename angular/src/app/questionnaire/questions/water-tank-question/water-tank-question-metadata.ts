import {QuestionMetadata} from "../../base-question/question-metadata";
import {QuestionType} from "../question-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {WaterTankQuestionComponent} from "./water-tank-question.component";

export class WaterTankQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            WaterTankQuestionComponent,
            'space-for-water-tank',
            QuestionType.House,
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.waterTankSpace !== undefined;
    }
}