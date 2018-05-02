import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {AgriculturalTenancyTypeQuestionComponent} from './agricultural-tenancy-type-question.component';
import {TenancyType} from '../tenancy-type-question/tenancy-type';

export class AgriculturalTenancyTypeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            AgriculturalTenancyTypeQuestionComponent,
            'agricultural-tenancy-type',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.tenancyType === TenancyType.DomesticAgriculturalTenancy;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.agriculturalTenancyType !== undefined;
    }
}
