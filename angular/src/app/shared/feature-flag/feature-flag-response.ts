import {FeatureFlagName} from './feature-flags';

export interface FeatureFlagResponse {
    slug: FeatureFlagName;
    acf: { enabled: boolean };
}
