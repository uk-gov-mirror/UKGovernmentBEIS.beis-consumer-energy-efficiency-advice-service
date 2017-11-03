import * as parse from "url-parse";

export abstract class UrlParser {
    public static getUrlPath(url: string) {
        return parse(url).pathname;
    }
}