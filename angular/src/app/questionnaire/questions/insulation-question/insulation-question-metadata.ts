import {QuestionMetadata} from "../../base-question/question-metadata";
import {QuestionType} from "../question-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {InsulationQuestionComponent} from "./insulation-question.component";

export class InsulationQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            InsulationQuestionComponent,
            'insulation',
            QuestionType.House,
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.wallInsulationType !== undefined &&
               responseData.roofInsulationType !== undefined &&
               responseData.floorInsulationType !== undefined &&
               responseData.glazingType !== undefined;
    }
}