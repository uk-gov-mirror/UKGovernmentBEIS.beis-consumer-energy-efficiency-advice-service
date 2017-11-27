import {GrantEligibility} from "../grant-eligibility-service/grant-eligibility";
import {RecommendationStep} from "../../energy-efficiency/recommendations/recommendation-step";

export interface GrantViewModel {
    name: string;
    description: string;
    eligibility: GrantEligibility
    shouldDisplayWithoutMeasures: boolean;
    annualPaymentPounds: number;
    linkedMeasureCodes: string[];
    advantages: string[];
    grantId: string;
    steps: RecommendationStep[];
}