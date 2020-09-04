import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RdSapInput} from './request/rdsap-input';
import {Observable} from 'rxjs/Observable';
import {EnergyCalculationResponse} from './response/energy-calculation-response';
import isEqual from 'lodash-es/isEqual';
import clone from 'lodash-es/clone';
import Config from '../../config';
import toString from 'lodash-es/toString';
import {ResponseData} from "../response-data/response-data";
import {RdsapInputHelper} from "./request/rdsap-input-helper";
import keys from 'lodash-es/keys';

@Injectable()
export class EnergyCalculationApiService {
    private readonly breEndpoint = Config().apiRoot + '/energy-calculation';

    private cachedInput: RdSapInput;
    private cachedResults: EnergyCalculationResponse;

    constructor(private http: HttpClient, private responseData: ResponseData) {
    }

    fetchEnergyCalculation(rdSapInput: RdSapInput): Observable<EnergyCalculationResponse> {
        if (!isEqual(rdSapInput, this.cachedInput) || !this.cachedResults) {
            this.cachedInput = clone(rdSapInput);
            if (!rdSapInput.isMinimalDataSet()) {
                console.warn('Cannot fetch energy calculation because missing some required responses');
                this.cachedResults = null;
            }
            const propertyType = toString(RdsapInputHelper.getPropertyType(this.responseData.homeType));
            const params = EnergyCalculationApiService.getHttpRequestParams(propertyType);

            return this.http.post<EnergyCalculationResponse>(this.breEndpoint, rdSapInput, {params: params}).shareReplay(1)
                .do(response => {
                    keys(response.measures).forEach(measureCode => {
                        response.measures[measureCode].isBreRange = true;
                    });
                    if (!response.isDefaultResponse) {
                        this.cachedResults = response;
                    }
                });
        }
        return Observable.of(this.cachedResults);
    }

    private static getHttpRequestParams(propertyType: String): HttpParams {
        return new HttpParams().set('property-type', toString(propertyType));
    }
}
