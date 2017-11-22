import {NationalGrantCalculator} from "../../national-grant-calculator";
import {GrantEligibility} from "../../../grant-eligibility-service/grant-eligibility";
import {ResponseData} from "../../../../shared/response-data/response-data";
import {Observable} from "rxjs/Observable";

export class WinterFuelPayments extends NationalGrantCalculator {
    constructor() {
        super('winter-fuel-payments');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        const isEligible = responseData.numberOfAdultsAged64To80 > 0 ||
            responseData.numberOfAdultsAgedOver80 > 0;
        return Observable.of(isEligible ? GrantEligibility.LikelyEligible : GrantEligibility.Ineligible);
    }

    getAnnualPaymentPounds(responseData: ResponseData): Observable<number> {
        const adults64To80 = responseData.numberOfAdultsAged64To80;
        const adultsOver80 = responseData.numberOfAdultsAgedOver80;
        if (adults64To80 === 0) {
            return Observable.of(WinterFuelPayments.getAnnualPaymentForOnlyAdultsOver80(adultsOver80));
        } else if (adultsOver80 === 0) {
            return Observable.of(WinterFuelPayments.getAnnualPaymentForOnlyAdults64To80(adults64To80))
        } else {
            const annualPayment = 100 * adults64To80 + 200 * adultsOver80;
            return Observable.of(annualPayment);
        }
    }

    private static getAnnualPaymentForOnlyAdultsOver80(adultsOver80: number): number {
        switch(adultsOver80) {
            case 1:   { return 300; }
            default:  { return 150 * adultsOver80; }
        }
    }

    private static getAnnualPaymentForOnlyAdults64To80(adults64To80: number): number {
        switch(adults64To80) {
            case 1:  { return 200; }
            default: { return 100 * adults64To80; }
        }
    }
}