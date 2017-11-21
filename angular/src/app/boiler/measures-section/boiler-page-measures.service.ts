import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import * as parse from "url-parse";
import {EnergySavingMeasure} from "../../shared/recommendation-card/energy-saving-recommendation";
import {MeasureService} from "../../shared/recommendation-service/measure.service";
import {MeasureMetadataResponse} from "../../shared/recommendation-service/measure-metadata-response";


@Injectable()
export class BoilerPageMeasuresService {

    private static readonly partialMeasuresToShowOnBoilerPages: {code: string, measure: EnergySavingMeasure}[] = [
        {
            code: 'G',
            measure: new EnergySavingMeasure(
                80,
                10,
                undefined,
                undefined,
                undefined,
                undefined,
                MeasureService.measureIcons['G'],
            ),
        },
        {
            code: 'C',
            measure: new EnergySavingMeasure(
                15,
                85,
                undefined,
                undefined,
                undefined,
                undefined,
                MeasureService.measureIcons['C'],
            ),
        },
        {
            code: undefined,
            measure: new EnergySavingMeasure(
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

    constructor(private measuresService: MeasureService) {
    }

    private combinedMeasure(partialMeasure: EnergySavingMeasure, apiResponse: MeasureMetadataResponse) {
        if (apiResponse !== undefined) {
            return {
                ...partialMeasure,
                readMoreRoute: parse(apiResponse.acf.featured_page).pathname,
                headline: apiResponse.acf.headline,
                summary: apiResponse.acf.summary,
            };
        } else {
            return partialMeasure;
        }
    }

    fetchMeasuresForBoilerPages(): Observable<EnergySavingMeasure[]> {
        return this.measuresService.fetchMeasureDetails().map(measures =>
            BoilerPageMeasuresService.partialMeasuresToShowOnBoilerPages.map(measureAndCode => {
                if (measureAndCode.code !== undefined) {
                    const measureResponse = measures.find(measure => measure.acf.rdsap_measure_code === measureAndCode.code);
                    return this.combinedMeasure(measureAndCode.measure, measureResponse);
                } else {
                    return measureAndCode.measure;
                }
            })
        );
    }
}