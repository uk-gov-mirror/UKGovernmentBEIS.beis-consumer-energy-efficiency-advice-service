import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WordpressApiService {
    private static readonly WORDPRESS_API_ROOT = '/wp-json/';

    constructor(private http: HttpClient, private location: Location) {
    }

    getFullApiEndpoint(path: string): string {
        return this.location.prepareExternalUrl(WordpressApiService.WORDPRESS_API_ROOT + path);
    }

    getPostByType<T>(urlPath: string, slug: string): Observable<T> {
        const params = new HttpParams().set('per_page', '1').set('slug', slug);
        return this.http.get<T[]>(this.getFullApiEndpoint(urlPath), {params: params})
            .map(posts => posts.length === 1 ? posts[0] : null);
    }
}
