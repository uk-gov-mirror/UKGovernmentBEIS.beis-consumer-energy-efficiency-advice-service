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

    get headingText() {
        switch (this.status) {
            case MeesResultsStatus.NoActionRequired:
                return 'No action required';
            case MeesResultsStatus.RegisterExemption:
                return 'Register your exemption on the PRS Exemptions register';
            case MeesResultsStatus.InstallRecommendedImprovements:
                return 'You are required to install the recommended improvements';
        }
    }

    get bodyText() {
        switch (this.status) {
            case MeesResultsStatus.NoActionRequired:
                return `You are not affected by the Minimum Energy Efficiency Standards regulations and may let the property.`;
            case MeesResultsStatus.RegisterExemption:
                return `You may be exempt from the need to make improvements to the property under the Minimum Energy Efficiency Standards
            regulations. You’ll need to register this exemption by following the instructions
            <a href="https://www.gov.uk/government/publications/the-private-rented-property-minimum-standard-landlord-guidance-documents"
            target="_blank">
                here</a>.`;
            case MeesResultsStatus.InstallRecommendedImprovements:
                return `Based on the information you have provided your property is covered by the Minimum Energy Efficiency Standards
            regulations and you will now need to take steps to improve the EPC score to E.
            When you’ve installed improvements, you’ll need to get your EPC evaluated again.
            If the property is now rated E or above then you are compliant with the legislation.
            However, if there are legitimate reasons why the property cannot be improved to E, you may qualify for an exemption
            which you can register for
            <a href="https://www.gov.uk/government/publications/the-private-rented-property-minimum-standard-landlord-guidance-documents"
            target="_blank">
                here</a>.
            (You may want to bookmark this link.)`;
        }

    }
}
