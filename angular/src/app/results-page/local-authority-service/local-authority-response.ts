export interface GrantResponse {
    display_name: string;
    description: string;
}

export interface LocalAuthorityResponse {
    local_authority_code: string;
    display_name: string;
    grants: GrantResponse[];
}