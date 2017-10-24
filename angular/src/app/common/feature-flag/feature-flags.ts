import {FeatureFlagResponse} from './feature-flag-response';

export type FeatureFlagName = 'fetch_epc_data';
export type FeatureFlags = {[K in FeatureFlagName]?: boolean};

export function featureFlagsFromResponses(featureFlagResponses: FeatureFlagResponse[]): FeatureFlags {
    let flags = {};
    featureFlagResponses.forEach((featureFlagResponse: FeatureFlagResponse) => {
        flags[featureFlagResponse.slug] = featureFlagResponse.acf.enabled;
    });
    return flags;
}
