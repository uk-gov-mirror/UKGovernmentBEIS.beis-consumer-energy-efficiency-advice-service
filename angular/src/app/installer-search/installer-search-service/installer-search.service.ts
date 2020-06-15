import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {InstallerResponse} from './installer-response';
import {Location} from '@angular/common';

@Injectable()
export class InstallerSearchService {
    private static readonly INSTALLER_API_ROOT = '/api/installers';

    constructor(private http: HttpClient, private location: Location) {
    }

    fetchInstallerDetails(postcode: string, tradeCode: string, page: number = 1): Observable<InstallerResponse> {
        if (!postcode || !tradeCode) {
            return;
        }
        const root = InstallerSearchService.INSTALLER_API_ROOT;
        const postcodeComponent = encodeURIComponent(postcode);
        const tradeCodeComponent = encodeURIComponent(tradeCode);
        const url = this.location.prepareExternalUrl(
            `${root}/${postcodeComponent}/${tradeCodeComponent}?page=${page}`
        );
        return this.http.get<InstallerResponse>(url).map(body => {
            if (body && body.errorMessage) {
                throw new Error(body.errorMessage);
            } else {
                return body;
            }
        });
    }
}
