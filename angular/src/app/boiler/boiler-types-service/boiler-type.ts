import {BoilerTypeMetadataResponse} from './boiler-type-metadata-response';
import {ProOrCon} from './pro-or-con';

export class BoilerType {
    constructor(public slug: string,
                public name: string,
                public description: string,
                public spaceRequirement: string,
                public installationCostLower: number,
                public installationCostUpper: number,
                public lifetimeYears: number,
                public runningCostPerYear: number,
                public pros: ProOrCon[],
                public cons: ProOrCon[]) {
    }

    get averageInstallationCost() {
        return (this.installationCostLower + this.installationCostUpper) / 2;
    }

    static fromMetadata(metadata: BoilerTypeMetadataResponse): BoilerType {
        return new BoilerType(
            metadata.slug,
            metadata.acf.name,
            metadata.acf.description,
            metadata.acf.space_requirement,
            +metadata.acf.installation_cost_lower_bound,
            +metadata.acf.installation_cost_upper_bound,
            +metadata.acf.lifetime,
            +metadata.acf.running_cost,
            metadata.acf.pros === false ? [] : metadata.acf.pros,
            metadata.acf.cons === false ? [] : metadata.acf.cons,
        );
    }
}
