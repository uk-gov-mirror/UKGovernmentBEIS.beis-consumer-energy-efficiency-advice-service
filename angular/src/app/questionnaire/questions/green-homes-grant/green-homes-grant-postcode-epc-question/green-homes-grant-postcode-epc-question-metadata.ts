import {PostcodeEpcQuestionMetadata} from "../../postcode-epc-question/postcode-epc-question-metadata";
import {ResponseData} from "../../../../shared/response-data/response-data";

export class GreenHomesGrantPostcodeEpcQuestionMetadata extends PostcodeEpcQuestionMetadata {
    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.country !== undefined;
    }
}
