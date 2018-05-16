export interface LocalGrantResponse {
    display_name: string;
    description: string;
    eligibility_criteria: string;
    phone_number: string;
    website_url: string;
    slug: string;
}

export interface LocalAuthorityResponse {
    local_authority_code: string;
    display_name: string;
    grants: LocalGrantResponse[];
}
