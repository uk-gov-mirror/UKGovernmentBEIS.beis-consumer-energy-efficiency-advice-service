import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {GrantEligibilityService} from "../../grants/grant-eligibility-service/grant-eligibility.service";
import {EcoHhcroHelpToHeat} from "../../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/eco-hhcro-help-to-heat";
import {GrantEligibility} from "../../grants/grant-eligibility-service/grant-eligibility";
import {EligibilityByGrant} from "../../grants/grant-eligibility-service/eligibility-by-grant";
import {GrantEligibilityResultsStatus} from "./grant-eligibility-results-status";
import {ResponseData} from "../../shared/response-data/response-data";
import {ECOSelfReferralConsentData} from "../../eco-self-referral/eco-self-referral-consent-data";

@Component({
    selector: 'app-grant-eligibility-results-page',
    templateUrl: './grant-eligibility-results-page.component.html',
    styleUrls: ['./grant-eligibility-results-page.component.scss']
})
export class GrantEligibilityResultsPageComponent implements OnInit {
    status: GrantEligibilityResultsStatus;
    // Import the enum into the component scope so it can be used in the component html:
    GrantEligibilityResultsStatus = GrantEligibilityResultsStatus;
    isLoading: boolean = true;
    isError: boolean = false;
    errorMessage: string;

    constructor(private questionnaireService: QuestionnaireService,
                private grantsEligibilityService: GrantEligibilityService,
                private router: Router,
                public ecoSelfReferralConsentData: ECOSelfReferralConsentData,
                @Inject(ResponseData) protected responseData: ResponseData) {
    }

    ngOnInit() {
        this.ecoSelfReferralConsentData.reset();

        if (!this.questionnaireService.isComplete('grant-eligibility')) {
            this.errorMessage = "Sorry, we can't show you results as it seems that you have " +
                "not completed the questionnaire, or something has gone wrong.";
            this.isError = true;
            return;
        }

        this.grantsEligibilityService.getEligibilityByGrant()
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

    private onLoadingComplete(eligibilityByGrant: EligibilityByGrant) {
        const ecoHhcroHelpToHeatEligibility = eligibilityByGrant[EcoHhcroHelpToHeat.GRANT_ID];
        this.status = GrantEligibilityResultsPageComponent.getEligibilityResultsStatus(
            ecoHhcroHelpToHeatEligibility.eligibility
        );
        this.isLoading = false;
    }

    private displayErrorMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    private static getEligibilityResultsStatus(ecoHhcroHelpToHeatEligibility: GrantEligibility): GrantEligibilityResultsStatus {
        return (ecoHhcroHelpToHeatEligibility === GrantEligibility.MayBeEligible
            || ecoHhcroHelpToHeatEligibility === GrantEligibility.LikelyEligible)
            ? GrantEligibilityResultsStatus.Eligible
            : GrantEligibilityResultsStatus.Ineligible;
    }
}
