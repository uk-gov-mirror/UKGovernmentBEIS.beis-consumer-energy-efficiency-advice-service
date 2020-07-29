import {Questionnaire} from '../../base-questionnaire/questionnaire';
import {ResponseData} from '../../../shared/response-data/response-data';
import {GREEN_HOMES_GRANT_QUESTIONS} from '../../questions/question-groups';
import {UserJourneyType} from "../../../shared/response-data/user-journey-type";

export class GreenHomesGrantQuestionnaire extends Questionnaire {

    private static currentInstance: GreenHomesGrantQuestionnaire;

    public static getInstance(responseData: ResponseData) {
        if (!GreenHomesGrantQuestionnaire.currentInstance) {
            GreenHomesGrantQuestionnaire.currentInstance = new GreenHomesGrantQuestionnaire(responseData, GREEN_HOMES_GRANT_QUESTIONS);
            responseData.userJourneyType = UserJourneyType.GreenHomesGrant;
            responseData.shouldIncludeGrantsQuestionnaire = true;
            GreenHomesGrantQuestionnaire.resetBenefitQuestionAnswers(responseData);
        }
        return GreenHomesGrantQuestionnaire.currentInstance;
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
