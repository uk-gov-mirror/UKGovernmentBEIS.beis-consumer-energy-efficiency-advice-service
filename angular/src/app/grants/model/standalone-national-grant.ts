import {GrantEligibility} from '../grant-eligibility-service/grant-eligibility';
import {RecommendationStep} from '../../shared/recommendations-service/recommendation-step';
import {Grant} from './grant';
import {NationalGrantContent} from '../national-grants-content-service/national-grants-content';

export class StandaloneNationalGrant implements Grant {
    grantId: string;
    name: string;
    description: string;
    advantages: string[];
    findOutMoreLink?: string;
    steps: RecommendationStep[];

    constructor(
        nationalGrantContent: NationalGrantContent,
        public eligibility: GrantEligibility,
        public annualPaymentPoundsStandalone: number,
    ) {
        this.grantId = nationalGrantContent.slug;
        this.name = nationalGrantContent.heading;
        this.description = nationalGrantContent.description;
        this.findOutMoreLink = nationalGrantContent.find_out_more_link;
        this.advantages = nationalGrantContent.advantages;
        this.steps = nationalGrantContent.steps && nationalGrantContent.steps
                .map(stepResponse => new RecommendationStep(stepResponse));
    }
}
