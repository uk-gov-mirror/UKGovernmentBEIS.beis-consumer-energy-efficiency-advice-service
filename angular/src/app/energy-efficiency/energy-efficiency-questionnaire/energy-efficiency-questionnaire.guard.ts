import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
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

        // TODO:BEISDEAS-201 display a user-visible error here
        console.error("Cannot show questionnaire; unrecognised")

        this.router.navigate(['/']);
        return false;
    }
}
