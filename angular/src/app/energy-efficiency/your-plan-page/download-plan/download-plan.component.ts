import {Component} from '@angular/core';
import {ResponseData} from '../../../shared/response-data/response-data';
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import Config from '../../../config';
import {RecommendationsService} from "../../../shared/recommendations-service/recommendations.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-download-plan',
    templateUrl: './download-plan.component.html',
    styleUrls: ['./download-plan.component.scss']
})
export class DownloadPlanComponent {

    emailIsLoading = false;
    emailIsError = false;
    emailAddress: string = "";

    private readonly downloadEndpoint = Config().apiRoot + '/plan/download';
    private readonly emailEndpoint = Config().apiRoot + '/plan/email';

    constructor(private googleAnalyticsService: GoogleAnalyticsService,
                private responseData: ResponseData,
                private http: HttpClient,
                private recommendationsService: RecommendationsService) {
    }

    public onDownloadPdfClicked() {
        this.sendEventToAnalytics('download-plan_clicked');

        const planInfo = this.getPlanInfo();

        // Submit a hidden form to POST to the PDF endpoint, and download it
        const form = document.createElement("form");
        form.style.display = "none";
        form.setAttribute("action", this.downloadEndpoint);
        form.setAttribute("method", "post");
        form.setAttribute("target", "_blank");

        const hiddenEle1 = document.createElement("input");
        hiddenEle1.setAttribute("type", "hidden");
        hiddenEle1.setAttribute("name", "planInfo");
        hiddenEle1.setAttribute("value", JSON.stringify(planInfo));
        form.append(hiddenEle1);

        document.body.appendChild(form);

        form.submit();

        form.remove();
    }

    public onEmailPdfClicked() {
        this.sendEventToAnalytics('email-plan_clicked');
        this.emailIsLoading = true;

        const planInfo = this.getPlanInfo();

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

    private getPlanInfo() {
        // See uk.gov.beis.dceas.controller.EnergySavingPlanController.PlanInfo
        const recommendations = this.recommendationsService.getRecommendationsInPlan()
            .map(r => {
                if (r.isMeasure) {
                    return {
                        measureSlug: r.recommendationID,
                        nationalGrantForMeasureId: (r.grant && r.grant.grantId),
                        investmentPounds: r.investmentPounds,
                        minimumCostSavingPoundsPerYear: r.minimumCostSavingPoundsPerYear,
                        maximumCostSavingPoundsPerYear: r.maximumCostSavingPoundsPerYear
                    };
                } else {
                    return {
                        grantSlug: r.recommendationID,
                        investmentPounds: r.investmentPounds,
                        minimumCostSavingPoundsPerYear: r.minimumCostSavingPoundsPerYear,
                        maximumCostSavingPoundsPerYear: r.maximumCostSavingPoundsPerYear
                    };
                }
            });
        return {
            recommendations: recommendations,
            tenureType: this.responseData.tenureType
        };
    }

    private instantiateObserver(callback) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => callback(observer));
        });

        return observer;
    }

    private filterNonUnique(array1, array2, targetArray) {
        for (let i = 0; i < array1.length; i++) {
            let found = false;

            for (let j = 0; j < array2.length; j++) {
                if (array1[i] === array2[j]) {
                    found = true;
                    break;
                }
            }
            if (found === false) {
                targetArray.push(array1[i]);
            }
        }
    }
}
