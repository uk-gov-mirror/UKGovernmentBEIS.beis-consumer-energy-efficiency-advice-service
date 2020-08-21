import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {FloorInsulationQuestionComponent} from "./floor-insulation-question.component";

export class FloorInsulationQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            FloorInsulationQuestionComponent,
            'floor_insulation',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.floorInsulation !== undefined;
    }
}
