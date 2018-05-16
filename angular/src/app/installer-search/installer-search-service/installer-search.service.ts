import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {InstallerContent} from "./installer-content";
import {Location} from '@angular/common';
import Config from '../../config';


@Injectable()
export class InstallerSearchService {
    private static readonly INSTALLER_API_ROOT = '/api/installers';
    private installers: Observable<InstallerContent[]>;

    constructor(private http: HttpClient, private location: Location) {
    }

    fetchInstallerDetails(postcode: string, installerCode: string): Observable<InstallerContent[]> {
        this.installers = this.http.get<InstallerContent[]>
            (this.getFullApiEndpoint("/" + postcode + "/" + installerCode))
            .shareReplay(1);
        console.log(this.installers);
        return this.installers;
    }

    private getFullApiEndpoint(path?: string): string {
        if (path) {
            return this.location.prepareExternalUrl(InstallerSearchService.INSTALLER_API_ROOT + path);
        }
        return this.location.prepareExternalUrl(InstallerSearchService.INSTALLER_API_ROOT);
    }
}
