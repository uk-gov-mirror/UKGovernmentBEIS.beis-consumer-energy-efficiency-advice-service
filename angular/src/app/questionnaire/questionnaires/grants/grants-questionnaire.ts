import {Questionnaire} from "../../base-questionnaire/questionnaire";
import {ResponseData} from "../../../shared/response-data/response-data";
import {QuestionMetadata} from "../../base-question/question-metadata";
import {GRANTS_QUESTIONS} from "../../questions/question-groups";
import {UserJourneyType} from "../../../shared/response-data/user-journey-type";

export class GrantsQuestionnaire extends Questionnaire {

    private static currentJourneyType: UserJourneyType;
    private static currentInstance: GrantsQuestionnaire;

    public static getInstance(responseData: ResponseData) {
        const journeyType = responseData.userJourneyType;
        if (!!GrantsQuestionnaire.currentInstance && journeyType === GrantsQuestionnaire.currentJourneyType) {
            return GrantsQuestionnaire.currentInstance;
        } else {
            GrantsQuestionnaire.currentJourneyType = journeyType;
            GrantsQuestionnaire.currentInstance = new GrantsQuestionnaire(responseData, GrantsQuestionnaire.questionsNotAlreadyAnswered(responseData));
            return GrantsQuestionnaire.currentInstance;
        }
    }

    private static questionsNotAlreadyAnswered(responseData: ResponseData): QuestionMetadata[] {
        return GRANTS_QUESTIONS.filter(question => !question.hasBeenAnswered(responseData));
    }
}