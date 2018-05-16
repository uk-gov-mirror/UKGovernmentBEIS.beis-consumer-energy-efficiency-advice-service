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
        this.installers = this.http.get<InstallerContent[]>
            (this.getFullApiEndpoint("/" + postcode.toUpperCase() + "/" + installerCode))
            .shareReplay(1);
        return this.installers;
    }

    private getFullApiEndpoint(path?: string): string {
        if (path) {
            return this.location.prepareExternalUrl(InstallerSearchService.INSTALLER_API_ROOT + path);
        }
        return this.location.prepareExternalUrl(InstallerSearchService.INSTALLER_API_ROOT);
    }
}
