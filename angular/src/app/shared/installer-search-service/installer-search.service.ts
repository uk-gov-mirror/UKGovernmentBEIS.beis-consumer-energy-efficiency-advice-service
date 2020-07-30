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

    fetchInstallerDetails(postcode: string, tradeCodes: string[], page: number = 1): Observable<InstallerResponse> {
        if (!postcode || !tradeCodes || tradeCodes.length === 0) {
            return;
        }
        const root = InstallerSearchService.INSTALLER_API_ROOT;
        const postcodeComponent = encodeURIComponent(this.formatPostcode(postcode));
        const url = this.location.prepareExternalUrl(
            `${root}/${postcodeComponent}?tradecodes=${tradeCodes.map(encodeURIComponent).join(',')}&page=${page}`
        );

        // TODO SEA-??: Remove this .map when the response actually has phone numbers/email addresses
        return this.http.get<InstallerResponse>(url).map((response) => ({
            ...response,
            data: response.data.map((installer) => ({
                ...installer,
                phoneNumber: '020 7925 0918',
                email: 'person@installer.co.uk',
            })),
        }));
    }

    // The second half of a postcode always consists of three characters
    private formatPostcode(postcode: string) {
        const stripped = postcode.replace(' ', '');
        return `${stripped.slice(0, -3)} ${stripped.slice(-3)}`;
    }
}

