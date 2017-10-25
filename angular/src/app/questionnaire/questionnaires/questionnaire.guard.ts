import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import {QuestionnaireService} from "../questionnaire.service";

@Injectable()
export class QuestionnaireGuard implements CanActivate {
    constructor(private questionnaireService: QuestionnaireService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const questionnaireName = route.paramMap.get('name');
        return questionnaireName !== null && this.questionnaireService.hasQuestionnaireWithName(questionnaireName);
    }
}