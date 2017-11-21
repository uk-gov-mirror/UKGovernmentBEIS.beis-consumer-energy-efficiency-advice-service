import {GrantEligibility} from "../grant-eligibility-service/grant-eligibility";
import {GrantViewModel} from "./grant-view-model";
import {NationalGrantContent} from "../national-grants-content-service/national-grants-content";

export class NationalGrantViewModel implements GrantViewModel {

    public name: string;
    public description: string;
    public eligibility: GrantEligibility;
    public shouldDisplayWithoutMeasures: boolean;

    constructor(
        nationalGrantResponse: NationalGrantContent,
        grantEligibility: GrantEligibility,
        public annualPaymentPounds: number
    ) {
        this.name = nationalGrantResponse.acf.heading;
        this.description = nationalGrantResponse.acf.description;
        this.eligibility = grantEligibility;
        this.shouldDisplayWithoutMeasures = nationalGrantResponse.acf.display_without_measures;
    }
}