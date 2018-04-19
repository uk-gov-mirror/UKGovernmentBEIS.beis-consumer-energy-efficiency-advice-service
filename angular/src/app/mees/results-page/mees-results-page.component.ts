import {Component, OnInit} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {TenancyType} from '../../questionnaire/questions/mees/tenancy-type-question/tenancy-type';
import {UserEpcRating} from '../../questionnaire/questions/mees/property-epc-question/user-epc-rating';
import {EpcRating} from '../../shared/postcode-epc-service/model/epc-rating';

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

    constructor(private responseData: ResponseData) {
    }

    ngOnInit() {
        if (this.responseData.isEpcRequired) { // we haven't been able to get an EPC rating
            this.status = MeesResultsStatus.EpcRequired;
        } else if (!(this.responseData.isDomesticPropertyAfter2018 || this.responseData.isPropertyAfter2020)
            || this.responseData.tenancyType === TenancyType.Other
            || !this.hasEpcBelowE()
            || this.responseData.isEpcRequired === false) {
            this.status = MeesResultsStatus.NoActionRequired;
        } else {
            this.status = MeesResultsStatus.InstallRecommendedImprovements;
        }
    }

    private hasEpcBelowE() {
        return this.responseData.propertyEpc === UserEpcRating.BelowE
            || (this.responseData.propertyEpc === UserEpcRating.DontKnow
                && this.responseData.epc
                && [EpcRating.F, EpcRating.G].includes(this.responseData.epc.currentEnergyRating));
    }
}
