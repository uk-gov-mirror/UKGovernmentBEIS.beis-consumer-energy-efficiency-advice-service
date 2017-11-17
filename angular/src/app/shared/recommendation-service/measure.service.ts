import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../../shared/wordpress-api-service/wordpress-api-service";
import {MeasureMetadataResponse} from "./measure-metadata-response";

@Injectable()
export class MeasureService {
    private static readonly measuresEndpoint = 'acf/v3/measure?per_page=1000';
    private measures: Observable<MeasureMetadataResponse[]>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    fetchMeasureDetails(): Observable<MeasureMetadataResponse[]> {
        if (!this.measures) {
            this.measures = this.http.get(this.wordpressApiService.getFullApiEndpoint(MeasureService.measuresEndpoint))
                .shareReplay(1);
        }
        return this.measures;
    }

    public static measureIcons: { [rdsapMeasureCode: string]: string } = {
        A:  'icon-roofing',
        A2: 'icon-roofing',
        A3: 'icon-roofing',
        B:  'icon-walls',
        Q2: 'icon-walls',
        B4: 'icon-walls',
        Q:  'icon-walls',
        Q1: 'icon-walls',
        W1: 'icon-walls',
        W2: 'icon-walls',
        D:  'icon-windows',
        E2: 'icon-home',
        C:  'icon-heating',
        F:  'icon-heating',
        G:  'icon-heating',
        H:  'icon-heating',
        I:  'icon-heating',
        S:  'icon-heating',
        T:  'icon-heating',
        T2: 'icon-heating',
        R:  'icon-heating',
        J:  'icon-heating',
        K:  'icon-heating',
        L:  'icon-heating',
        L2: 'icon-heating',
        M:  'icon-heating',
        Z1: 'icon-heating',
        Z3: 'icon-heating',
        Z4: 'icon-heating',
        EP: 'icon-heating',
        N:  'icon-heating',
        Y:  'icon-heating',
        Y2: 'icon-heating',
        O:  'icon-windows',
        O2: 'icon-windows',
        O3: 'icon-windows',
        P:  'icon-windows',
        X:  'icon-doors',
        U:  'icon-home',
        V2: 'icon-home'
    };
}
