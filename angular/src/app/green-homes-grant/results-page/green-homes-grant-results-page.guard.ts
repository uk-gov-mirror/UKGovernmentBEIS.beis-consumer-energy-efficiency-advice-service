import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {ResultsPageGuard} from "../../shared/results-page-guard/results-page.guard";

@Injectable()
export class GreenHomesGrantResultsPageGuard extends ResultsPageGuard {
    constructor(protected questionnaireService: QuestionnaireService,
                protected router: Router) {
        super(
            'green-homes-grant',
            '/green-homes-grant/questionnaire',
            questionnaireService,
            router
        );
    }
}
