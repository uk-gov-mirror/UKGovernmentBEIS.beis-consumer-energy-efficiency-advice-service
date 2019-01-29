import {Component, OnInit} from '@angular/core';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {GrantEligibilityService} from "../../grants/grant-eligibility-service/grant-eligibility.service";
import {EcoHhcroHelpToHeat} from "../../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/eco-hhcro-help-to-heat";
import {GrantEligibility} from "../../grants/grant-eligibility-service/grant-eligibility";

enum GrantEligibilityResultsStatus {
    Eligible,
    Ineligible
}

@Component({
    selector: 'app-grant-eligibility-results-page',
    templateUrl: './grant-eligibility-results-page.component.html',
    styleUrls: ['./grant-eligibility-results-page.component.scss']
})
export class GrantEligibilityResultsPageComponent implements OnInit {
    status: GrantEligibilityResultsStatus;
    // Import the above enum into the component scope so it can be used in the component html:
    GrantEligibilityResultsStatus = GrantEligibilityResultsStatus;
    isError: boolean = false;
    errorMessage: string;

    constructor(private questionnaireService: QuestionnaireService,
                private grantsEligibilityService: GrantEligibilityService) {
    }

    ngOnInit() {
        if (!this.questionnaireService.isComplete('grant-eligibility')) {
            this.errorMessage = "Sorry, we can't show you results as it seems that you have " +
                "not completed the questionnaire, or something has gone wrong.";
            this.isError = true;
            return;
        }

        this.grantsEligibilityService.eligibilityByGrant
            .subscribe(eligibilityByGrant => {
                const ecoHhcroHelpToHeatEligibility = eligibilityByGrant[EcoHhcroHelpToHeat.GRANT_ID];
                this.status = GrantEligibilityResultsPageComponent.getEligibilityResultsStatus(
                    ecoHhcroHelpToHeatEligibility.eligibility
                );
            });
    }

    private static getEligibilityResultsStatus(ecoHhcroHelpToHeatEligibility: GrantEligibility): GrantEligibilityResultsStatus {
        return (ecoHhcroHelpToHeatEligibility === GrantEligibility.MayBeEligible
            || ecoHhcroHelpToHeatEligibility === GrantEligibility.LikelyEligible)
            ? GrantEligibilityResultsStatus.Eligible
            : GrantEligibilityResultsStatus.Ineligible;
    }
}
