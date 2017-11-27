import {BoilerTypeMetadataResponse} from "./boiler-type-metadata-response";
import {decode} from "he";

export interface ProOrCon {
    heading: string;
    body: string;
}

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
            BoilerType.tryParse(metadata.acf.pros),
            BoilerType.tryParse(metadata.acf.cons),
        );
    }

    private static tryParse(encodedJsonString: string): any {
        try {
            return JSON.parse(decode(encodedJsonString));
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}
