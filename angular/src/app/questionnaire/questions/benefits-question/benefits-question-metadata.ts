import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {BenefitsQuestionComponent} from './benefits-question.component';

export class BenefitsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            BenefitsQuestionComponent,
            'benefits',
            QuestionType.Behaviour
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.shouldIncludeGrantsQuestionnaire !== false;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.benefits !== undefined;
    }
}
