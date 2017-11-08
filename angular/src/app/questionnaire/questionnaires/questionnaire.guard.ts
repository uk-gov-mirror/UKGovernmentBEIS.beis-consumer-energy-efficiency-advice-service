import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {QuestionnaireService} from "../questionnaire.service";

@Injectable()
export class QuestionnaireGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const questionnaireName = route.paramMap.get('name');
        return questionnaireName !== null && QuestionnaireService.hasQuestionnaireWithName(questionnaireName);
    }
}