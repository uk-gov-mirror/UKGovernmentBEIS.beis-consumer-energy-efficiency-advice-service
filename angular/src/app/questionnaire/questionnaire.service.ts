import {Injectable} from '@angular/core';
import {Questionnaire} from './base-questionnaire/questionnaire';
import {ResponseData} from '../shared/response-data/response-data';
import {HomeBasicsQuestionnaire} from './questionnaires/home-basics/home-basics-questionnaire';
import {GrantsQuestionnaire} from './questionnaires/grants/grants-questionnaire';
import {BoilerQuestionnaire} from './questionnaires/boiler/boiler-questionnaire';
import {MeesQuestionnaire} from './questionnaires/mees/mees-questionnaire';
import {GrantEligibilityQuestionnaire} from "./questionnaires/grant-eligibility/grant-eligibility-questionnaire";

type QuestionnaireFactory = (responseData: ResponseData) => Questionnaire;

@Injectable()
export class QuestionnaireService {
    private static readonly QUESTIONNAIRES: {[s: string]: QuestionnaireFactory} = {
        'home-basics': HomeBasicsQuestionnaire.getInstance,
        'grants': GrantsQuestionnaire.getInstance,
        'boiler': BoilerQuestionnaire.getInstance,
        'mees': MeesQuestionnaire.getInstance,
        'grant-eligibility': GrantEligibilityQuestionnaire.getInstance
    };

    constructor(private responseData: ResponseData) {
    }

    public static hasQuestionnaireWithName(name: string): boolean {
        return QuestionnaireService.QUESTIONNAIRES.hasOwnProperty(name);
    }

    public getQuestionnaireWithName(name: string): Questionnaire {
        return QuestionnaireService.hasQuestionnaireWithName(name)
            ? QuestionnaireService.QUESTIONNAIRES[name](this.responseData)
            : null;
    }

    public isComplete(name: string): boolean {
        const questionnaire = this.getQuestionnaireWithName(name);
        return questionnaire && questionnaire.isComplete();
    }
}
