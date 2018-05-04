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
import {TenancyStartDate} from '../../questionnaire/questions/mees/tenancy-start-date-question/tenancy-start-date';

enum MeesResultsStatus {
    IrrelevantTenancyStartDate,
    IrrelevantTenancyType,
    EpcAtLeastE,
    DetectedEpcAtLeastE,
    EpcNotRequired,
    EpcRequired,
    InstallRecommendedImprovementsAsap,
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

    constructor(private responseData: ResponseData) {
    }

    ngOnInit() {
        if (this.responseData.tenancyStartDate === TenancyStartDate.BeforeApril2018) {
            this.status = MeesResultsStatus.IrrelevantTenancyStartDate;
        } else if (this.responseData.tenancyType === TenancyType.Other
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
        } else if (this.isEpcBelowE()
            && this.responseData.lettingDomesticPropertyStage === LettingDomesticPropertyStage.Currently
            && this.responseData.tenancyStartDate === TenancyStartDate.AfterApril2018) {

            this.status = MeesResultsStatus.InstallRecommendedImprovementsAsap;
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
