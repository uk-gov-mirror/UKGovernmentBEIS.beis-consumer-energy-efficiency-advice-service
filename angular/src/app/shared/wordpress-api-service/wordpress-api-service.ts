import {Location} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable()
export class WordpressApiService {
    private static readonly WORDPRESS_API_ROOT = '/wp-json/';

    constructor(private location: Location) {
    }

    getFullApiEndpoint(path: string): string {
        return this.location.prepareExternalUrl(WordpressApiService.WORDPRESS_API_ROOT + path);
    }
}
