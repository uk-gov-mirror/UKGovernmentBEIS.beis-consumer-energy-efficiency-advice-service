import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../wordpress-api-service/wordpress-api-service";
import {WordpressPage} from "./wordpress-page";
import {WordpressPageResponse} from "./wordpress-page-response";

@Injectable()
export class WordpressPagesService {
    private static readonly pagesEndpoint = 'wp/v2/pages';

    private topLevelPages: Observable<WordpressPage[]>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    searchPages(searchText: string): Observable<WordpressPage[]> {
        const params = new HttpParams().set('search', searchText);
        const endpoint = this.wordpressApiService.getFullApiEndpoint(WordpressPagesService.pagesEndpoint);
        return this.http.get(endpoint, {params: params})
            .map((pageResponses: WordpressPageResponse[]) => pageResponses.map(pageResponse => new WordpressPage(pageResponse)));
    }

    fetchTopLevelPages(): Observable<WordpressPage[]> {
        if (!this.topLevelPages) {
            const params = new HttpParams().set('parent', '0');
            const endpoint = this.wordpressApiService.getFullApiEndpoint(WordpressPagesService.pagesEndpoint);
            this.topLevelPages = this.http.get(endpoint, {params: params})
                .map((pageResponses: WordpressPageResponse[]) => pageResponses.map(pageResponse => new WordpressPage(pageResponse)))
                .shareReplay(1);
        }
        return this.topLevelPages;
    }
}
