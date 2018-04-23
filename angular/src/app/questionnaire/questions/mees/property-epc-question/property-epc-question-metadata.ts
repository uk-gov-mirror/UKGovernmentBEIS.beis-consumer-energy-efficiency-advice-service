import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {PropertyEpcQuestionComponent} from './property-epc-question.component';
import {TenancyType} from '../tenancy-type-question/tenancy-type';

export class PropertyEpcQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            PropertyEpcQuestionComponent,
            'property-epc',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.tenancyType !== undefined && responseData.tenancyType !== TenancyType.Other;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.propertyEpc !== undefined;
    }
}
