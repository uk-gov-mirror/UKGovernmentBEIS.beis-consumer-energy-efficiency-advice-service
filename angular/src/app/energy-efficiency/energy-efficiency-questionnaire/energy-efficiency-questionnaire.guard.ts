import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

// TODO:BEIS-201 delete this; guard is inappropriate; "404" is better
@Injectable()
export class EnergyEfficiencyQuestionnaireGuard implements CanActivate {

    private static energyEfficiencyQuestionnaires = ['home-basics', 'behaviour'];

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // const questionnaireName = route.paramMap.get('name');
        // const isAllowedQuestionnaire = (questionnaireName !== null) &&
        //     QuestionnaireService.hasQuestionnaireWithName(questionnaireName) &&
        //     EnergyEfficiencyQuestionnaireGuard.energyEfficiencyQuestionnaires.indexOf(questionnaireName) > -1;
        // if (isAllowedQuestionnaire) {
        //     return true;
        // }
        //
        // this.router.navigate(['/404'], {skipLocationChange: true});
        return true;
    }
}
