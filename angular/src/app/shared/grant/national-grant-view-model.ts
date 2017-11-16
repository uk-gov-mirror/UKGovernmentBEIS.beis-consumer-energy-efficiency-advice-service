import {GrantEligibility} from "../grants-eligibility/grant-eligibility";
import {GrantViewModel} from "./grant-view-model";
import {NationalGrantResponse} from "../national-grants-service/national-grants-response";

export class NationalGrantViewModel implements GrantViewModel {

    public name: string;
    public description: string;
    public eligibility: GrantEligibility;

    constructor(nationalGrantResponse: NationalGrantResponse, grantEligibility: GrantEligibility) {
        this.name = nationalGrantResponse.acf.heading;
        this.description = nationalGrantResponse.acf.description;
        this.eligibility = grantEligibility;
    }
}