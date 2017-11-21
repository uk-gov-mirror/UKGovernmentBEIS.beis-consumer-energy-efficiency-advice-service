import {GrantEligibility} from "../grant-eligibility-service/grant-eligibility";

export interface GrantViewModel {
    name: string;
    description: string;
    eligibility: GrantEligibility
    shouldDisplayWithoutMeasures: boolean;
    annualPaymentPounds: number;
}