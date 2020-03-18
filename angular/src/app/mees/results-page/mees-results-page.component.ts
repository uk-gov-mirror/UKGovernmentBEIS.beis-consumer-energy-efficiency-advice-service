import {Component, OnInit} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {TenancyType} from '../../questionnaire/questions/mees/tenancy-type-question/tenancy-type';
import {
    getUserEpcRatingDescription,
    UserEpcRating
} from '../../questionnaire/questions/mees/property-epc-question/user-epc-rating';
import {EpcRating} from '../../shared/postcode-epc-service/model/epc-rating';
import {LettingDomesticPropertyStage} from '../../questionnaire/questions/mees/letting-domestic-property-question/letting-domestic-property-stage';
import {AgriculturalTenancyType} from '../../questionnaire/questions/mees/agricultural-tenancy-type-question/agricultural-tenancy-type';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {PageTitleService} from "../../shared/page-title-service/page-title.service";

enum MeesResultsStatus {
    IrrelevantTenancyStartDate,
    IrrelevantTenancyType,
    EpcAtLeastE,
    DetectedEpcAtLeastE,
    EpcNotRequired,
    EpcRequired,
    InstallRecommendedImprovements,
}

@Component({
    selector: 'app-mees-results-page',
    templateUrl: './mees-results-page.component.html',
    styleUrls: ['./mees-results-page.component.scss']
})
export class MeesResultsPageComponent implements OnInit {
    status: MeesResultsStatus;
    // Import the above enum into the component scope so it can be used in the component html:
    MeesResultsStatus = MeesResultsStatus;
    isError: boolean = false;
    errorMessage: string;

    constructor(private responseData: ResponseData,
                private questionnaireService: QuestionnaireService,
                private pageTitle: PageTitleService) {
    }

    ngOnInit() {
        this.pageTitle.set('Landlord Results');

        if (!this.questionnaireService.isComplete('mees')) {
            this.errorMessage = "Sorry, we can't show you results as it seems that you have " +
                "not completed the questionnaire, or something has gone wrong.";
            this.isError = true;
            return;
        }

        if (this.responseData.tenancyType === TenancyType.Other
            || (this.responseData.tenancyType === TenancyType.DomesticAgriculturalTenancy
                && this.responseData.agriculturalTenancyType === AgriculturalTenancyType.Other)) {
            this.status = MeesResultsStatus.IrrelevantTenancyType;
        } else if (this.responseData.propertyEpc === UserEpcRating.AtLeastE) {
            this.status = MeesResultsStatus.EpcAtLeastE;
        } else if (this.responseData.propertyEpc === UserEpcRating.DontKnow
            && this.responseData.epc
            && this.responseData.epc.currentEnergyRating <= EpcRating.E) {

            this.status = MeesResultsStatus.DetectedEpcAtLeastE;
        } else if (this.responseData.isEpcRequired === false) {
            this.status = MeesResultsStatus.EpcNotRequired;
        } else if (this.isEpcBelowE()) {
            this.status = MeesResultsStatus.InstallRecommendedImprovements;
        } else {
            this.status = MeesResultsStatus.EpcRequired;
        }
    }

    getUserEpc() {
        return getUserEpcRatingDescription(this.responseData.propertyEpc);
    }

    getDetectedEpc() {
        return EpcRating[this.responseData.epc.currentEnergyRating];
    }

    private isEpcBelowE() {
        return this.responseData.propertyEpc === UserEpcRating.BelowE || this.isDetectedEpcBelowE();
    }

    private isDetectedEpcBelowE() {
        return this.responseData.propertyEpc === UserEpcRating.DontKnow
            && this.responseData.epc
            && this.responseData.epc.currentEnergyRating > EpcRating.E;
    }
}
