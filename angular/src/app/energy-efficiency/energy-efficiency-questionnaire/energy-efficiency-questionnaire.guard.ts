import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';

@Injectable()
export class EnergyEfficiencyQuestionnaireGuard implements CanActivate {

    private static energyEfficiencyQuestionnaires = ['home-basics', 'behaviour'];

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const questionnaireName = route.paramMap.get('name');
        const isAllowedQuestionnaire = (questionnaireName !== null) &&
            QuestionnaireService.hasQuestionnaireWithName(questionnaireName) &&
            EnergyEfficiencyQuestionnaireGuard.energyEfficiencyQuestionnaires.indexOf(questionnaireName) > -1;
        if (isAllowedQuestionnaire) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
