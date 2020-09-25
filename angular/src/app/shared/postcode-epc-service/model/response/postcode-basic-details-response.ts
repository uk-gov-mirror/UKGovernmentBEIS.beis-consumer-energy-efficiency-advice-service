export interface PostcodeBasicDetailsResponse {
    status: number;
    result: {
        country: string;
        postcode: string;
        latitude: number;
        longitude: number;
        codes: {
            admin_district: string;
        };
    };
}
