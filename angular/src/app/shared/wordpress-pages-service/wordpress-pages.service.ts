import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {WordpressPage} from './wordpress-page';
import {WordpressPageResponse} from './wordpress-page-response';
import {ExtendedWordpressPage} from './extended-wordpress-page';

@Injectable()
export class WordpressPagesService {
    private static readonly pagesEndpoint = 'wp/v2/pages';

    private topLevelPages: Observable<WordpressPage[]>;
    private latestPages: Observable<WordpressPage[]>;
    private pages: {[slug: string]: Observable<ExtendedWordpressPage>} = {};

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    searchPages(searchText: string): Observable<WordpressPage[]> {
        return this.wordpressApiService.searchPosts<WordpressPageResponse>(WordpressPagesService.pagesEndpoint, searchText)
            .map(pageResponses => pageResponses.map(pageResponse => new WordpressPage(pageResponse)));
    }

    getTopLevelPages(): Observable<WordpressPage[]> {
        if (!this.topLevelPages) {
            const params = new HttpParams().set('parent', '0').set('context', 'embed');
            const endpoint = this.wordpressApiService.getFullApiEndpoint(WordpressPagesService.pagesEndpoint);
            this.topLevelPages = this.http.get(endpoint, {params: params})
                .map((pageResponses: WordpressPageResponse[]) => pageResponses.map(pageResponse => new WordpressPage(pageResponse)))
                .shareReplay(1);
        }
        return this.topLevelPages;
    }

    getLatestPages(): Observable<WordpressPage[]> {
        if (!this.latestPages) {
            const params = new HttpParams().set('per_page', '4')
                .set('orderby', 'date')
                .set('order', 'desc')
                .set('context', 'embed');
            const endpoint = this.wordpressApiService.getFullApiEndpoint(WordpressPagesService.pagesEndpoint);
            this.latestPages = this.http.get(endpoint, {params: params})
                .map((pageResponses: WordpressPageResponse[]) => pageResponses.map(pageResponse => new WordpressPage(pageResponse)))
                .shareReplay(1);
        }
        return this.latestPages;
    }

    getPage(slug: string): Observable<ExtendedWordpressPage> {
        if (!this.pages[slug]) {
            this.pages[slug] = this.wordpressApiService.getPost<WordpressPageResponse>(WordpressPagesService.pagesEndpoint, slug)
                .map(page => page ? new ExtendedWordpressPage(page) : null)
                .shareReplay(1);
        }
        return this.pages[slug];
    }
}
