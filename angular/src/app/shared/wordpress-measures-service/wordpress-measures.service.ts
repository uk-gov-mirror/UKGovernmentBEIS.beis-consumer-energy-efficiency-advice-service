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
    // TODO:BEISDEAS-170 Add searching method

    getMeasure(slug: string): Observable<WordpressMeasure> {
        if (!this.measures[slug]) {
            this.measures[slug] = this.wordpressApiService.getPostByType<MeasureContent>(WordpressMeasuresService.measuresEndpoint, slug)
                .map(measure => measure ? new WordpressMeasure(measure, slug) : null)
                .shareReplay(1);
        }
        return this.measures[slug];
    }
}
