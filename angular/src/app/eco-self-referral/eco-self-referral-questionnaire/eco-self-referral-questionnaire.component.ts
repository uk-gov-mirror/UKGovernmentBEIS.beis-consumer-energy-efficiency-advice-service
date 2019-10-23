import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-eco-self-referral-questionnaire',
    templateUrl: './eco-self-referral-questionnaire.component.html'
})
export class ECOSelfReferralQuestionnaireComponent {

    constructor(private router: Router) {
    }

    onQuestionnaireComplete() {
        this.router.navigate(['/eco-self-referral/done']);
    }
}
