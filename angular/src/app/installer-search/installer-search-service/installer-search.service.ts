import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {InstallerContent} from "./installer-content";
import {Location} from '@angular/common';
import Config from '../../config';


@Injectable()
export class InstallerSearchService {

    public static installerCodes: { [measureCode: string]: number } = {
        // Energy efficiency measures

        // H: 'icons/heating.svg',
        // T: 'icons/hotwater.svg',
        // T2: 'icons/hotwater.svg',
        // R: 'icons/hotwater.svg',
        // J: 'icons/hotwater.svg',
        // M: 'icons/heating.svg',
        // Z3: 'icons/heating.svg',
        // EP: 'icons/heating.svg',
        // Y2: 'icons/hotwater.svg',
        // O2: 'icons/windows.svg',
        // V2: 'icons/green.svg',
        //
        // // Heating and Hotwater
        // Y: 'icons/hotwater.svg',
        // N: 'icons/hotwater.svg',
        // Z4: 'icons/heating.svg',
        Z1: 186
        // L2: 'icons/heating.svg',
        // L: 'icons/heating.svg',
        // K: 'icons/heating.svg',
        // S: 'icons/heating.svg',
        // I: 'icons/heating.svg',
        // G: 'icons/heating.svg',
        // F: 'icons/heating.svg',
        // C: 'icons/heating.svg',
        //
        // // Windows and Doors
        // X: 'icons/doors.svg',
        // P: 'icons/windows.svg',
        // O3: 'icons/windows.svg',
        // O: 'icons/windows.svg',
        // D: 'icons/windows.svg',
        //
        // // Floors, Walls, Roofs
        // W2: 'icons/flooring.svg',
        // W1: 'icons/flooring.svg',
        // B4: 'icons/walls.svg',
        // Q: 'icons/walls.svg',
        // Q1: 'icons/walls.svg',
        // Q2: 'icons/walls.svg',
        // B: 'icons/walls.svg',
        // A3: 'icons/roofing.svg',
        // A2: 'icons/roofing.svg',
        // A: 'icons/roofing.svg',
        //
        // // Solar Energy
        // U: 'icons/solar.svg',
        //
        // // Simple Savings
        // 'baths_to_showers': 'icons/simple-savings.svg',
        // 'one_degree_reduction': 'icons/simple-savings.svg',
        // 'tumble_drying': 'icons/simple-savings.svg',
        // 'low_energy_lights': 'icons/simple-savings.svg',
        // E2: 'icons/simple-savings.svg',

    };
    private static readonly INSTALLER_API_ROOT = '/api/';
    private installers: Observable<InstallerContent[]>;
    private apiKey: string = 'kcibn1gz9v1f4l8bgc4h';

    constructor(private http: HttpClient, private location: Location) {
    }

    fetchInstallerDetails(postcode: string, measureCode: string): Observable<InstallerContent[]> {
        console.log("hi2");
        const params = new HttpParams()
            .set('per_page', '1000');
        this.installers = this.http.get<InstallerContent[]>('http://greendealorb.designamite.info/api/',
            {params: params})
            .shareReplay(1);
        console.log(this.installers);
        return this.installers;
    }

    private getFullApiEndpoint(path?: string): string {
        if (path) {
            const encodedPath = encodeURIComponent(path);
            return this.location.prepareExternalUrl(InstallerSearchService.INSTALLER_API_ROOT + encodedPath);
        }
        console.log( this.location.prepareExternalUrl(InstallerSearchService.INSTALLER_API_ROOT))
        return this.location.prepareExternalUrl(InstallerSearchService.INSTALLER_API_ROOT);
    }
}
