import {QuestionMetadata} from '../../base-question/question-metadata';
import {LoftInfestationQuestionComponent} from './loft-infestation-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionType} from '../question-type';

export class LoftInfestationQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            LoftInfestationQuestionComponent,
            'loft-infestation',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.hasLoft;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hasLoftHistoryOfInfestation !== undefined;
    }
}
