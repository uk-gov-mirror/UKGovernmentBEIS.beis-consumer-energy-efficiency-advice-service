import {GrantEligibility} from "../grant-eligibility-service/grant-eligibility";
import {RecommendationStep} from "../../shared/recommendations-service/recommendation-step";

export interface GrantViewModel {
    name: string;
    description: string;
    eligibility: GrantEligibility
    shouldDisplayWithoutMeasures: boolean;
    annualPaymentPoundsStandalone: number;
    annualPaymentPoundsByMeasure: {[measureCode: string]: number};
    linkedMeasureCodesForOneOffPayment: string[];
    advantages: string[];
    grantId: string;
    steps: RecommendationStep[];
}