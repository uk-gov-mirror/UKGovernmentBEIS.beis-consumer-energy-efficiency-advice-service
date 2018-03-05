import {GrantEligibility} from '../grant-eligibility-service/grant-eligibility';
import {RecommendationStep} from '../../shared/recommendations-service/recommendation-step';

export interface Grant {
    grantId: string;
    name: string;
    description: string;
    eligibility: GrantEligibility;
    steps: RecommendationStep[];
}
