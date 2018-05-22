import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseData} from "../shared/response-data/response-data";
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {InstallerSearchService} from "./installer-search-service/installer-search.service";
import sortBy from 'lodash-es/sortBy';

@Component({
    selector: 'app-installer-search',
    templateUrl: './installer-search.component.html',
    styleUrls: ['./installer-search.component.scss']
})
export class InstallerSearchComponent implements OnInit {

    postcode = null;
    measures = [];
    selectedMeasure = null;
    installers = [];
    searchButtonClicked = false;
    loading = false;
    error = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private responseData: ResponseData,
                private measureContentService: EnergySavingMeasureContentService,
                private installerSearchService: InstallerSearchService) {
    }

    ngOnInit() {
        this.postcode = this.responseData.postcode && this.responseData.postcode.toUpperCase();
        this.route.params.subscribe(params => {
                this.measureContentService.fetchMeasureDetails().subscribe(measures => {
                    this.measures = measures.filter(measure => measure.acf.installer_code !== undefined);
                    this.measures = sortBy(this.measures, [m => m.acf.headline.toUpperCase()]);
                    if (params["measure-code"]) {
                        const chosenMeasure = (measures.filter(measure => params["measure-code"] === measure.acf.measure_code))[0];
                        if (chosenMeasure) {
                            this.selectedMeasure = chosenMeasure;
                        }
                    }
                });
            }
        );
    }

    submit() {
        if (this.selectedMeasure && this.postcode) {
            this.loading = true;
            this.installerSearchService.fetchInstallerDetails(this.postcode, this.selectedMeasure.acf.installer_code)
                .subscribe(installers => {
                    this.installers = installers;
                    this.loading = false;
                    this.searchButtonClicked = true;
                });
        }
    }
}
