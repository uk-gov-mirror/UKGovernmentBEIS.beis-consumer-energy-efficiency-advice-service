import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {ResponseData} from "../shared/response-data/response-data";
import {PostcodeValidationService} from "../shared/postcode-validation-service/postcode-validation.service";
import {UserJourneyType} from "../shared/response-data/user-journey-type";

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

    constructor(private router: Router,
                private postcodeValidationService: PostcodeValidationService,
                private responseData: ResponseData) {
    }

    @Input() heading: string;
    @Input() userJourneyType: UserJourneyType;
    postcodeInput: string;
    validationError: boolean = false;

    onPostcodeSubmit() {
        this.postcodeInput = this.postcodeInput.trim();
        if (!(this.validationError = !this.postcodeValidationService.isValid(this.postcodeInput))) {
            this.responseData.postcode = this.postcodeInput;
            this.responseData.userJourneyType = this.userJourneyType;
            this.router.navigate(['/js/energy-efficiency/questionnaire/home-basics']);
        }
    }
}
