import {Questionnaire} from '../../base-questionnaire/questionnaire';
import {ResponseData} from '../../../shared/response-data/response-data';
import {ECO_SELF_REFERRAL_QUESTIONS} from '../../questions/question-groups';

export class ECOSelfReferralQuestionnaire extends Questionnaire {

    private static currentInstance: ECOSelfReferralQuestionnaire;

    public static getInstance(responseData: ResponseData) {
        if (!!ECOSelfReferralQuestionnaire.currentInstance) {
            return ECOSelfReferralQuestionnaire.currentInstance;
        } else {
            ECOSelfReferralQuestionnaire.currentInstance = new ECOSelfReferralQuestionnaire(responseData, ECO_SELF_REFERRAL_QUESTIONS);
            return ECOSelfReferralQuestionnaire.currentInstance;
        }
    }
}
