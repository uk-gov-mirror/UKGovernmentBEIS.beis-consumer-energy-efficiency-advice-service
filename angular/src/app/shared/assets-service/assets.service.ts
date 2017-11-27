import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AssetsService {
    private static readonly ASSETS_ROOT = '/wp-content/themes/angular-theme/dist/assets/';

    constructor(private location: Location,
                private http: HttpClient) {
    }

    getAsset(path: string): Observable<any> {
        return this.http.get(this.location.prepareExternalUrl(AssetsService.ASSETS_ROOT + path));
    }
}
