import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RdSapInput} from './request/rdsap-input';
import {Observable} from 'rxjs/Observable';
import {EnergyCalculationResponse} from './response/energy-calculation-response';
import isEqual from 'lodash-es/isEqual';
import clone from 'lodash-es/clone';
import Config from '../../config';
import {PropertyType} from "./request/property-type";
import toString from 'lodash-es/toString';
import {RdsapInputHelper} from "./request/rdsap-input-helper";
import {FuelType} from "../../questionnaire/questions/fuel-type-question/fuel-type";

@Injectable()
export class EnergyCalculationApiService {
    private static readonly NON_ELECTRIC_HEATING_HOUSE_DEFAULT_RESPONSE: EnergyCalculationResponse =
        require('assets/default-recommendation-responses/non-electric-heating-house-response.json');
    private static readonly ELECTRIC_HEATING_HOUSE_DEFAULT_RESPONSE: EnergyCalculationResponse =
        require('assets/default-recommendation-responses/electric-heating-house-response.json');
    private static readonly NON_ELECTRIC_HEATING_FLAT_DEFAULT_RESPONSE: EnergyCalculationResponse =
        require('assets/default-recommendation-responses/non-electric-heating-flat-response.json');
    private static readonly ELECTRIC_HEATING_FLAT_DEFAULT_RESPONSE: EnergyCalculationResponse =
        require('assets/default-recommendation-responses/electric-heating-flat-response.json');

    private readonly breEndpoint = Config().apiRoot + '/energy-calculation';

    private cachedInput: RdSapInput;
    private cachedResults: EnergyCalculationResponse;

    constructor(private http: HttpClient) {
    }

    fetchEnergyCalculation(rdSapInput: RdSapInput): Observable<EnergyCalculationResponse> {
        if (!isEqual(rdSapInput, this.cachedInput) || !this.cachedResults) {
            this.cachedInput = clone(rdSapInput);
            if (!rdSapInput.isMinimalDataSet()) {
                console.warn('Cannot fetch energy calculation because missing some required responses');
                this.cachedResults = null;
            }
            return this.http.post<EnergyCalculationResponse>(this.breEndpoint, rdSapInput).shareReplay(1)
                .do(response => this.cachedResults = response)
                .catch(() => {
                    this.cachedResults = null;
                    return Observable.of(EnergyCalculationApiService.getDefaultResponse(this.cachedInput));
                });
        }
        return Observable.of(this.cachedResults);
    }

    private static getDefaultResponse(input: RdSapInput): EnergyCalculationResponse {
        if (input.property_type === toString(PropertyType.Flat)) {
            return input.heating_fuel === RdsapInputHelper.getFuelTypeEncoding(FuelType.Electricity)
                ? EnergyCalculationApiService.ELECTRIC_HEATING_FLAT_DEFAULT_RESPONSE
                : EnergyCalculationApiService.NON_ELECTRIC_HEATING_FLAT_DEFAULT_RESPONSE;
        }
        return input.heating_fuel === RdsapInputHelper.getFuelTypeEncoding(FuelType.Electricity)
            ? EnergyCalculationApiService.ELECTRIC_HEATING_HOUSE_DEFAULT_RESPONSE
            : EnergyCalculationApiService.NON_ELECTRIC_HEATING_HOUSE_DEFAULT_RESPONSE;
    }
}
