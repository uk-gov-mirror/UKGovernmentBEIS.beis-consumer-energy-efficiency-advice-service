import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {MeasureContent} from '../energy-saving-measure-content-service/measure-content';
import {WordpressMeasure} from './wordpress-measure';

@Injectable()
export class WordpressMeasuresService {
    private static readonly measuresEndpoint = 'wp/v2/measure';

    private measures: {[slug: string]: Observable<WordpressMeasure>} = {};

    constructor(private wordpressApiService: WordpressApiService) {
    }

    searchMeasures(searchText: string): Observable<WordpressMeasure[]> {
        return this.wordpressApiService.searchPosts<MeasureContent>(WordpressMeasuresService.measuresEndpoint, searchText)
            .map(measureResponses => measureResponses.map(measureResponse => new WordpressMeasure(measureResponse)));
    }

    getMeasure(slug: string): Observable<WordpressMeasure> {
        if (!this.measures[slug]) {
            this.measures[slug] = this.wordpressApiService.getPost<MeasureContent>(WordpressMeasuresService.measuresEndpoint, slug)
                .map(measure => measure ? new WordpressMeasure(measure) : null)
                .shareReplay(1);
        }
        return this.measures[slug];
    }
}
