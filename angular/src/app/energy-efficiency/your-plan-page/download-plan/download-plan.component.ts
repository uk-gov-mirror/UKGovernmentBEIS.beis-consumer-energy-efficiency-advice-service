import {Component} from '@angular/core';
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import Config from '../../../config';
import {HttpClient} from "@angular/common/http";
import {PlanInfoService} from "../../../shared/plan-info-service/plan-info.service";

@Component({
    selector: 'app-download-plan',
    templateUrl: './download-plan.component.html',
    styleUrls: ['./download-plan.component.scss']
})
export class DownloadPlanComponent {

    emailIsLoading = false;
    emailIsError = false;
    emailAddress: string = "";

    private readonly downloadEndpoint = Config().apiRoot + '/plan/download-user-plan';
    private readonly emailEndpoint = Config().apiRoot + '/plan/email';

    constructor(private planInfoService: PlanInfoService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private http: HttpClient) {
    }

    public onEmailPdfClicked() {
        this.sendEventToAnalytics('email-plan_clicked');
        this.emailIsLoading = true;

        const planInfo = this.planInfoService.getUserPlanInfo();

        this.http.post(this.emailEndpoint, {
            planInfo: planInfo,
            emailAddress: this.emailAddress})
            .subscribe(
                () => this.emailIsLoading = false,
                () => this.emailIsError = true);
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'plan-page');
    }
}
