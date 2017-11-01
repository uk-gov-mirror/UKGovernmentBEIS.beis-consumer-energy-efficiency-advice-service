import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {ResponseData} from "../common/response-data/response-data";
import {PostcodeValidationService} from "../common/postcode-validation-service/postcode-validation.service";

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
    postcodeInput: string;
    validationError: boolean = false;

    onPostcodeSubmit() {
        this.postcodeInput = this.postcodeInput.trim();
        if (!(this.validationError = !this.postcodeValidationService.isValid(this.postcodeInput))) {
            this.responseData.postcode = this.postcodeInput;
            this.router.navigate(['/questionnaire/home-basics']);
        }
    }
}
