import {LocalAuthorityResponse} from "./local-authority-response";
import {LocalAuthorityGrant} from "../../grants/model/local-authority-grant";

export class LocalAuthority {

    public name: string;
    public isEcoFlexActive: boolean;
    public ecoFlexMoreInfoLink: string;
    public grants: LocalAuthorityGrant[];

    constructor(response: LocalAuthorityResponse) {
        this.grants = response.grants.map(
            grant => new LocalAuthorityGrant(grant)
        );
        this.name = response.display_name;
        this.isEcoFlexActive = response.is_eco_flex_active;
        this.ecoFlexMoreInfoLink = response.eco_flex_further_info_link;
    }
}