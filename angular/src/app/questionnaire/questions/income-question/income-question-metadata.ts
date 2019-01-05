import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {IncomeQuestionComponent} from './income-question.component';

export class IncomeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            IncomeQuestionComponent,
            'income',
            QuestionType.Behaviour
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.shouldIncludeGrantsQuestionnaire !== false
            && responseData.receiveChildBenefits;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.income !== undefined;
    }
}
