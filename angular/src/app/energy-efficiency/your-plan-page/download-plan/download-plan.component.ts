import {Component} from '@angular/core';
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import Config from '../../../config';
import {HttpClient} from "@angular/common/http";
import {PlanInfoService} from "../../../shared/plan-info-service/plan-info.service";
import {RecommendationsService} from "../../../shared/recommendations-service/recommendations.service";
import {EnergyEfficiencyRecommendationService} from "../../../shared/recommendations-service/energy-efficiency-recommendation.service";
import {EnergyEfficiencyRecommendation} from "../../../shared/recommendations-service/energy-efficiency-recommendation";

@Component({
    selector: 'app-download-plan',
    templateUrl: './download-plan.component.html',
    styleUrls: ['./download-plan.component.scss']
})
export class DownloadPlanComponent {

    emailIsLoading = false;
    emailIsError = false;
    emailAddress: string = "";

    private readonly emailEndpoint = Config().apiRoot + '/plan/email';

    constructor(private planInfoService: PlanInfoService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private recommendationsService: RecommendationsService,
                private http: HttpClient) {
    }

    get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
    }

    get shareLink(): String {
        const refSavingsParameter =  EnergyEfficiencyRecommendationService.getRoundedMaximumSavings(this.recommendations);
        return Config().publicRootUrl + "?share=" + refSavingsParameter;
    }

    public onEmailPdfClicked() {
        this.sendEventToAnalytics('email-plan_clicked');
        this.emailIsLoading = true;

        const planInfo = this.planInfoService.getUserPlanInfo();

        this.http.post(this.emailEndpoint, {
            planInfo: planInfo,
            emailAddress: this.emailAddress})
            .subscribe(
                () =>  {
                    this.emailIsLoading = false;
                },
                () => {
                    this.emailIsError = true;
                    this.emailIsLoading = false;
                });
    }

    public shareToFacebook() {
        this.sendEventToAnalytics('share-plan-to-facebook_clicked');
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.shareLink}`,
            '_blank', 'width=600, height=400, scrollbars=no');
    }

    public shareToTwitter() {
        this.sendEventToAnalytics('share-plan-to-twitter_clicked');
        const savings = EnergyEfficiencyRecommendationService.getRoundedMaximumSavings(this.recommendations);
        const text = `My energy saving plan from Simple Energy Advice could save me £${savings} per year and benefit the environment!`;
        window.open(`https://twitter.com/intent/tweet?url=${this.shareLink}&text=${text}`,
            '_blank', 'width=600, height=400, scrollbars=no');
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'plan-page');
    }
}
