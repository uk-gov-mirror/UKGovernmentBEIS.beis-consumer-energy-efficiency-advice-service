import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {PostcodeDetails} from "../../shared/postcode-epc-service/model/postcode-details";

@Component({
    selector: 'app-eco-self-referral-start-page',
    templateUrl: './eco-self-referral-start-page.component.html',
    styleUrls: ['./eco-self-referral-start-page.component.scss']
})
export class ECOSelfReferralStartPageComponent {

    postcode: string;

    constructor(private router: Router) {
    }

    onPostcodeSelected(postcodeDetails: PostcodeDetails) {
        this.postcode = postcodeDetails.postcode;
    }

    onEpcSelected() {
        this.router.navigate(['/eco-self-referral/questionnaire']);
    }
}
