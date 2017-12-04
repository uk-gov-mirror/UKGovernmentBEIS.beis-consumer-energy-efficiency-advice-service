import {NationalGrantCalculator} from "../national-grant-calculator/national-grant-calculator";
import {GrantEligibility} from "./grant-eligibility";

export interface EligibilityByGrant {
    [grantId: string]: {
        eligibility: GrantEligibility;
        calculator: NationalGrantCalculator;
    }
}