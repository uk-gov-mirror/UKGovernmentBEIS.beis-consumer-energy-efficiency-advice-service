import {Questionnaire} from '../../base-questionnaire/questionnaire';
import {ResponseData} from '../../../shared/response-data/response-data';
import {GRANT_ELIGIBILITY_QUESTIONS} from '../../questions/question-groups';

export class GrantEligibilityQuestionnaire extends Questionnaire {

    private static currentInstance: GrantEligibilityQuestionnaire;

    public static getInstance(responseData: ResponseData) {
        if (!GrantEligibilityQuestionnaire.currentInstance) {
            GrantEligibilityQuestionnaire.currentInstance = new GrantEligibilityQuestionnaire(responseData, GRANT_ELIGIBILITY_QUESTIONS);
            responseData.shouldIncludeGrantsQuestionnaire = true;
            GrantEligibilityQuestionnaire.resetBenefitQuestionAnswers(responseData);
        }
        return GrantEligibilityQuestionnaire.currentInstance;
    }

    private static resetBenefitQuestionAnswers(responseData: ResponseData): void {
        responseData.receivePensionGuaranteeCredit = undefined;
        responseData.receiveIncomeRelatedBenefits = undefined;
        responseData.receiveSocietalBenefits = undefined;
        responseData.receiveDefenseRelatedBenefits = undefined;
        responseData.receiveChildBenefits = undefined;
        responseData.income = undefined;
    }
}
