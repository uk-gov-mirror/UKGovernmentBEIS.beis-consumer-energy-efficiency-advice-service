import * as parse from "url-parse";

export abstract class WordpressPageRoutingService {
    private static readonly wordpressPageRoutePrefix = '/wp-page';

    public static getRouteForWordpressUrl(url: string) {
        return WordpressPageRoutingService.wordpressPageRoutePrefix + parse(url).pathname;
    }
}