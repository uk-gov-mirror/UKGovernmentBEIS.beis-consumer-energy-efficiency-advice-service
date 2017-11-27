import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import * as parse from "url-parse";
import {EnergySavingRecommendation} from "../../shared/recommendation-card/energy-saving-recommendation";
import {EnergySavingMeasureContentService} from "../../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {MeasureContent} from "../../shared/energy-saving-measure-content-service/measure-content";


@Injectable()
export class BoilerPageMeasuresService {

    private static readonly partialMeasuresToShowOnBoilerPages: {code: string, measure: EnergySavingRecommendation}[] = [
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

    constructor(private measuresService: EnergySavingMeasureContentService) {
    }

    private static combinedMeasure(partialMeasure: EnergySavingRecommendation, measureContent: MeasureContent) {
        if (measureContent !== undefined) {
            return {
                ...partialMeasure,
                readMoreRoute: parse(measureContent.featured_page).pathname,
                headline: measureContent.headline,
                summary: measureContent.summary,
            };
        } else {
            return partialMeasure;
        }
    }

    fetchMeasuresForBoilerPages(): Observable<EnergySavingRecommendation[]> {
        return this.measuresService.fetchMeasureDetails().map(measures =>
            BoilerPageMeasuresService.partialMeasuresToShowOnBoilerPages.map(measureAndCode => {
                if (measureAndCode.code !== undefined) {
                    const measureResponse = measures.find(measure => measure.measure_code === measureAndCode.code);
                    return BoilerPageMeasuresService.combinedMeasure(measureAndCode.measure, measureResponse);
                } else {
                    return measureAndCode.measure;
                }
            })
        ).shareReplay(1);
    }
}