import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GasAndOilBoiler} from './gas-and-oil-boiler';
import {HttpClient, HttpParams} from '@angular/common/http';
import Config from '../../config';

export interface BoilerJson {
    productIndexNumber: string;
    name: string;
    sap2005SeasonalEfficiency: string;
    fuel: string;
}

interface BoilerJsonResponse {
    results: BoilerJson[];
}

@Injectable()
export class GasAndOilBoilersService {

    constructor(private http: HttpClient) {
    }

    getGasAndOilBoilerWithIndexNumber(productIndexNumber: string): Observable<GasAndOilBoiler> {
        const url = Config().apiRoot + '/boilers/' + encodeURIComponent(productIndexNumber);

        return this.http
            .get<BoilerJson>(url)
            .map(GasAndOilBoiler.fromJson)
            .shareReplay(1);
    }

    getGasAndOilBoilersMatching(searchTerm: string): Observable<GasAndOilBoiler[]> {
        return this.http
            .get<BoilerJsonResponse>(
                Config().apiRoot + '/boilers',
                {'params': new HttpParams().append('searchTerm', searchTerm)})
            .map(result => result.results.map(GasAndOilBoiler.fromJson))
            .shareReplay(1);
    }
}
