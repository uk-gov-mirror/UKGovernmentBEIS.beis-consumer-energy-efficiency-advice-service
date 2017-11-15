import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {EpcApiService} from "../../shared/epc-api-service/epc-api.service";
import {EpcRecommendation} from "../../shared/epc-api-service/model/response/epc-recommendation";
import {EnergySavingRecommendation} from "../../shared/recommendation-card/energy-saving-recommendation";
import {RecommendationService} from "../../shared/recommendation-service/recommendation.service";
import * as parse from "url-parse";

@Component({
    selector: 'app-boiler-epc-replace',
    templateUrl: './boiler-epc-replace.component.html',
    styleUrls: ['./boiler-epc-replace.component.scss']
})
export class BoilerEpcReplaceComponent implements OnInit {
    private lmkKey: string;
    loading: boolean = true;
    recommendations: EpcRecommendation[];

    staticPartialMeasuresWithCodes: {code: string, measure: EnergySavingRecommendation}[] = [
        {
            code: 'G',
            measure: new EnergySavingRecommendation(
                80,
                10,
                undefined,
                undefined,
                undefined,
                undefined,
                RecommendationService.recommendationIcons['G'],
            ),
        },
        {
            code: 'C',
            measure: new EnergySavingRecommendation(
                80,
                10,
                undefined,
                undefined,
                undefined,
                undefined,
                RecommendationService.recommendationIcons['C'],
            ),
        },
        {
            code: undefined,
            measure: new EnergySavingRecommendation(
                undefined,
                120,
                undefined,
                undefined,
                'Drop the thermostat by 1 degree',
                undefined,
                'icon-thermometer',
            ),
        },
    ];

    constructor(private epcApiService: EpcApiService,
                private recommendationService: RecommendationService,
                private route: ActivatedRoute) {
        this.lmkKey = this.route.snapshot.paramMap.get('lmkKey');
    }

    ngOnInit() {
        Observable.forkJoin(
            this.epcApiService.getRecommendationsForLmkKey(this.lmkKey),
            this.recommendationService.fetchRecommendationDetails()
        )
            .subscribe(
                ([epcRecommendations, measures]) => {
                    this.handleRecommendationsResponse(epcRecommendations);
                    this.handleMeasuresResponse(measures);
                },
                () => this.handleError(),
                () => this.loading = false,
            );
    }

    private handleRecommendationsResponse(response) {
        this.recommendations = response;
    }

    private handleMeasuresResponse(measures) {
        this.staticPartialMeasuresWithCodes.forEach(measureAndCode => {
            if (measureAndCode.code !== undefined) {
                const measureDetails = measures.find(measure => measure.acf.rdsap_measure_code === measureAndCode.code);
                if (measureDetails !== undefined) {
                    measureAndCode.measure.readMoreRoute = parse(measureDetails.acf.featured_page).pathname;
                    measureAndCode.measure.headline = measureDetails.acf.headline;
                    measureAndCode.measure.summary = measureDetails.acf.summary;
                }
            }
        });
    }

    private handleError() {
        this.recommendations = undefined;
    }

    boilerNeedsReplacing() {
        return this.recommendations && this.recommendations.some(rec => rec.isBoilerReplacement());
    }
}
