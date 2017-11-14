import {ResponseData} from "../../../shared/response-data/response-data";
import {TenureType} from "../../questions/ownership-status-question/tenure-type";
import {GrantsQuestionnaire} from "./grants-questionnaire";
import {PostcodeEpcQuestionMetadata} from "../../questions/postcode-epc-question/postcode-epc-question-metadata";
import {OccupantsQuestionMetadata} from "../../questions/occupants-question/occupants-question-metadata";
import {TenureTypeQuestionMetadata} from "../../questions/ownership-status-question/tenure-type-question-metadata";

describe('GrantsQuestionnaire', () => {

    let responseData: ResponseData;

    beforeEach(() => {
        responseData = {} as ResponseData;
        GrantsQuestionnaire.clearCachedInstance();
    });

    it('contains the right questions according to response data when loaded the first time', () => {
        // given
        responseData.postcode = undefined;
        responseData.localAuthorityCode = undefined;
        responseData.tenureType = TenureType.PrivateTenancy;
        responseData.numberOfChildren = undefined;
        responseData.numberOfAdults = undefined;
        const expectedQuestions = [
            new PostcodeEpcQuestionMetadata(),
            new OccupantsQuestionMetadata()
        ];

        // when
        const grantsQuestionnaire = GrantsQuestionnaire.getInstance(responseData);

        // then
        expect(grantsQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });

    it('contains the same questions when loaded a second time even if response data has changed', () => {
        // given
        responseData.postcode = 'SW1A1AA';
        responseData.localAuthorityCode = 'E09000033';
        responseData.tenureType = undefined;
        responseData.numberOfChildren = undefined;
        responseData.numberOfAdults = undefined;
        GrantsQuestionnaire.getInstance(responseData);
        const expectedQuestions = [
            new TenureTypeQuestionMetadata(),
            new OccupantsQuestionMetadata()
        ];

        // when
        responseData.tenureType = TenureType.PrivateTenancy;
        responseData.numberOfAdults = 2;
        responseData.numberOfChildren = 3;
        const grantsQuestionnaire = GrantsQuestionnaire.getInstance(responseData);

        // then
        expect(grantsQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });
});