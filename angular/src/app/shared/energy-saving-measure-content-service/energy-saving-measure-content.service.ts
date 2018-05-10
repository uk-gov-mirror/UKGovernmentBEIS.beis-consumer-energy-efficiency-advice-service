import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {WordpressApiService} from '../../shared/wordpress-api-service/wordpress-api-service';
import {MeasureContent} from './measure-content';

@Injectable()
export class EnergySavingMeasureContentService {

    public static FALLBACK_MEASURE_ICON: string = 'icons/green.svg';

    public static measureIcons: { [rdsapMeasureCode: string]: string } = {
        // Energy efficiency measures
        A: 'icons/loft.svg',
        A2: 'icons/loft.svg',
        A3: 'icons/loft.svg',
        B: 'icons/wall.svg',
        Q2: 'icons/wall.svg',
        B4: 'icons/wall.svg',
        Q: 'icons/wall.svg',
        Q1: 'icons/wall.svg',
        W1: 'icons/wall.svg',
        W2: 'icons/wall.svg',
        D: 'icons/window.svg',
        E2: 'icons/lightbulb.svg',
        C: 'icons/heat.svg',
        F: 'icons/thermostat.svg',
        G: 'icons/heat.svg',
        H: 'icons/heat.svg',
        I: 'icons/water-blue.svg',
        S: 'icons/water-blue.svg',
        T: 'icons/water-blue.svg',
        T2: 'icons/water-blue.svg',
        R: 'icons/water-blue.svg',
        J: 'icons/water-blue.svg',
        K: 'icons/water-blue.svg',
        L: 'icons/heat.svg',
        L2: 'icons/heat.svg',
        M: 'icons/heat.svg',
        Z1: 'icons/heat.svg',
        Z3: 'icons/heat.svg',
        Z4: 'icons/heat.svg',
        EP: 'icons/heat.svg',
        N: 'icons/solar.svg',
        Y: 'icons/water-blue.svg',
        Y2: 'icons/water-blue.svg',
        O: 'icons/window.svg',
        O2: 'icons/window.svg',
        O3: 'icons/window.svg',
        P: 'icons/window.svg',
        X: 'icons/door.svg',
        U: 'icons/solar.svg',
        V2: 'icons/green.svg',

        // Simple Savings
        'baths_to_showers': 'icons/simple-savings.svg',
        'one_degree_reduction': 'icons/simple-savings.svg',
        'tumble_drying': 'icons/simple-savings.svg',
        'low_energy_lights': 'icons/simple-savings.svg'
    };
    private static readonly measuresEndpoint = 'acf/v3/measure?';
    private measures: Observable<MeasureContent[]>;
    private measuresByTag: { [tag: string]: Observable<MeasureContent[]> };

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
        this.measuresByTag = {};
    }

    fetchMeasureDetails(): Observable<MeasureContent[]> {
        const params = new HttpParams()
            .set('per_page', '1000');
        if (!this.measures) {
            this.measures = this.http.get<MeasureContent[]>(
                this.wordpressApiService.getFullApiEndpoint(EnergySavingMeasureContentService.measuresEndpoint), {params: params})
                .shareReplay(1);
        }
        return this.measures;
    }

    fetchMeasureDetailsForLandingPage(tag: string, numberOfMeasures: number): Observable<MeasureContent[]> {
        if (!this.measuresByTag[tag]) {
            const params = new HttpParams()
                .set('tag', tag)
                .set('per_page', numberOfMeasures.toString())
                .set('orderby', 'date')
                .set('order', 'desc');
            this.measuresByTag[tag] = this.http.get<MeasureContent[]>(
                this.wordpressApiService.getFullApiEndpoint(
                    EnergySavingMeasureContentService.measuresEndpoint), {params: params})
                .shareReplay(1);
        }
        return this.measuresByTag[tag];
    }
}
