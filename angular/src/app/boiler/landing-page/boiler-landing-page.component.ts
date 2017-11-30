import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'app-boiler-landing-page',
    templateUrl: './boiler-landing-page.component.html',
    styleUrls: ['./boiler-landing-page.component.scss']
})
export class BoilerLandingPageComponent {

    constructor(private router: Router) {
    }

    onAddressSelected(lmkKey: string) {
        if (lmkKey) {
            this.router.navigate(['/js/boiler/epc-replace', lmkKey]);
        } else {
            this.router.navigate(['/js/boiler/epc-replace/unknown']);
        }
    }
}
