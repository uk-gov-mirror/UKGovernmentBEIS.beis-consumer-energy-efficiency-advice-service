import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";

import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import {Page} from "./page";
import {WordpressApiService} from "../shared/wordpress-api-service/wordpress-api-service";

@Injectable()
export class PageService {
    private static readonly pagesEndpoint = 'wp/v2/pages';

    private pages: {[slug: string]: Observable<Page>} = {};

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    getPage(slug: string): Observable<Page> {
        if (!this.pages[slug]) {
            const params = new HttpParams().set('per_page', '1').set('slug', slug);
            this.pages[slug] = this.http
                .get(this.wordpressApiService.getFullApiEndpoint(PageService.pagesEndpoint), {params: params})
                .map((pages: Page[]) => pages.length === 1 ? pages[0] : null)
                .shareReplay(1);
        }
        return this.pages[slug];
    }
}
