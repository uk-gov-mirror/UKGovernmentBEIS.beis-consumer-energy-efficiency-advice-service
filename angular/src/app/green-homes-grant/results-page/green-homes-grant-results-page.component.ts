import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {PageTitleService} from "../../shared/page-title-service/page-title.service";
import {GreenHomesGrantEligibility} from "../green-homes-grant-service/green-homes-grant-eligibility";
import {GreenHomesGrantService} from "../green-homes-grant-service/green-homes-grant.service";

@Component({
    selector: 'app-green-homes-grant-results-page',
    templateUrl: './green-homes-grant-results-page.component.html',
    styleUrls: ['./green-homes-grant-results-page.component.scss']
})
export class GreenHomesGrantResultsPageComponent implements OnInit {
    status: GreenHomesGrantEligibility;
    // Import the enum into the component scope so it can be used in the component html:
    GreenHomesGrantEligibility = GreenHomesGrantEligibility;
    isLoading: boolean = true;
    isError: boolean = false;
    errorMessage: string;

    constructor(private questionnaireService: QuestionnaireService,
                private greenHomesGrantService: GreenHomesGrantService,
                private router: Router,
                private pageTitle: PageTitleService) {
    }

    ngOnInit() {
        this.pageTitle.set('Green Homes Grant Eligibility');
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

    private onLoadingComplete(eligibility: GreenHomesGrantEligibility) {
        this.status = eligibility;
        this.isLoading = false;
    }

    private displayErrorMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }
}
