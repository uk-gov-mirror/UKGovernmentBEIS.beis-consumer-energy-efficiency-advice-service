import {Component, Input} from '@angular/core';
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import {PlanInfoService} from "../../../shared/plan-info-service/plan-info.service";

@Component({
    selector: 'app-download-pdf-button',
    templateUrl: './download-pdf-button.component.html',
    styleUrls: ['./download-pdf-button.component.scss']
})
export class DownloadPdfButtonComponent {

    @Input() downloadEndpoint: string;
    @Input() analyticsEventName: string;

    constructor(private planInfoService: PlanInfoService,
                private googleAnalyticsService: GoogleAnalyticsService) {
    }

    public onDownloadPdfClicked() {
        this.sendEventToAnalytics(this.analyticsEventName);

        const planInfo = this.planInfoService.getPlanInfo();

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

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'plan-page');
    }
}
