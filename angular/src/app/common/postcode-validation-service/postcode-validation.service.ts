import {Injectable} from "@angular/core";

@Injectable()
export class PostcodeValidationService {
    private static readonly POSTCODE_REGEXP: RegExp = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;

    isValid(postcode: string) {
        return PostcodeValidationService.POSTCODE_REGEXP.test(postcode);
    }
}
