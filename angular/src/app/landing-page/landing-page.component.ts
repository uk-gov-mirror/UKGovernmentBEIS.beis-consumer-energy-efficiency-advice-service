import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

    constructor(private router: Router) {
    }

    @Input() heading: string;
    postcodeInput: string;

    onPostcodeSubmit() {
        const partialResponse = {postcode: this.postcodeInput};
        this.router.navigate(['/questionnaire/home-basics', {partialResponse: JSON.stringify(partialResponse)}]);
    }
}
