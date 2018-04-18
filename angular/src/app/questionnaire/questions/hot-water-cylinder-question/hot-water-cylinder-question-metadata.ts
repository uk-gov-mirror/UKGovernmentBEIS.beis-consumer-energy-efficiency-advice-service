import {QuestionMetadata} from '../../base-question/question-metadata';
import {HotWaterCylinderQuestionComponent} from "./hot-water-cylinder-question.component";
import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionType} from '../question-type';

export class HotWaterCylinderQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            HotWaterCylinderQuestionComponent,
            'hot-water-cylinder',
            QuestionType.Heating
        );
    }

    isApplicable(): boolean {
        return true;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hotWaterCylinder !== undefined;
    }
}
