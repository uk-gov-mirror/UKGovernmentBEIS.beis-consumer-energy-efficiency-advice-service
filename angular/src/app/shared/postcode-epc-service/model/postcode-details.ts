import {Epc} from './epc';
import head from 'lodash-es/head';

export class PostcodeDetails {

    constructor(public postcode: string,
                public allEpcsForPostcode: Epc[],
                public localAuthorityCode?: string) {
        if (!localAuthorityCode) {
            // Local authority code is the same for all EPCs for one postcode
            this.localAuthorityCode = head(allEpcsForPostcode).localAuthorityCode;
        }
    }
}
