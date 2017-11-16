export interface BoilerTypeMetadataResponse {
    acf: {
        name: string;
        description: string;
        installation_cost_lower_bound: number;
        installation_cost_upper_bound: number;
        lifetime: number;
        running_cost: number;
        featured_page: string;
    }
}