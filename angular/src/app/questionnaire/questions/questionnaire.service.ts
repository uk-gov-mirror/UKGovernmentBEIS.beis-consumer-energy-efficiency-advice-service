import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {Questionnaire} from "../base-questionnaire/questionnaire";
import {HomeBasicsQuestionnaire} from "../questionnaires/home-basics-questionnaire";

@Injectable()
export class QuestionnaireService {
    private readonly questionnaires: Questionnaire[];

    constructor(homeBasicsQuestionnaire: HomeBasicsQuestionnaire) {
        this.questionnaires = [homeBasicsQuestionnaire];
    }

    public getQuestionnaireWithId(id: string): Observable<Questionnaire> {
        const questionnaire = this.questionnaires.find(questionnaire => questionnaire.id === id);
        return questionnaire === undefined
            ? Observable.throw(`No questionnaire with id ${id}`)
            : Observable.of(questionnaire);
    }
}