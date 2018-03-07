import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {HeatingCostQuestionComponent} from './heating-cost-question.component';

export class HeatingCostQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            HeatingCostQuestionComponent,
            'heating_cost',
            QuestionType.Heating
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.heatingCost !== undefined;
    }
}
