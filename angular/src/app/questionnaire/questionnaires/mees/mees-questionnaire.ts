import {Questionnaire} from '../../base-questionnaire/questionnaire';
import {ResponseData} from '../../../shared/response-data/response-data';
import {MEES_QUESTIONS} from '../../questions/question-groups';

export class MeesQuestionnaire extends Questionnaire {

    private static currentInstance: MeesQuestionnaire;

    public static getInstance(responseData: ResponseData) {
        if (!MeesQuestionnaire.currentInstance) {
            MeesQuestionnaire.currentInstance = new MeesQuestionnaire(responseData, MEES_QUESTIONS);
        }
        return MeesQuestionnaire.currentInstance;
    }
}
