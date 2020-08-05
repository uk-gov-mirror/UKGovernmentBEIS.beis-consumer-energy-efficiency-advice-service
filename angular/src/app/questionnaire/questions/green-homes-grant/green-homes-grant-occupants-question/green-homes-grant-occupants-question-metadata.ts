import {ResponseData} from "../../../../shared/response-data/response-data";
import {OccupantsQuestionMetadata} from "../../occupants-question/occupants-question-metadata";

export class GreenHomesGrantOccupantsQuestionMetadata extends OccupantsQuestionMetadata {
    isApplicable(responseData: ResponseData): boolean {
        return responseData.receiveChildBenefits;
    }
}
