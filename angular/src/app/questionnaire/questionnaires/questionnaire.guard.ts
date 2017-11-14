import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from "@angular/router";
import {QuestionnaireService} from "../questionnaire.service";

@Injectable()
export class QuestionnaireGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const questionnaireName = route.paramMap.get('name');
        // Grants questionnaire should not be accessible as a route, it will only ever be loaded into the grants component
        if (questionnaireName !== null &&
            QuestionnaireService.hasQuestionnaireWithName(questionnaireName) &&
            questionnaireName !== 'grants') {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}