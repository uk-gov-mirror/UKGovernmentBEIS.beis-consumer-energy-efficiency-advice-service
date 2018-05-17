import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {PropertyEpcQuestionComponent} from './property-epc-question.component';
import {TenancyType} from '../tenancy-type-question/tenancy-type';
import {AgriculturalTenancyType} from '../agricultural-tenancy-type-question/agricultural-tenancy-type';

export class PropertyEpcQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            PropertyEpcQuestionComponent,
            'property-epc',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.tenancyType === TenancyType.AssuredTenancy
            || responseData.tenancyType === TenancyType.RegulatedTenancy
            || (responseData.tenancyType === TenancyType.DomesticAgriculturalTenancy
                && (responseData.agriculturalTenancyType === AgriculturalTenancyType.AssuredTenancy
                    || responseData.agriculturalTenancyType === AgriculturalTenancyType.ProtectedOccupancy
                    || responseData.agriculturalTenancyType === AgriculturalTenancyType.StatutoryTenancy));
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.propertyEpc !== undefined;
    }
}
