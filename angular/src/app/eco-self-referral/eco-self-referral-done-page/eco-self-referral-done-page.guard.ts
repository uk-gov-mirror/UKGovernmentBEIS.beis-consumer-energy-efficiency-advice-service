import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {ResultsPageGuard} from "../../shared/results-page-guard/results-page.guard";

@Injectable()
export class ECOSelfReferralDonePageGuard extends ResultsPageGuard {
    constructor(protected questionnaireService: QuestionnaireService,
                protected router: Router) {
        super(
            'eco-self-referral',
            '/pages/energy-company-obligation',
            questionnaireService,
            router
        );
    }
}
