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
            // TODO:BEISDEAS-201 display a user-visible error here
            console.error('Cannot show results; questions are incomplete');
            this.router.navigate(['/minimum-energy-efficiency-standards/questionnaire']);
            return false;
        }
    }
}
