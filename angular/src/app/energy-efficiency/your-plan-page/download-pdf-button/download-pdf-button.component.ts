import {Component, Input} from '@angular/core';
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import {PlanInfoService} from "../../../shared/plan-info-service/plan-info.service";
import Config from '../../../config';

@Component({
    selector: 'app-download-pdf-button',
    templateUrl: './download-pdf-button.component.html',
    styleUrls: ['./download-pdf-button.component.scss']
})
export class DownloadPdfButtonComponent {

    @Input() forLandlord: boolean;

    private readonly downloadEndpoint = Config().apiRoot + '/plan/download';

    constructor(private planInfoService: PlanInfoService,
                private googleAnalyticsService: GoogleAnalyticsService) {
    }

    public onDownloadPdfClicked() {
        this.sendEventToAnalytics();

        const planInfo = this.forLandlord
            ? this.planInfoService.getLandlordPlanInfo()
            : this.planInfoService.getUserPlanInfo();

        // Submit a hidden form to POST to the PDF endpoint, and download it
        const form = document.createElement("form");
        form.style.display = "none";
        form.setAttribute("action", this.downloadEndpoint);
        form.setAttribute("method", "post");
        form.setAttribute("target", "_blank");

        const planInfoInput = document.createElement("input");
        planInfoInput.setAttribute("type", "hidden");
        planInfoInput.setAttribute("name", "planInfo");
        planInfoInput.setAttribute("value", JSON.stringify(planInfo));
        form.append(planInfoInput);

        const forLandlordInput = document.createElement("input");
        forLandlordInput.setAttribute("type", "hidden");
        forLandlordInput.setAttribute("name", "forLandlord");
        forLandlordInput.setAttribute("value", JSON.stringify(this.forLandlord));
        form.append(forLandlordInput);

        document.body.appendChild(form);

        form.submit();

        form.remove();
    }

    sendEventToAnalytics() {
        const eventName = this.forLandlord
            ? 'download-landlord-plan_clicked'
            : 'download-plan_clicked';

        this.googleAnalyticsService.sendEvent(eventName, 'plan-page');
    }
}
