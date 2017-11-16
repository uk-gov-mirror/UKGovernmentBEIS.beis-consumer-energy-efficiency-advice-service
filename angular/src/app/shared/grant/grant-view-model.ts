import {GrantEligibility} from "../grants-eligibility/grant-eligibility";

export interface GrantViewModel {
    name: string;
    description: string;
    eligibility: GrantEligibility
}