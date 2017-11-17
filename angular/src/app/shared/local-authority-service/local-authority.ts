import {LocalAuthorityResponse} from "./local-authority-response";
import {LocalAuthorityGrantViewModel} from "../grant/local-authority-grant-view-model";

export class LocalAuthority {

    public name: string;
    public isEcoFlexActive: boolean;
    public ecoFlexMoreInfoLink: string;
    public grants: LocalAuthorityGrantViewModel[];

    constructor(response: LocalAuthorityResponse) {
        this.grants = response.grants.map(
            grant => new LocalAuthorityGrantViewModel(grant)
        );
        this.name = response.display_name;
        this.isEcoFlexActive = response.is_eco_flex_active;
        this.ecoFlexMoreInfoLink = response.eco_flex_further_info_link;
    }
}