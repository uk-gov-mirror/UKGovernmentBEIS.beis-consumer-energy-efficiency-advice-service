import {Injectable} from "@angular/core";
import {Questionnaire} from "../base-questionnaire/questionnaire";
import {ResponseData} from "../../shared/response-data/response-data";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";
import {QuestionMetadata} from "../base-question/question-metadata";
import {BASIC_BEHAVIOURAL_QUESTIONS, OTHER_BEHAVIOURAL_QUESTIONS} from "../questions/question-groups";
import concat from 'lodash-es/concat';

@Injectable()
export class BehaviourQuestionnaire extends Questionnaire {
    constructor(responseData: ResponseData) {
        super(responseData, BehaviourQuestionnaire.questionsForJourneyType(responseData.userJourneyType));
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
