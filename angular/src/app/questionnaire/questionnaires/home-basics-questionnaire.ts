import {Injectable} from "@angular/core";
import {Questionnaire} from "../base-questionnaire/questionnaire";
import {ResponseData} from "../../shared/response-data/response-data";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";
import {QuestionMetadata} from "../base-question/question-metadata";
import {
    ADDRESS_AND_OWNERSHIP_STATUS, BASIC_BEHAVIOURAL_QUESTIONS,
    CORE_BRE_QUESTIONS
} from "../questions/question-groups";
import concat from 'lodash-es/concat';

@Injectable()
export class HomeBasicsQuestionnaire extends Questionnaire {
    constructor(responseData: ResponseData) {
        super(responseData, HomeBasicsQuestionnaire.questionsForJourneyType(responseData.userJourneyType));
    }

    private static questionsForJourneyType(journeyType: UserJourneyType): QuestionMetadata[] {
        switch (journeyType) {
            case UserJourneyType.Calculator:
            case UserJourneyType.ReduceEnergyBills:
            case UserJourneyType.ReduceCarbonFootprint:
                return concat(ADDRESS_AND_OWNERSHIP_STATUS, CORE_BRE_QUESTIONS, BASIC_BEHAVIOURAL_QUESTIONS);
            case UserJourneyType.MakeHomeWarmer:
            case UserJourneyType.PlanHomeImprovements:
            default:
                return concat(ADDRESS_AND_OWNERSHIP_STATUS, CORE_BRE_QUESTIONS);
        }
    }
}
