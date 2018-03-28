import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {TenancyTypeQuestionComponent} from './tenancy-type-question.component';

export class TenancyTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            TenancyTypeQuestionComponent,
            'tenancy-type',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return true; // TODO
        // return responseData.homeType == null ||
        //     (!isDetached(responseData.homeType) && responseData.homeType !== HomeType.FlatDuplexOrMaisonette);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.relevantTenancy != null;
    }
}
