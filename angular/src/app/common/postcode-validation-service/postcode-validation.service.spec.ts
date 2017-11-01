import {PostcodeValidationService} from "./postcode-validation.service";

describe('PostcodeValidationService', () => {

    let postcodeValidationService: PostcodeValidationService;

    beforeEach(() => {
        postcodeValidationService = new PostcodeValidationService();
    });

    it('should recognise a correct postcode without space as valid', () => {
        expect(postcodeValidationService.isValid('SW1H0ET')).toBeTruthy();
    });

    it('should recognise a lowercase postcode as valid', () => {
        expect(postcodeValidationService.isValid('sw1h 0et')).toBeTruthy();
    });

    it('should recognise a correct shorter postcode as valid', () => {
        expect(postcodeValidationService.isValid('s1 0et')).toBeTruthy();
    });

    it('should recognise an incorrect postcode as invalid', () => {
        expect(postcodeValidationService.isValid('s1 0e')).toBeFalsy();
    });

    it('should recognise a postcode input with special characters as invalid', () => {
        expect(postcodeValidationService.isValid('SW!H 0ET')).toBeFalsy();
    });
});