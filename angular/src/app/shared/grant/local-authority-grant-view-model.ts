import {LocalGrantResponse} from "../local-authority-service/local-authority-response";
import {GrantEligibility} from "../grants-eligibility/grant-eligibility";
import {GrantViewModel} from "./grant-view-model";

export class LocalAuthorityGrantViewModel implements GrantViewModel {

    public name: string;
    public description: string;
    public eligibility: GrantEligibility = GrantEligibility.MayBeEligible;

    constructor(localGrantResponse: LocalGrantResponse) {
        this.name = localGrantResponse.display_name;
        this.description = localGrantResponse.description;
    }
}