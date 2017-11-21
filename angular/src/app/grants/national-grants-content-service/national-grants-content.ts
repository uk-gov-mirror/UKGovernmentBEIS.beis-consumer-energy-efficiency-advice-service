export interface NationalGrantContent {
    slug: string;
    acf: {
        heading: string;
        description: string;
        measures: any[];
        link_to_measures: boolean;
        display_without_measures: boolean;
    }
}