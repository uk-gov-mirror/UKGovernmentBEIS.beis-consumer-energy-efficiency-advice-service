export interface LocalGrantResponse {
    display_name: string;
    description: string;
}

export interface LocalAuthorityResponse {
    local_authority_code: string;
    display_name: string;
    grants: LocalGrantResponse[];
    is_eco_flex_active: boolean;
    eco_flex_further_info_link: string;
}