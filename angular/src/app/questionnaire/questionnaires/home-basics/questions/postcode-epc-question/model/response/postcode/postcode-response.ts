export interface PostcodeResponse {
    status: number;
    result: {
        postcode: string;
        codes: {
            admin_district: string;
        };
    };
}