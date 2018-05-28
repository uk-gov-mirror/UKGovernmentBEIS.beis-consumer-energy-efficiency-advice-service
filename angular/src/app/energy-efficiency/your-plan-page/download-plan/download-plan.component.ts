import {Component} from '@angular/core';
import {ResponseData} from '../../../shared/response-data/response-data';
import {TenureType} from '../../../questionnaire/questions/tenure-type-question/tenure-type';
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import Config from '../../../config';
import {RecommendationsService} from "../../../shared/recommendations-service/recommendations.service";

@Component({
    selector: 'app-download-plan',
    templateUrl: './download-plan.component.html',
    styleUrls: ['./download-plan.component.scss']
})
export class DownloadPlanComponent {

    pdfIsLoading: boolean;

    constructor(private googleAnalyticsService: GoogleAnalyticsService,
                private responseData: ResponseData,
                private recommendationsService: RecommendationsService) {
    }

    isTenant(): boolean {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy &&
            !!this.responseData.tenureType;
    }

    public onPdfClicked() {
        this.pdfIsLoading = true;
        window.setTimeout(() => this.onPdfClickedInner(), 0);
    }

    onPdfClickedInner() {
        this.sendEventToAnalytics('download-plan_clicked');

        // See uk.gov.beis.dceas.api.DownloadPlanRequest
        const recommendations = this.recommendationsService.getRecommendationsInPlan()
            .map(r => {
                if (r.isMeasure) {
                    return {
                        measureSlug: r.recommendationID,
                        nationalGrantForMeasureId: (r.grant && r.grant.grantId),
                        investmentPounds: r.investmentPounds,
                        costSavingPoundsPerYear: r.costSavingPoundsPerYear
                    };
                } else {
                    return {
                        grantSlug: r.recommendationID,
                        investmentPounds: r.investmentPounds,
                        costSavingPoundsPerYear: r.costSavingPoundsPerYear
                    };
                }
            });
        const planInfo = {
            recommendations: recommendations,
            potentialScore: this.recommendationsService.potentialScore,
            tenureType: this.responseData.tenureType
        };

        // Submit a hidden form to POST to the PDF endpoint, and download it
        const form = document.createElement("form");
        form.style.display = "none";
        form.setAttribute("action", Config().apiRoot + "/plan/download");
        form.setAttribute("method", "post");
        form.setAttribute("target", "_blank");

        const hiddenEle1 = document.createElement("input");
        hiddenEle1.setAttribute("type", "hidden");
        hiddenEle1.setAttribute("name", "planInfo");
        hiddenEle1.setAttribute("value", JSON.stringify(planInfo));
        form.append(hiddenEle1);

        document.body.appendChild(form);

        form.submit();
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'plan-page');
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
