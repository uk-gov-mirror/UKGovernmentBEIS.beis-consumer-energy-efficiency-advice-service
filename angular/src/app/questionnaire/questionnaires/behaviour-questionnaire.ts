import {Questionnaire} from "../base-questionnaire/questionnaire";
import {ResponseData} from "../../shared/response-data/response-data";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";
import {QuestionMetadata} from "../base-question/question-metadata";
import {BASIC_BEHAVIOURAL_QUESTIONS, OTHER_BEHAVIOURAL_QUESTIONS} from "../questions/question-groups";
import concat from 'lodash-es/concat';

export class BehaviourQuestionnaire extends Questionnaire {

    private static currentJourneyType: UserJourneyType;
    private static currentInstance: BehaviourQuestionnaire;

    public static getInstance(responseData: ResponseData) {
        const journeyType = responseData.userJourneyType;
        if (BehaviourQuestionnaire.currentInstance !== undefined && journeyType === BehaviourQuestionnaire.currentJourneyType) {
            return BehaviourQuestionnaire.currentInstance;
        } else {
            BehaviourQuestionnaire.currentJourneyType = journeyType;
            BehaviourQuestionnaire.currentInstance = new BehaviourQuestionnaire(responseData, BehaviourQuestionnaire.questionsForJourneyType(journeyType));
            return BehaviourQuestionnaire.currentInstance;
        }
    }

    private static questionsForJourneyType(journeyType: UserJourneyType): QuestionMetadata[] {
        switch (journeyType) {
            case UserJourneyType.Calculator:
            case UserJourneyType.ReduceEnergyBills:
            case UserJourneyType.ReduceCarbonFootprint:
                return OTHER_BEHAVIOURAL_QUESTIONS;
            case UserJourneyType.MakeHomeWarmer:
            case UserJourneyType.PlanHomeImprovements:
            default:
                return concat(BASIC_BEHAVIOURAL_QUESTIONS, OTHER_BEHAVIOURAL_QUESTIONS);
        }
    }
}
