import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ResponseData} from '../../shared/response-data/response-data';
import {ECOSelfReferralApiService} from '../eco-self-referral-api.service';

@Component({
    selector: 'app-eco-self-referral-questionnaire',
    templateUrl: './eco-self-referral-questionnaire.component.html'
})
export class ECOSelfReferralQuestionnaireComponent {

    constructor(private router: Router,
        private responseData: ResponseData,
        private apiService: ECOSelfReferralApiService) {
    }

    onQuestionnaireComplete() {
        this.apiService.submitECOSelfReferral(this.responseData)
            .subscribe(
                () => {
                    this.router.navigate(['/eco-self-referral/done']);
                },
                error => {
                    // TODO: Handle error.
                }
            );
    }
}
