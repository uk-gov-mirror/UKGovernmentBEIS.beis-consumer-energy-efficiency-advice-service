import {Component, OnInit} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {TenancyType} from '../../questionnaire/questions/mees/tenancy-type-question/tenancy-type';
import {
    getUserEpcRatingDescription,
    UserEpcRating
} from '../../questionnaire/questions/mees/property-epc-question/user-epc-rating';
import {EpcRating} from '../../shared/postcode-epc-service/model/epc-rating';
import {LettingDomesticPropertyStage} from '../../questionnaire/questions/mees/letting-domestic-property-question/letting-domestic-property-stage';

enum MeesResultsStatus {
    NoActionRequired,
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
    noActionReason: string;

    constructor(private responseData: ResponseData) {
    }

    ngOnInit() {
        if (this.responseData.lettingDomesticPropertyStage === LettingDomesticPropertyStage.BeforeApril2018) {
            this.status = MeesResultsStatus.NoActionRequired;
            this.noActionReason = `As you're not letting a property relevant to the legislation`;
        } else if (this.responseData.tenancyType === TenancyType.Other) {
            this.status = MeesResultsStatus.NoActionRequired;
            this.noActionReason = `As your tenancy type is not relevant to the legislation`;
        } else if (this.responseData.propertyEpc === UserEpcRating.AtLeastE) {
            this.status = MeesResultsStatus.NoActionRequired;
            this.noActionReason = `As your property has an EPC rating of ${getUserEpcRatingDescription(this.responseData.propertyEpc)}`;
        } else if (this.responseData.propertyEpc === UserEpcRating.DontKnow
            && this.responseData.epc
            && this.responseData.epc.currentEnergyRating <= EpcRating.E) {

            this.status = MeesResultsStatus.NoActionRequired;
            this.noActionReason =
                `We found that your property has a rating of ${EpcRating[this.responseData.epc.currentEnergyRating]}. As a result`;
        } else if (this.responseData.isEpcRequired === false) {
            this.status = MeesResultsStatus.NoActionRequired;
            this.noActionReason = `As your property is not required to have an EPC`;
        } else if (this.isEpcBelowE()) {
            this.status = MeesResultsStatus.InstallRecommendedImprovements;
        } else {
            this.status = MeesResultsStatus.EpcRequired;
        }
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
