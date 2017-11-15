export interface JsonApiResponse<T> {
    'column-names': string[];
    rows: T[];
}
