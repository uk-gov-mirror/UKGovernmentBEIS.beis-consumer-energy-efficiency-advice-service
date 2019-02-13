import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';

@Injectable()
export abstract class ResultsPageGuard implements CanActivate {

    constructor(private questionnaireName: string,
                private redirectUrl: string,
                protected questionnaireService: QuestionnaireService,
                protected router: Router) {
    }

    canActivate() {
        if (this.questionnaireService.isComplete(this.questionnaireName)) {
            return true;
        } else {
            console.error("Cannot show results; questions are incomplete");
            this.router.navigate([this.redirectUrl]);
            return false;
        }
    }
}
