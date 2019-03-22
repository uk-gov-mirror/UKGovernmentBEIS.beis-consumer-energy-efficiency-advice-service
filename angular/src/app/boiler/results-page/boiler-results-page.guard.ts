import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {ResultsPageGuard} from "../../shared/results-page-guard/results-page.guard";

@Injectable()
export class BoilerResultsPageRouteGuard extends ResultsPageGuard {
    constructor(questionnaireService: QuestionnaireService,
                router: Router) {
        super(
            'boiler',
            '/boiler/questionnaire',
            questionnaireService,
            router
        );
    }
}
