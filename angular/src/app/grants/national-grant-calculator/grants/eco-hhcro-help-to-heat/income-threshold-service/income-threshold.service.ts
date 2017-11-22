import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/shareReplay";
import {WordpressApiService} from "../../../../../shared/wordpress-api-service/wordpress-api-service";
import {IncomeThresholdResponse} from "./income-threshold-response";
import {IncomeThresholds, incomeThresholdsFromResponses} from "./income-thresholds";

@Injectable()
export class IncomeThresholdService {
    private static readonly incomeThresholdsEndpoint = 'acf/v3/income_threshold';
    private incomeThresholds: Observable<IncomeThresholds>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    public fetchIncomeThresholds(): Observable<IncomeThresholds> {
        if (!this.incomeThresholds) {
            const url = this.wordpressApiService.getFullApiEndpoint(IncomeThresholdService.incomeThresholdsEndpoint);
            this.incomeThresholds = this.http.get(url)
                .map((responses: IncomeThresholdResponse[]) => incomeThresholdsFromResponses(responses))
                .shareReplay(1);
        }
        return this.incomeThresholds;
    }
}
