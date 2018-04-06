import {Component, OnInit} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {TenancyType} from '../../questionnaire/questions/mees/tenancy-type-question/tenancy-type';

enum MeesResultsStatus {
    NoActionRequired,
    RegisterExemption,
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
        if (this.responseData.hasTemporaryExclusions === false) { // We reached the end of the form
            this.status = MeesResultsStatus.InstallRecommendedImprovements;
        } else if (!(this.responseData.isDomesticPropertyAfter2018 || this.responseData.isPropertyAfter2020)
            || !this.responseData.isEpcRequired
            || this.responseData.tenancyType === TenancyType.Other
            || !this.responseData.isEpcBelowE) {
            this.status = MeesResultsStatus.NoActionRequired;
        } else {
            this.status = MeesResultsStatus.RegisterExemption;
        }
    }
}
