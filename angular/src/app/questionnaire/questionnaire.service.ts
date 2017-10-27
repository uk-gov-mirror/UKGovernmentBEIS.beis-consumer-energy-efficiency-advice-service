import {Injectable} from "@angular/core";
import {Questionnaire} from "./base-questionnaire/questionnaire";
import {HomeBasicsQuestionnaire} from "./questionnaires/home-basics/home-basics-questionnaire";

@Injectable()
export class QuestionnaireService {
    private readonly questionnaires: { [s: string]: Questionnaire };

    constructor(homeBasicsQuestionnaire: HomeBasicsQuestionnaire) {
        this.questionnaires = {'home-basics': homeBasicsQuestionnaire};
    }

    public hasQuestionnaireWithName(name: string): boolean {
        return this.questionnaires.hasOwnProperty(name);
    }

    public getQuestionnaireWithName(name: string): Questionnaire {
        return this.questionnaires[name];
    }
}