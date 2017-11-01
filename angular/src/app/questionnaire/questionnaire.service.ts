import {Injectable} from "@angular/core";
import {Questionnaire} from "./base-questionnaire/questionnaire";
import {HomeBasicsQuestionnaire} from "./questionnaires/home-basics/home-basics-questionnaire";
import {BehaviourQuestionnaire} from "./questionnaires/behaviour/behaviour-questionnaire";

@Injectable()
export class QuestionnaireService {
    private readonly questionnaires: { [s: string]: Questionnaire };

    constructor(homeBasicsQuestionnaire: HomeBasicsQuestionnaire,
                behaviourQuestionnaire: BehaviourQuestionnaire) {
        this.questionnaires = {
            'home-basics': homeBasicsQuestionnaire,
            'behaviour': behaviourQuestionnaire
        };
    }

    public hasQuestionnaireWithName(name: string): boolean {
        return this.questionnaires.hasOwnProperty(name);
    }

    public getQuestionnaireWithName(name: string): Questionnaire {
        return this.questionnaires[name];
    }

    public isComplete(name: string): boolean {
        return this.questionnaires[name] && this.questionnaires[name].isComplete();
    }
}