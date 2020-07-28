import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {GrantEligibilityService} from "../../grants/grant-eligibility-service/grant-eligibility.service";
import {EcoHhcroHelpToHeat} from "../../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/eco-hhcro-help-to-heat";
import {GrantEligibility} from "../../grants/grant-eligibility-service/grant-eligibility";
import {EligibilityByGrant} from "../../grants/grant-eligibility-service/eligibility-by-grant";
import {ECOSelfReferralConsentData} from "../../eco-self-referral/eco-self-referral-consent-data";
import {PageTitleService} from "../../shared/page-title-service/page-title.service";
import {GreenHomesGrantResultsStatus} from "./green-homes-grant-results-status";

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
                private grantsEligibilityService: GrantEligibilityService,
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
        this.status = GreenHomesGrantResultsPageComponent.getEligibilityResultsStatus(
            ecoHhcroHelpToHeatEligibility.eligibility
        );
        this.isLoading = false;
    }

    private displayErrorMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    private static getEligibilityResultsStatus(ecoHhcroHelpToHeatEligibility: GrantEligibility): GreenHomesGrantResultsStatus {
        return (ecoHhcroHelpToHeatEligibility === GrantEligibility.MayBeEligible
            || ecoHhcroHelpToHeatEligibility === GrantEligibility.LikelyEligible)
            ? GreenHomesGrantResultsStatus.Eligible
            : GreenHomesGrantResultsStatus.Ineligible;
    }
}
