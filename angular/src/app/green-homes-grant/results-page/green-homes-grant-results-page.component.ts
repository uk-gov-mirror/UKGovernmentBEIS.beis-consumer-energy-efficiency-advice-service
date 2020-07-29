import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {PageTitleService} from "../../shared/page-title-service/page-title.service";
import {GreenHomesGrantResultsStatus} from "./green-homes-grant-results-status";
import {GreenHomesGrantEligibility} from "../green-homes-grant-service/green-homes-grant-eligibility";
import {GreenHomesGrantService} from "../green-homes-grant-service/green-homes-grant.service";
import {ECOSelfReferralConsentData} from "../../eco-self-referral/eco-self-referral-consent-data";

@Component({
    selector: 'app-green-homes-grant-results-page',
    templateUrl: './green-homes-grant-results-page.component.html',
    styleUrls: ['./green-homes-grant-results-page.component.scss']
})
export class GreenHomesGrantResultsPageComponent implements OnInit {
    status: GreenHomesGrantResultsStatus;
    // Import the enum into the component scope so it can be used in the component html:
    GreenHomesGrantResultsStatus = GreenHomesGrantResultsStatus;
    isLoading: boolean = true;
    isError: boolean = false;
    errorMessage: string;

    constructor(private questionnaireService: QuestionnaireService,
                private greenHomesGrantService: GreenHomesGrantService,
                private router: Router,
                public ecoSelfReferralConsentData: ECOSelfReferralConsentData,
                private pageTitle: PageTitleService) {
    }

    ngOnInit() {
        this.pageTitle.set('Green Homes Grant Eligibility');
        this.ecoSelfReferralConsentData.reset();
        if (!this.questionnaireService.isComplete('green-homes-grant')) {
            this.errorMessage = "Sorry, we can't show you results as it seems that you have " +
                "not completed the questionnaire, or something has gone wrong.";
            this.isError = true;
            return;
        }

        this.greenHomesGrantService.getEligibility()
            .subscribe(
                eligibilityByGrant => this.onLoadingComplete(eligibilityByGrant),
                (err) => {
                    this.errorMessage = "Sorry, we can't show you results as it seems that you have " +
                        "not completed the questionnaire, or something has gone wrong.";
                    this.displayErrorMessage(err);
                }
            );
    }

    proceedToEcoSelfReferral() {
        this.router.navigate(['/eco-self-referral/start']);
    }

    private onLoadingComplete(eligibility: GreenHomesGrantEligibility) {
        this.status = GreenHomesGrantResultsPageComponent.getEligibilityResultsStatus(eligibility);
        this.isLoading = false;
    }

    private displayErrorMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    private static getEligibilityResultsStatus(eligibility: GreenHomesGrantEligibility): GreenHomesGrantResultsStatus {
        return eligibility === GreenHomesGrantEligibility.Ineligible
            ? GreenHomesGrantResultsStatus.Ineligible
            : GreenHomesGrantResultsStatus.Eligible;
    }
}
