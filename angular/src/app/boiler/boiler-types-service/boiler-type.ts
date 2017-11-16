import {BoilerTypeMetadataResponse} from "./boiler-type-metadata-response";
import * as parse from "url-parse";

export class BoilerType {
    constructor(public name: string,
                public description: string,
                public readMorePath: string,
                public installationCostLower: number,
                public installationCostUpper: number,
                public lifetimeYears: number,
                public runningCostPerYear: number) {
    }

    static fromMetadata(metadata: BoilerTypeMetadataResponse): BoilerType {
        return new BoilerType(
            metadata.acf.name,
            metadata.acf.description,
            parse(metadata.acf.featured_page).pathname,
            metadata.acf.installation_cost_lower_bound,
            metadata.acf.installation_cost_upper_bound,
            metadata.acf.lifetime,
            metadata.acf.running_cost,
        );
    }
}