import {FeatureFlagResponse} from './feature-flag-response';

export class FeatureFlags {
    // fetch_epc_data: boolean;
    [feature_flag_id: string]: boolean;

    constructor(featureFlagResponses: FeatureFlagResponse[]) {
        featureFlagResponses.forEach((featureFlagResponse: FeatureFlagResponse) => {
            this[featureFlagResponse.slug] = featureFlagResponse.acf.enabled;
        });
    }
}