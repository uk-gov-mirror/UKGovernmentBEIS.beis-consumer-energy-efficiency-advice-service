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

    fetchInstallerDetails(postcode: string, installerCode: string): Observable<InstallerResponse> {
        // TODO: Remove test code.
        installerCode = '107';
        if (postcode && postcode !== "") {
            const url = this.location.prepareExternalUrl(InstallerSearchService.INSTALLER_API_ROOT +
                "/" + encodeURIComponent(postcode.toUpperCase()) + "/" + encodeURIComponent(installerCode));
            return this.http.get<InstallerResponse>(url).map(body => {
                if (body && body.errorMessage) {
                    throw new Error(body.errorMessage);
                } else {
                    return body;
                }
            });
        }
    }
}
