import {RecommendationStepResponse} from '../../shared/energy-saving-measure-content-service/recommendation-step-response';

export interface NationalGrantContent {
    slug: string;
    heading: string;
    description: string;
    linked_measure_codes: string[];
    link_to_measures: boolean;
    display_without_measures: boolean;
    advantages: {advantage: string}[];
    steps: RecommendationStepResponse[];
}
