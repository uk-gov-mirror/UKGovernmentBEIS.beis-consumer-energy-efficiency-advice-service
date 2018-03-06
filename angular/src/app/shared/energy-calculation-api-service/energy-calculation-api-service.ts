import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {RdSapInput} from './request/rdsap-input';
import {Observable} from 'rxjs/Observable';
import {EnergyCalculationResponse} from './response/energy-calculation-response';
import isEqual from 'lodash-es/isEqual';
import clone from 'lodash-es/clone';

@Injectable()
export class EnergyCalculationApiService {
    private static readonly breEndpoint = 'angular-theme/v1/energy-calculation';

    private cachedInput: RdSapInput;
    private cachedResults: Observable<EnergyCalculationResponse>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    fetchEnergyCalculation(rdSapInput: RdSapInput): Observable<EnergyCalculationResponse> {
        if (!isEqual(rdSapInput, this.cachedInput) || !this.cachedResults) {
            this.cachedInput = clone(rdSapInput);
            if (!rdSapInput.isMinimalDataSet()) {
                console.warn('Cannot fetch energy calculation because missing some required responses');
                this.cachedResults = Observable.of(null);
            }
            const endpoint = this.wordpressApiService.getFullApiEndpoint(EnergyCalculationApiService.breEndpoint);
            this.cachedResults = this.http.post<EnergyCalculationResponse>(endpoint, rdSapInput).shareReplay(1);
        }
        return this.cachedResults;
    }
}
