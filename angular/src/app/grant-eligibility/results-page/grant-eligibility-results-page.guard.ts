import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {ResultsPageGuard} from "../../shared/results-page-guard/results-page.guard";

@Injectable()
export class GrantEligibilityResultsPageGuard extends ResultsPageGuard {
    constructor(protected questionnaireService: QuestionnaireService,
                protected router: Router) {
        super(
            'grant-eligibility',
            '/grant-eligibility/questionnaire',
            questionnaireService,
            router
        );
    }
}