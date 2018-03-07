import {Questionnaire} from '../../base-questionnaire/questionnaire';
import {UserJourneyType} from '../../../shared/response-data/user-journey-type';
import {QuestionMetadata} from '../../base-question/question-metadata';
import {
    EPC_AND_OWNERSHIP_STATUS, BASIC_BEHAVIOURAL_QUESTIONS,
    CORE_BRE_QUESTIONS, GRANTS_QUESTIONNAIRE_QUESTION, ADDRESS
} from '../../questions/question-groups';
import concat from 'lodash-es/concat';
import {ResponseData} from '../../../shared/response-data/response-data';

export class HomeBasicsQuestionnaire extends Questionnaire {

    private static currentJourneyType: UserJourneyType;
    private static currentInstance: HomeBasicsQuestionnaire;

    public static getInstance(responseData: ResponseData) {
        const journeyType = responseData.userJourneyType;
        if (HomeBasicsQuestionnaire.currentInstance !== undefined && journeyType === HomeBasicsQuestionnaire.currentJourneyType) {
            return HomeBasicsQuestionnaire.currentInstance;
        } else {
            HomeBasicsQuestionnaire.currentJourneyType = journeyType;
            HomeBasicsQuestionnaire.currentInstance =
                new HomeBasicsQuestionnaire(responseData, HomeBasicsQuestionnaire.questionsForJourneyType(journeyType));
            return HomeBasicsQuestionnaire.currentInstance;
        }
    }

    private static questionsForJourneyType(journeyType: UserJourneyType): QuestionMetadata[] {
        switch (journeyType) {
            case UserJourneyType.Calculator:
                return concat(
                    ADDRESS,
                    EPC_AND_OWNERSHIP_STATUS,
                    CORE_BRE_QUESTIONS,
                    BASIC_BEHAVIOURAL_QUESTIONS,
                    GRANTS_QUESTIONNAIRE_QUESTION
                );
            case UserJourneyType.ReduceEnergyBills:
            case UserJourneyType.MakeHomeGreener:
                return concat(
                    EPC_AND_OWNERSHIP_STATUS,
                    CORE_BRE_QUESTIONS,
                    BASIC_BEHAVIOURAL_QUESTIONS,
                    GRANTS_QUESTIONNAIRE_QUESTION
                );
            case UserJourneyType.MakeHomeWarmer:
            case UserJourneyType.PlanHomeImprovements:
                return concat(
                    EPC_AND_OWNERSHIP_STATUS,
                    CORE_BRE_QUESTIONS,
                    GRANTS_QUESTIONNAIRE_QUESTION
                );
            default:
                return concat(
                    ADDRESS,
                    EPC_AND_OWNERSHIP_STATUS,
                    CORE_BRE_QUESTIONS,
                    GRANTS_QUESTIONNAIRE_QUESTION
                );
        }
    }
}
