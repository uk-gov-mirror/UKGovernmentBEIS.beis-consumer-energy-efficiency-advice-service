import {LocalGrantResponse} from '../../shared/local-authority-service/local-authority-response';
import {GrantEligibility} from '../grant-eligibility-service/grant-eligibility';
import {RecommendationStep} from '../../shared/recommendations-service/recommendation-step';
import {Grant} from './grant';

export class LocalAuthorityGrant implements Grant {
    public grantId: string;
    public name: string;
    public description: string;
    public eligibilityCriteria: string;
    public phoneNumber: string;
    public websiteUrl: string;
    public eligibility: GrantEligibility = GrantEligibility.MayBeEligible;
    public steps: RecommendationStep[] = [];

    constructor(localGrantResponse: LocalGrantResponse) {
        this.grantId = localGrantResponse.slug;
        this.name = localGrantResponse.display_name;
        this.description = localGrantResponse.description;
        this.eligibilityCriteria = localGrantResponse.eligibility_criteria;
        this.phoneNumber = localGrantResponse.phone_number;
        this.websiteUrl = localGrantResponse.website_url;
    }
}
