import {Injectable} from "@angular/core";
import {Questionnaire} from "./base-questionnaire/questionnaire";
import {HomeBasicsQuestionnaire} from "./questionnaires/home-basics/home-basics-questionnaire";
import {QuestionnaireType} from "./questionnaires/questionnaire-type";

@Injectable()
export class QuestionnaireService {
    private readonly questionnaires: {[K in QuestionnaireType]: Questionnaire};

    constructor(homeBasicsQuestionnaire: HomeBasicsQuestionnaire) {
        this.questionnaires = {'home-basics': homeBasicsQuestionnaire};
    }

    public getQuestionnaireOfType(type: QuestionnaireType): Questionnaire {
        return this.questionnaires[type];
    }
}