import {Component} from '@angular/core';
import {UserJourneyType} from '../shared/response-data/user-journey-type';
import {ResponseData} from '../shared/response-data/response-data';
import {Router} from '@angular/router';
import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {GoogleAnalyticsService} from "../shared/analytics/google-analytics.service";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

    constructor(private responseData: ResponseData,
                private questionnaireService: QuestionnaireService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private router: Router) {
    }

    onEnergyCalculatorButtonClick() {
        this.sendEventToAnalytics('calculator_clicked');
        this.responseData.userJourneyType = UserJourneyType.Calculator;
        const route = this.questionnaireService.isComplete('home-basics')
            ? '/energy-efficiency/results'
            : '/energy-efficiency/questionnaire/home-basics';
        this.router.navigate([route]);
    }

    onBoilerButtonClick() {
        this.sendEventToAnalytics('boilers_clicked');
        this.responseData.userJourneyType = UserJourneyType.Boiler;
        this.router.navigate(['/boiler']);
    }

    onGrantsButtonClick() {
        this.sendEventToAnalytics('grants_clicked');
        this.responseData.userJourneyType = UserJourneyType.Grants;
        this.router.navigate(['/grants']);
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'home-page');
    }
}
