import {Component, OnInit} from '@angular/core';
import { Input } from '@angular/core';
import { InstallerInfo } from './installer-info';

@Component({
    selector: 'app-installer-card',
    templateUrl: './installer-card.component.html',
    styleUrls: ['./installer-card.component.scss']
})
export class InstallerCardComponent implements OnInit {
    @Input() installerInfo: InstallerInfo;
    @Input() selectedInstallerId: number;
    constructor() {
    }

    ngOnInit() {
    }
}
