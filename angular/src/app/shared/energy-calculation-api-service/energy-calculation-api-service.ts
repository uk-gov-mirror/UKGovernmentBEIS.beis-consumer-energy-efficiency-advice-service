import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RdSapInput} from './request/rdsap-input';
import {Observable} from 'rxjs/Observable';
import {EnergyCalculationResponse} from './response/energy-calculation-response';
import isEqual from 'lodash-es/isEqual';
import clone from 'lodash-es/clone';
import Config from '../../config';

@Injectable()
export class EnergyCalculationApiService {
    private readonly breEndpoint = Config().apiRoot + '/energy-calculation';

    private cachedInput: RdSapInput;
    private cachedResults: EnergyCalculationResponse;

    private defaultResponse: EnergyCalculationResponse =
        require('assets/default-recommendation-responses/non-electric-heating-house-response.json');

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
                .do(s => this.cachedResults = s)
                .catch(() => {
                    this.cachedResults = null;
                    return Observable.of(this.defaultResponse);
                });
        }
        return Observable.of(this.cachedResults);
    }
}
