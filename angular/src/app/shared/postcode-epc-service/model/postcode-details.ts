import {Epc} from './epc';
import {Country} from "../../../questionnaire/questions/postcode-epc-question/country";

export class PostcodeDetails {
    constructor(public postcode: string,
                public allEpcsForPostcode: Epc[],
                public localAuthorityCode: string,
                public country: Country) {
    }
}
