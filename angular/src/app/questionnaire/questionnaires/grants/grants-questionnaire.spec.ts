import {ResponseData} from "../../../shared/response-data/response-data";
import {TenureType} from "../../questions/tenure-type-question/tenure-type";
import {GrantsQuestionnaire} from "./grants-questionnaire";
import {PostcodeEpcQuestionMetadata} from "../../questions/postcode-epc-question/postcode-epc-question-metadata";
import {OccupantsQuestionMetadata} from "../../questions/occupants-question/occupants-question-metadata";
import {TenureTypeQuestionMetadata} from "../../questions/tenure-type-question/tenure-type-question-metadata";
import {UserJourneyType} from "../../../shared/response-data/user-journey-type";
import {BenefitsQuestionMetadata} from "../../questions/benefits-question/benefits-question-metadata";
import {IncomeQuestionMetadata} from "../../questions/income-question/income-question-metadata";

describe('GrantsQuestionnaire', () => {

    let responseData: ResponseData;

    beforeEach(() => {
        responseData = {} as ResponseData;
    });

    it('contains the right questions according to response data when loaded the first time on a given journey', () => {
        // given
        responseData.postcode = undefined;
        responseData.localAuthorityCode = undefined;
        responseData.epc = null;
        responseData.tenureType = TenureType.PrivateTenancy;
        responseData.numberOfChildren = undefined;
        responseData.numberOfAdultsAgedUnder64 = undefined;
        const expectedQuestions = [
            new PostcodeEpcQuestionMetadata(),
            new BenefitsQuestionMetadata(),
            new OccupantsQuestionMetadata(),
            new IncomeQuestionMetadata()
        ];

        // when
        const grantsQuestionnaire = GrantsQuestionnaire.getInstance(responseData);

        // then
        expect(grantsQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });

    it('contains the same questions when loaded a second time on same journey even if response data has changed', () => {
        // given
        responseData.postcode = 'SW1A1AA';
        responseData.localAuthorityCode = 'E09000033';
        responseData.epc = null;
        responseData.tenureType = undefined;
        responseData.numberOfChildren = undefined;
        responseData.numberOfAdultsAgedUnder64 = undefined;
        responseData.userJourneyType = UserJourneyType.MakeHomeGreener;
        GrantsQuestionnaire.getInstance(responseData);
        const expectedQuestions = [
            new TenureTypeQuestionMetadata(),
            new BenefitsQuestionMetadata(),
            new OccupantsQuestionMetadata(),
            new IncomeQuestionMetadata()
        ];

        // when
        responseData.tenureType = TenureType.PrivateTenancy;
        responseData.numberOfAdultsAgedUnder64 = 2;
        responseData.numberOfChildren = 3;
        const grantsQuestionnaire = GrantsQuestionnaire.getInstance(responseData);

        // then
        expect(grantsQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });
});