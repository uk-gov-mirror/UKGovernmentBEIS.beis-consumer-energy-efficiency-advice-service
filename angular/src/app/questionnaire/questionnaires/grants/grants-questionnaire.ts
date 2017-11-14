import {Questionnaire} from "../../base-questionnaire/questionnaire";
import {ResponseData} from "../../../shared/response-data/response-data";
import {QuestionMetadata} from "../../base-question/question-metadata";
import {GRANTS_QUESTIONS} from "../../questions/question-groups";

export class GrantsQuestionnaire extends Questionnaire {

    private static instance: GrantsQuestionnaire;

    public static getInstance(responseData: ResponseData) {
        if (!!GrantsQuestionnaire.instance) {
            return GrantsQuestionnaire.instance;
        } else {
            GrantsQuestionnaire.instance = new GrantsQuestionnaire(responseData, GrantsQuestionnaire.questionsNotAlreadyAnswered(responseData));
            return GrantsQuestionnaire.instance;
        }
    }

    public static clearCachedInstance() {
        this.instance = null;
    }

    private static questionsNotAlreadyAnswered(responseData: ResponseData): QuestionMetadata[] {
        return GRANTS_QUESTIONS.filter(question => !question.hasBeenAnswered(responseData));
    }
}