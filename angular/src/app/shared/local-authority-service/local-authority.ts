import {LocalAuthorityResponse} from './local-authority-response';
import {LocalAuthorityGrant} from '../../grants/model/local-authority-grant';

export class LocalAuthority {

    public name: string;
    public grants: LocalAuthorityGrant[];

    constructor(response: LocalAuthorityResponse) {
        this.grants = response.grants.map(
            grant => new LocalAuthorityGrant(grant)
        );
        this.name = response.display_name;
    }
}
