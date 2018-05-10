import {Injectable} from '@angular/core';
import {NationalGrantCalculator} from '../../national-grant-calculator';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FuelPoorNetworkExtensionScheme extends NationalGrantCalculator {
    constructor() {
        super('fuel-poor-network-extension-scheme');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        // We would have to determine if the user lives in a deprived area,
        // or if they qualify as living in Fuel Poverty.
        // which we have decided not to do for now.
        // So we just return "maybe" if they do not already have mains gas.
        const isNotConnectedToMainsGas = responseData.epc
            && !responseData.epc.isConnectedToMainsGas;

        return Observable.of(
            isNotConnectedToMainsGas
                ? GrantEligibility.MayBeEligible
                : GrantEligibility.Ineligible);
    }
}
