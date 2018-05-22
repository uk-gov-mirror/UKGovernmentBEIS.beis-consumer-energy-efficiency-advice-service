import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {InstallerContent} from "./installer-content";
import {Location} from '@angular/common';

@Injectable()
export class InstallerSearchService {
    private static readonly INSTALLER_API_ROOT = '/api/installers';
    private installers: Observable<InstallerContent[]>;

    constructor(private http: HttpClient, private location: Location) {
    }

    fetchInstallerDetails(postcode: string, installerCode: string): Observable<InstallerContent[]> {
        if (postcode && postcode !== "") {
            const url = this.location.prepareExternalUrl(InstallerSearchService.INSTALLER_API_ROOT +
                "/" + encodeURIComponent(postcode.toUpperCase()) + "/" + encodeURIComponent(installerCode));
            this.installers = this.http.get<any>(url)
                .map(body => {
                    if (body && body.error) {
                        throw new Error(body.error);
                    } else {
                        return body as InstallerContent[];
                    }
                })
                .shareReplay(1);
            return this.installers;
        }
    }
}
