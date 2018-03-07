import {ProOrCon} from './pro-or-con';

export interface BoilerTypeMetadataResponse {
    slug: string;
    acf: {
        name: string;
        description: string;
        space_requirement: string;
        installation_cost_lower_bound: number;
        installation_cost_upper_bound: number;
        lifetime: number;
        running_cost: number;
        pros: ProOrCon[] | false;
        cons: ProOrCon[] | false;
    };
}
