export interface PostcodeBasicDetailsResponse {
    status: number;
    result: {
        postcode: string;
        codes: {
            admin_district: string;
        };
    };
}
