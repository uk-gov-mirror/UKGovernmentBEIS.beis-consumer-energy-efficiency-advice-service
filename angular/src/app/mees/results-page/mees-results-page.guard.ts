import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';

@Injectable()
export class MeesResultsPageRouteGuard implements CanActivate {

    constructor(private questionnaireService: QuestionnaireService,
                private router: Router) {
    }

    canActivate() {
        if (this.questionnaireService.isComplete('mees')) {
            return true;
        } else {
            this.router.navigate(['/js/minimum-energy-efficiency-standards/questionnaire']);
            return false;
        }
    }
}
