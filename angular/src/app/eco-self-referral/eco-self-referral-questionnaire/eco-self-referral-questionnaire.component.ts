import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ResponseData} from '../../shared/response-data/response-data';
import {ECOSelfReferralApiService} from '../eco-self-referral-api.service';

@Component({
    selector: 'app-eco-self-referral-questionnaire',
    templateUrl: './eco-self-referral-questionnaire.component.html'
})
export class ECOSelfReferralQuestionnaireComponent {

    errorMessage: string = null;

    constructor(private router: Router,
        private responseData: ResponseData,
        private apiService: ECOSelfReferralApiService) {
    }

    get isError(): boolean {
        return !!this.errorMessage;
    }

    onQuestionnaireComplete() {
        this.errorMessage = null;
        this.apiService.submitECOSelfReferral(this.responseData)
            .subscribe(
                () => {
                    this.router.navigate(['/eco-self-referral/done']);
                },
                error => {
                    console.error(error);
                    this.errorMessage = 'We were not able to process your ECO referral due to an unexpected error. Please try again later.';
                }
            );
    }
}
