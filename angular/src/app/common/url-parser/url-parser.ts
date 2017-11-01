export abstract class UrlParser {
    public static getUrlPath(url: string) {
        let parser = document.createElement('a');
        parser.href = url;
        return parser.pathname;
    }
}