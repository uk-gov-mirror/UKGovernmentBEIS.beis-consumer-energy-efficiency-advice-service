import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-grant-eligibility-questionnaire',
    templateUrl: './grant-eligibility-questionnaire.component.html',
    styleUrls: ['./grant-eligibility-questionnaire.component.scss']
})
export class GrantEligibilityQuestionnaireComponent {

    constructor(private router: Router) {
    }

    onQuestionnaireComplete() {
        this.router.navigate(['/grant-eligibility/results']);
    }
}
