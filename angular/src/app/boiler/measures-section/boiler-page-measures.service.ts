import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {EnergySavingRecommendation} from '../../shared/recommendation-card/energy-saving-recommendation';
import {EnergySavingMeasureContentService} from '../../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';
import {MeasureContent} from '../../shared/energy-saving-measure-content-service/measure-content';


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
            code: 'one_degree_reduction',
            measure: new EnergySavingRecommendation(
                0,
                120,
                undefined,
                undefined,
                'Drop the thermostat by 1 degree',
                undefined,
                'icons/thermostat.svg',
            ),
        },
    ];

    constructor(private measuresService: EnergySavingMeasureContentService) {
    }

    fetchMeasuresForBoilerPages(): Observable<EnergySavingRecommendation[]> {
        return this.measuresService.fetchMeasureDetails().map(measures =>
            BoilerPageMeasuresService.partialMeasuresToShowOnBoilerPages.map(measureAndCode => {
                if (measureAndCode.code !== undefined) {
                    const measureResponse = measures.find(measure => measure.acf.measure_code === measureAndCode.code);
                    return BoilerPageMeasuresService.combinedMeasure(measureAndCode.measure, measureResponse);
                } else {
                    return measureAndCode.measure;
                }
            })
        ).shareReplay(1);
    }

    private static combinedMeasure(partialMeasure: EnergySavingRecommendation, measureContent: MeasureContent) {
        if (measureContent !== undefined) {
            return {
                ...partialMeasure,
                readMoreRoute: '/measures/' + encodeURIComponent(measureContent.slug),
                headline: measureContent.acf.headline,
                summary: measureContent.acf.summary,
            };
        } else {
            return partialMeasure;
        }
    }
}
