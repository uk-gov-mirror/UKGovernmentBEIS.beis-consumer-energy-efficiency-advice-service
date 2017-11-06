import {Component} from "@angular/core";
import {UserJourneyType} from "../shared/response-data/user-journey-type";
import {ResponseData} from "../shared/response-data/response-data";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    constructor(private responseData: ResponseData,
                private router: Router) {
    }

    onEnergyCalculatorButtonClick() {
        this.responseData.userJourneyType = UserJourneyType.HomepageLink;
        this.router.navigate(['/questionnaire/home-basics']);
    }
}