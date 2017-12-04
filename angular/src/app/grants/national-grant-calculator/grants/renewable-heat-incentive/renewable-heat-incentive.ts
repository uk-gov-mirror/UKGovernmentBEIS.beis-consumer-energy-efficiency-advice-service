import {Injectable} from "@angular/core";
import {NationalGrantCalculator} from "../../national-grant-calculator";
import {ResponseData} from "../../../../shared/response-data/response-data";
import {GrantEligibility} from "../../../grant-eligibility-service/grant-eligibility";
import {Observable} from "rxjs/Observable";
import {EnergyCalculationApiService} from "../../../../shared/energy-calculation-api-service/energy-calculation-api-service";

@Injectable()
export class RenewableHeatIncentive extends NationalGrantCalculator {

    static readonly GRANT_ID = 'renewable-heat-incentive';

    constructor(private energyCalculationService: EnergyCalculationApiService) {
        super(RenewableHeatIncentive.GRANT_ID);
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        return Observable.of(GrantEligibility.LikelyEligible);
    }
}