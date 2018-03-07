import {Questionnaire} from '../../base-questionnaire/questionnaire';
import {ResponseData} from '../../../shared/response-data/response-data';
import {BOILER_QUESTIONS} from '../../questions/question-groups';

export class BoilerQuestionnaire extends Questionnaire {

    private static currentInstance: BoilerQuestionnaire;

    public static getInstance(responseData: ResponseData) {
        if (!!BoilerQuestionnaire.currentInstance) {
            return BoilerQuestionnaire.currentInstance;
        } else {
            BoilerQuestionnaire.currentInstance = new BoilerQuestionnaire(responseData, BOILER_QUESTIONS);
            return BoilerQuestionnaire.currentInstance;
        }
    }
}
