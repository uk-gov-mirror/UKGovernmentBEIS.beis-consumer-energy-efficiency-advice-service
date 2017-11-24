import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {ResponseData} from "../../shared/response-data/response-data";

@Component({
    selector: 'app-boiler-landing-page',
    templateUrl: './boiler-landing-page.component.html',
    styleUrls: ['./boiler-landing-page.component.scss']
})
export class BoilerLandingPageComponent {

    constructor(private responseData: ResponseData,
                private router: Router) {
    }

    onAddressSelected() {
        if (this.responseData.epc.lmkKey) {
            this.router.navigate(['/js/boiler/epc-replace', this.responseData.epc.lmkKey]);
        }
    }
}
