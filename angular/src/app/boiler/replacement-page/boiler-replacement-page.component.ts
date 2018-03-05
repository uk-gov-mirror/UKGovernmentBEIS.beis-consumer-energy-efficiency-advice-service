import {Component, OnInit} from '@angular/core';
import {BoilerTypesService} from '../boiler-types-service/boiler-types.service';
import {BoilerType} from '../boiler-types-service/boiler-type';
import sortBy from 'lodash-es/sortBy';

@Component({
    selector: 'app-boiler-replacement-page',
    templateUrl: './boiler-replacement-page.component.html',
    styleUrls: ['./boiler-replacement-page.component.scss']
})
export class BoilerReplacementPageComponent implements OnInit {

    loading: boolean = true;
    error: boolean = false;
    boilers: BoilerType[];

    constructor(private boilerTypesService: BoilerTypesService) {
    }

    ngOnInit() {
        this.boilerTypesService.fetchBoilerTypes().subscribe(
            boilerTypes => this.boilers = sortBy(boilerTypes, type => +(type.averageInstallationCost)),
            err => this.handleError(err),
            () => this.loading = false,
        );
    }

    private handleError(err) {
        console.error(err);
        this.error = true;
        this.loading = false;
    }

}
