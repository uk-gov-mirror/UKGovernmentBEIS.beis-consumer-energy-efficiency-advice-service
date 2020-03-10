import {QuestionMetadata} from '../../base-question/question-metadata';
import {LoftWaterDamageQuestionComponent} from "./loft-water-damage-question.component";
import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionType} from '../question-type';

export class LoftWaterDamageQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            LoftWaterDamageQuestionComponent,
            'loft-water-damage',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.hasLoft;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hasLoftHistoryOfWaterDamage !== undefined;
    }
}
