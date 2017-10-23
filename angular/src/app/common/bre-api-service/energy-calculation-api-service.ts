import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';

@Injectable()
export class EnergyCalculationApiService {
    private static readonly breEndpoint = 'angular-theme/v1/energy-calculation';

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    getEnergyCalculation() {
        const endpoint = this.wordpressApiService.getFullApiEndpoint(EnergyCalculationApiService.breEndpoint);
        const json = {
            property_type:"3",
            built_form:"3",
            construction_date:"C",
            floor_area:82,
            num_storeys:2,
            num_bedrooms:3,
            heating_fuel:"29"
        };
        const body = JSON.stringify(json);
        return this.http.post(endpoint, body);
    }
}