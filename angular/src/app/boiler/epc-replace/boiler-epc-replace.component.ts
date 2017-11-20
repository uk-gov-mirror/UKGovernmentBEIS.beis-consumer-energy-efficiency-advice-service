import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {EpcRecommendation} from "../../shared/epc-api-service/model/response/epc-recommendation";
import {EnergySavingRecommendation} from "../../shared/recommendation-card/energy-saving-recommendation";
import {BoilerType} from "../boiler-types-service/boiler-type";
import {BoilerTypesService} from "../boiler-types-service/boiler-types.service";
import * as parse from "url-parse";
import sortBy from "lodash-es/sortBy";
import {EpcApiService} from "../../shared/postcode-epc-service/epc-api-service/epc-api.service";
import {EnergySavingMeasureContentService} from "../../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";

@Component({
    selector: 'app-boiler-epc-replace',
    templateUrl: './boiler-epc-replace.component.html',
    styleUrls: ['./boiler-epc-replace.component.scss']
})
export class BoilerEpcReplaceComponent implements OnInit {
    lmkKey: string;
    loading: boolean = true;
    recommendations: EpcRecommendation[];
    boilerTypes: BoilerType[];

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
                EnergySavingMeasureContentService.measureIcons['G'],
            ),
        },
        {
            code: 'C',
            measure: new EnergySavingRecommendation(
                15,
                85,
                undefined,
                undefined,
                undefined,
                undefined,
                EnergySavingMeasureContentService.measureIcons['C'],
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
                private recommendationService: EnergySavingMeasureContentService,
                private boilerTypesService: BoilerTypesService,
                private route: ActivatedRoute) {
        this.lmkKey = this.route.snapshot.paramMap.get('lmkKey');
    }

    ngOnInit() {
        Observable.forkJoin(
            this.epcApiService.getRecommendationsForLmkKey(this.lmkKey),
            this.recommendationService.fetchMeasureDetails(),
            this.boilerTypesService.fetchBoilerTypes(),
        )
            .subscribe(
                ([epcRecommendations, recommendationDetails, boilerTypes]) => {
                    this.handleEpcRecommendationsResponse(epcRecommendations);
                    this.handleRecommendationDetailsResponse(recommendationDetails);
                    this.boilerTypes = sortBy(boilerTypes, type => +(type.installationCostLower));
                },
                () => this.handleError(),
                () => this.loading = false,
            );
    }

    private handleEpcRecommendationsResponse(response) {
        this.recommendations = response;
    }

    private handleRecommendationDetailsResponse(response) {
        this.staticPartialMeasuresWithCodes.forEach(measureAndCode => {
            if (measureAndCode.code !== undefined) {
                const measureDetails = response.find(measure => measure.acf.rdsap_measure_code === measureAndCode.code);
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
        this.loading = false;
    }

    boilerNeedsReplacing() {
        return this.recommendations && this.recommendations.some(rec => rec.isBoilerReplacement());
    }
}
