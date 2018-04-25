import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ResponseData} from '../../shared/response-data/response-data';

@Component({
    selector: 'app-boiler-landing-page',
    templateUrl: './boiler-landing-page.component.html',
    styleUrls: ['./boiler-landing-page.component.scss']
})
export class BoilerLandingPageComponent {

    troubleshootingMobileExpanded = false;
    replacingMobileExpanded = false;
    grantsMobileExpanded = false;
    installerMobileExpanded = false;
    postcode: string;

    constructor(private responseData: ResponseData,
        private router: Router) {
    }

    onPostcodeSelected() {
        this.postcode = this.responseData.postcode;
        if (!this.postcode) {
            // If the postcode lookup has failed for some reason, we should send them onwards without
            // their epc rather than display an error. The unknown page contains an apology for not
            // finding their boiler info
            this.router.navigate(['/boiler/epc-replace/unknown']);
        }
    }

    onEpcSelected(lmkKey: string) {
        if (lmkKey) {
            this.router.navigate(['/boiler/epc-replace', lmkKey]);
        } else {
            this.router.navigate(['/boiler/epc-replace/unknown']);
        }
    }

    scrollTo(event: MouseEvent) {
        event.srcElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
}
