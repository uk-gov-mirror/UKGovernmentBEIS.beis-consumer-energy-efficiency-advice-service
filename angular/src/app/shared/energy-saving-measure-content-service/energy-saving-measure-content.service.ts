import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../../shared/wordpress-api-service/wordpress-api-service";
import {MeasureContent} from "./measure-content";

@Injectable()
export class EnergySavingMeasureContentService {
    private static readonly measuresEndpoint = 'acf/v3/measure?per_page=1000';
    private measures: Observable<MeasureContent[]>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    fetchMeasureDetails(): Observable<MeasureContent[]> {
        if (!this.measures) {
            this.measures = this.http.get(this.wordpressApiService.getFullApiEndpoint(EnergySavingMeasureContentService.measuresEndpoint))
                .shareReplay(1);
        }
        return this.measures;
    }

    public static FALLBACK_MEASURE_ICON: string = 'icons/green.svg';

    public static measureIcons: { [rdsapMeasureCode: string]: string } = {
        // Energy efficiency measures
        A:  'icons/loft.svg',
        A2: 'icons/loft.svg',
        A3: 'icons/loft.svg',
        B:  'icons/wall.svg',
        Q2: 'icons/wall.svg',
        B4: 'icons/wall.svg',
        Q:  'icons/wall.svg',
        Q1: 'icons/wall.svg',
        W1: 'icons/wall.svg',
        W2: 'icons/wall.svg',
        D:  'icons/window.svg',
        E2: 'icons/lightbulb.svg',
        C:  'icons/heat.svg',
        F:  'icons/thermostat.svg',
        G:  'icons/heat.svg',
        H:  'icons/heat.svg',
        I:  'icons/water.svg',
        S:  'icons/water.svg',
        T:  'icons/water.svg',
        T2: 'icons/water.svg',
        R:  'icons/water.svg',
        J:  'icons/water.svg',
        K:  'icons/water.svg',
        L:  'icons/heat.svg',
        L2: 'icons/heat.svg',
        M:  'icons/heat.svg',
        Z1: 'icons/heat.svg',
        Z3: 'icons/heat.svg',
        Z4: 'icons/heat.svg',
        EP: 'icons/heat.svg',
        N:  'icons/solar.svg',
        Y:  'icons/water.svg',
        Y2: 'icons/water.svg',
        O:  'icons/window.svg',
        O2: 'icons/window.svg',
        O3: 'icons/window.svg',
        P:  'icons/window.svg',
        X:  'icons/door.svg',
        U:  'icons/solar.svg',
        V2: 'icons/green.svg',
        // Habit measures
        'baths_to_showers':     'icons/shower.svg',
        'one_degree_reduction': 'icons/thermostat.svg'
    };
}
