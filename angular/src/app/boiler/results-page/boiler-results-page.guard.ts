import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';

@Injectable()
export class BoilerResultsPageRouteGuard implements CanActivate {

    constructor(private questionnaireService: QuestionnaireService,
                private router: Router) {
    }

    canActivate() {
        if (this.questionnaireService.isComplete('boiler')) {
            return true;
        } else {
            this.router.navigate(['/js/boiler/questionnaire']);
            return false;
        }
    }
}
