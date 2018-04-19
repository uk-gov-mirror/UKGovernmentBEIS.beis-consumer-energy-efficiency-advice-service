import {PostcodeEpcQuestionMetadata} from '../../postcode-epc-question/postcode-epc-question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {UserEpcRating} from '../property-epc-question/user-epc-rating';

export class MeesPostcodeEpcQuestionMetadata extends PostcodeEpcQuestionMetadata {
    isApplicable(responseData: ResponseData): boolean {
        return responseData.propertyEpc === UserEpcRating.DontKnow;
    }
}
