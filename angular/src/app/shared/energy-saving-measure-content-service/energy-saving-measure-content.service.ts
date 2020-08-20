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

        H: 'icons/heating.svg',
        T: 'icons/hotwater.svg',
        T2: 'icons/hotwater.svg',
        R: 'icons/hotwater.svg',
        J: 'icons/hotwater.svg',
        M: 'icons/heating.svg',
        Z3: 'icons/heating.svg',
        EP: 'icons/heating.svg',
        Y2: 'icons/hotwater.svg',
        O2: 'icons/windows.svg',
        V2: 'icons/green.svg',
        'park_home_insulation': 'icons/warm-home.svg',

        // Heating and Hotwater
        Y: 'icons/hotwater.svg',
        N: 'icons/hotwater.svg',
        Z4: 'icons/heating.svg',
        Z1: 'icons/heating.svg',
        L2: 'icons/heating.svg',
        L: 'icons/heating.svg',
        K: 'icons/heating.svg',
        S: 'icons/heating.svg',
        I: 'icons/heating.svg',
        G: 'icons/heating.svg',
        F: 'icons/heating.svg',
        C: 'icons/heating.svg',

        // Windows and Doors
        X: 'icons/doors.svg',
        P: 'icons/windows.svg',
        O3: 'icons/windows.svg',
        O: 'icons/windows.svg',
        D: 'icons/windows.svg',

        // Floors, Walls, Roofs
        W2: 'icons/flooring.svg',
        W1: 'icons/flooring.svg',
        B4: 'icons/walls.svg',
        Q: 'icons/walls.svg',
        Q1: 'icons/walls.svg',
        Q2: 'icons/walls.svg',
        B: 'icons/walls.svg',
        A3: 'icons/roofing.svg',
        A2: 'icons/roofing.svg',
        A: 'icons/roofing.svg',

        // Solar Energy
        U: 'icons/solar.svg',

        // Simple Savings
        'baths_to_showers': 'icons/simple-savings.svg',
        'one_degree_reduction': 'icons/simple-savings.svg',
        'tumble_drying': 'icons/simple-savings.svg',
        'low_energy_lights': 'icons/simple-savings.svg',
        E2: 'icons/simple-savings.svg',
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
