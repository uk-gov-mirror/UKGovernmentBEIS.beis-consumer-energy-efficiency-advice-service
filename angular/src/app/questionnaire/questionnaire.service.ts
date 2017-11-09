import {Injectable} from "@angular/core";
import {Questionnaire} from "./base-questionnaire/questionnaire";
import {ResponseData} from "../shared/response-data/response-data";
import {HomeBasicsQuestionnaire} from "./questionnaires/home-basics-questionnaire";
import {BehaviourQuestionnaire} from "./questionnaires/behaviour-questionnaire";

type QuestionnaireClass = {
    new(responseData: ResponseData): Questionnaire
};

@Injectable()
export class QuestionnaireService {
    private static readonly QUESTIONNAIRES: {[s: string]: QuestionnaireClass} = {
        'home-basics': HomeBasicsQuestionnaire,
        'behaviour': BehaviourQuestionnaire
    };

    constructor(private responseData: ResponseData) {
    }

    public static hasQuestionnaireWithName(name: string): boolean {
        return QuestionnaireService.QUESTIONNAIRES.hasOwnProperty(name);
    }

    public getQuestionnaireWithName(name: string): Questionnaire {
        return QuestionnaireService.hasQuestionnaireWithName(name)
            ? new QuestionnaireService.QUESTIONNAIRES[name](this.responseData)
            : null;
    }

    public isComplete(name: string): boolean {
        const questionnaire = this.getQuestionnaireWithName(name);
        return questionnaire && questionnaire.isComplete();
    }
}