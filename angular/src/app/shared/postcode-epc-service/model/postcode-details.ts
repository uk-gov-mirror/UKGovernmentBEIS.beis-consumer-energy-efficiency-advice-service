import {Epc} from './epc';

export class PostcodeDetails {
    constructor(public postcode: string,
                public allEpcsForPostcode: Epc[],
                public localAuthorityCode: string) {
    }
}
