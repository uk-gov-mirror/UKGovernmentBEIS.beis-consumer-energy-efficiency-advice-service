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
    private cachedResults: Observable<EnergyCalculationResponse>;

    constructor(private http: HttpClient) {
    }

    fetchEnergyCalculation(rdSapInput: RdSapInput): Observable<EnergyCalculationResponse> {
        if (!isEqual(rdSapInput, this.cachedInput) || !this.cachedResults) {
            this.cachedInput = clone(rdSapInput);
            if (!rdSapInput.isMinimalDataSet()) {
                console.warn('Cannot fetch energy calculation because missing some required responses');
                this.cachedResults = Observable.of(null);
            }
            this.cachedResults = this.http.post<EnergyCalculationResponse>(this.breEndpoint, rdSapInput).shareReplay(1);
        }
        return this.cachedResults;
    }
}
