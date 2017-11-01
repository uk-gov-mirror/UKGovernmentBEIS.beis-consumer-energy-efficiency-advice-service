import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {WordpressApiService} from '../../wordpress-api-service/wordpress-api-service';
import {WordpressPageResponse} from './wordpress-page-response';

@Injectable()
export class WordpressPagesService {
    private static readonly pagesEndpoint = 'wp/v2/pages';

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    searchPages(searchText: string): Observable<WordpressPageResponse[]> {
        const params = new HttpParams().set('search', searchText);
        const endpoint = this.wordpressApiService.getFullApiEndpoint(WordpressPagesService.pagesEndpoint);
        return this.http.get(endpoint, {params: params});
    }
}