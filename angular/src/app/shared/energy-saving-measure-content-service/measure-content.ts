import {RecommendationStepResponse} from './recommendation-step-response';

export interface MeasureContent {
    slug: string;
    acf: {
        measure_code: string;
        headline: string;
        summary: string;
        what_it_is: string;
        is_it_right_for_me: string;
        advantages: { advantage: string }[];
        statistic: string;
        tags: string[];
        steps: RecommendationStepResponse[];
        trustmark_trade_codes: { trade_code: string }[];
        installation_cost_lower_bound?: string;
        installation_cost_upper_bound?: string;
        lifetime?: string;
    };
}
