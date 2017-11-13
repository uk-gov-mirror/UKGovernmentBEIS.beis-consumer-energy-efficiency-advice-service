import {Component} from "@angular/core";
import {UserJourneyType} from "../shared/response-data/user-journey-type";
import {ResponseData} from "../shared/response-data/response-data";
import {Router} from "@angular/router";
import {QuestionnaireService} from "../questionnaire/questionnaire.service";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    constructor(private responseData: ResponseData,
                private questionnaireService: QuestionnaireService,
                private router: Router) {
    }

    onEnergyCalculatorButtonClick() {
        this.responseData.userJourneyType = UserJourneyType.Calculator;
        const route = this.questionnaireService.isComplete('home-basics') ? '/js/results' : '/js/questionnaire/home-basics';
        this.router.navigate([route]);
    }

    onBoilerButtonClick() {
        this.responseData.userJourneyType = UserJourneyType.Boiler;
        this.router.navigate(['/js/boiler']);
    }
}