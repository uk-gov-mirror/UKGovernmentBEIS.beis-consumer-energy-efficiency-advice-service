import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {InstallerResponse} from './installer-response';
import {Location} from '@angular/common';
import {maxBy} from 'lodash';

@Injectable()
export class InstallerSearchService {
    private static readonly INSTALLER_API_ROOT = '/api/installers';
    private static readonly TRUSTMARK_SEARCH_URL = 'https://www.trustmark.org.uk/find-a-tradesman';

    constructor(private http: HttpClient, private location: Location) {
    }

    static getTrustmarkInstallerListUrl(postcode: string, tradeCodes: string[]) {
        const formattedPostcode = encodeURIComponent(InstallerSearchService.formatPostcode(postcode));
        // We take the highest tradecode because Trustmark don't support multiple trade codes yet
        const tradeCode = encodeURIComponent(maxBy(tradeCodes, parseInt));
        return `${InstallerSearchService.TRUSTMARK_SEARCH_URL}?postCode=${formattedPostcode}&tradeCode=${tradeCode}`;
    }

    fetchInstallerDetails(postcode: string, tradeCodes: string[]): Observable<InstallerResponse> {
        if (!postcode || !tradeCodes || tradeCodes.length === 0) {
            return;
        }
        const root = InstallerSearchService.INSTALLER_API_ROOT;
        const postcodeComponent = encodeURIComponent(InstallerSearchService.formatPostcode(postcode));
        const url = this.location.prepareExternalUrl(
            `${root}/${postcodeComponent}?tradecodes=${tradeCodes.map(encodeURIComponent).join(',')}`
        );

        return this.http.get<InstallerResponse>(url).map(response => ({
            ...response,
            data: response.data.filter(installer => installer.distanceInMiles <= 30)
        }));
    }

    // The second half of a postcode always consists of three characters
    private static formatPostcode(postcode: string) {
        const stripped = postcode.replace(' ', '');
        return `${stripped.slice(0, -3)} ${stripped.slice(-3)}`;
    }
}

