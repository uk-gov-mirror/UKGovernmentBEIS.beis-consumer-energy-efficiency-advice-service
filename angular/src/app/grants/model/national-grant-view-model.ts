import {GrantEligibility} from "../grant-eligibility-service/grant-eligibility";
import {GrantViewModel} from "./grant-view-model";
import {NationalGrantContent} from "../national-grants-content-service/national-grants-content";

export class NationalGrantViewModel implements GrantViewModel {

    public name: string;
    public description: string;
    public shouldDisplayWithoutMeasures: boolean;
    public linkedMeasureCodes: string[];

    constructor(
        nationalGrantResponse: NationalGrantContent,
        public eligibility: GrantEligibility,
        public annualPaymentPounds: number
    ) {
        this.name = nationalGrantResponse.heading;
        this.description = nationalGrantResponse.description;
        this.shouldDisplayWithoutMeasures = nationalGrantResponse.display_without_measures;
        this.linkedMeasureCodes = nationalGrantResponse.linked_measure_codes;
    }
}