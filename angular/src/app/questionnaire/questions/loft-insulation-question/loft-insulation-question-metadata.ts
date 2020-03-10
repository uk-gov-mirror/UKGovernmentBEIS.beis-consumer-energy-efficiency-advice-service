import {QuestionMetadata} from '../../base-question/question-metadata';
import {LoftInsulationQuestionComponent} from './loft-insulation-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionType} from '../question-type';

export class LoftInsulationQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            LoftInsulationQuestionComponent,
            'loft-insulation',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.hasLoft;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hasLoftInsulation !== undefined;
    }
}
