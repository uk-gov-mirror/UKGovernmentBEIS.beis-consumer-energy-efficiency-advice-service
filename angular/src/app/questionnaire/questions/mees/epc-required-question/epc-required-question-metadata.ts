import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {EpcRequiredQuestionComponent} from './epc-required-question.component';
import {UserEpcRating} from '../property-epc-question/user-epc-rating';

export class EpcRequiredQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            EpcRequiredQuestionComponent,
            'epc-required',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.propertyEpc === UserEpcRating.NoRating || responseData.confirmEpcNotFound;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.isEpcRequired != null;
    }
}
