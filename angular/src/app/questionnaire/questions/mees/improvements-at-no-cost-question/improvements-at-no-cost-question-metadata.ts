import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {ImprovementsAtNoCostQuestionComponent} from './improvements-at-no-cost-question.component';

export class ImprovementsAtNoCostQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            ImprovementsAtNoCostQuestionComponent,
            'improvements-at-no-cost',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.hasRecommendedImprovements;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hasImprovementsAtNoCost !== undefined;
    }
}
