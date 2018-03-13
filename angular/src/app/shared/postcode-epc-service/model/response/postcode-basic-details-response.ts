export interface PostcodeBasicDetailsResponse {
    status: number;
    result: {
        country: string;
        postcode: string;
        codes: {
            admin_district: string;
        };
    };
}
