import {Component} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {TenancyType} from "../../questionnaire/questions/mees/tenancy-type-question/tenancy-type";

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
export class MeesResultsPageComponent {
    MeesResultsStatus = MeesResultsStatus;
    status: MeesResultsStatus;

    constructor(responseData: ResponseData) {
        if (responseData.hasTemporaryExclusions === false) { // We reached the end of the form
            this.status = MeesResultsStatus.InstallRecommendedImprovements;
        } else if (!(responseData.isDomesticPropertyAfter2018 || responseData.isPropertyAfter2020)
            || !responseData.isEpcRequired
            || responseData.tenancyType === TenancyType.Other
            || !responseData.isEpcBelowE) {
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
                return `You are not affected by the Minimum Standards Regulations and may let the property.`
            case MeesResultsStatus.RegisterExemption:
                return `Follow the instructions
            <a href="https://www.gov.uk/government/publications/the-private-rented-property-minimum-standard-landlord-guidance-documents"
            target="_blank">
                here</a>.`;
            case MeesResultsStatus.InstallRecommendedImprovements:
                return `If your property still has an EPC of F or G after installing the recommended measures, you must register
            an exemption on the PRS Exemptions register
            <a href="https://www.gov.uk/government/publications/the-private-rented-property-minimum-standard-landlord-guidance-documents"
            target="_blank">
                here</a>.
            Otherwise, if your property has an EPC of E or above, your property is compliant with the Minimum Energy
            Efficiency Standards and no further action is required.`;
        }

    }
}
