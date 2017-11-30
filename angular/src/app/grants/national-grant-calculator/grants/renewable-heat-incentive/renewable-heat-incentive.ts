import {Injectable} from "@angular/core";
import {NationalGrantCalculator} from "../../national-grant-calculator";
import {ResponseData} from "../../../../shared/response-data/response-data";
import {GrantEligibility} from "../../../grant-eligibility-service/grant-eligibility";
import {Observable} from "rxjs/Observable";
import {EnergyCalculationApiService} from "../../../../shared/energy-calculation-api-service/energy-calculation-api-service";
import {RdSapInput} from "../../../../shared/energy-calculation-api-service/request/rdsap-input";
import keys from "lodash-es/keys";

@Injectable()
export class RenewableHeatIncentive extends NationalGrantCalculator {

    constructor(private energyCalculationService: EnergyCalculationApiService) {
        super('renewable-heat-incentive');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        return Observable.of(GrantEligibility.LikelyEligible);
    }

    getAnnualPaymentPoundsByMeasure(responseData: ResponseData): Observable<{ [measureCode: string]: number }> {
        return this.energyCalculationService.fetchEnergyCalculation(new RdSapInput(responseData))
            .map(energyCalculation => keys(energyCalculation.measures)
                .reduce((result, measureCode) => {
                    const rhiPayment = energyCalculation.measures[measureCode].RHI;
                    if (rhiPayment && rhiPayment > 0) {
                        result[measureCode] = rhiPayment;
                    }
                    return result;
                }, {}));
    }
}