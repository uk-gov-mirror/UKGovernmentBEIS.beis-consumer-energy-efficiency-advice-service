import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
            const params = EnergyCalculationApiService.getHttpRequestParams(rdSapInput);

            return this.http.post<EnergyCalculationResponse>(this.breEndpoint, rdSapInput, {params: params}).shareReplay(1)
                .do(response => {
                    if (!response.isDefaultResponse) {
                        this.cachedResults = response;
                    }
                });
        }
        return Observable.of(this.cachedResults);
    }

    private static getHttpRequestParams(rdSapInput: RdSapInput): HttpParams {
        return new HttpParams()
            .set('property-type', toString(rdSapInput.property_type))
            .set('heating-fuel', toString(rdSapInput.heating_fuel));
    }
}
