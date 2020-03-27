import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResponseData} from "../shared/response-data/response-data";
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {InstallerSearchService} from "./installer-search-service/installer-search.service";
import sortBy from 'lodash-es/sortBy';
import {PageTitleService} from "../shared/page-title-service/page-title.service";

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
    errorMessage = null;

    constructor(private route: ActivatedRoute,
                private responseData: ResponseData,
                private measureContentService: EnergySavingMeasureContentService,
                private installerSearchService: InstallerSearchService,
                private pageTitle: PageTitleService) {
    }

    get error() {
        return !!this.errorMessage;
    }

    ngOnInit() {
        this.pageTitle.set('Find an installer');
        this.postcode = this.responseData.postcode && this.responseData.postcode.toUpperCase();
        this.route.params.subscribe(params => {
                this.measureContentService.fetchMeasureDetails().subscribe(measures => {
                    this.measures = measures.filter(measure => measure.acf.installer_code);
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
            this.errorMessage = null;
            this.loading = true;
            this.installerSearchService.fetchInstallerDetails(this.postcode, this.selectedMeasure.acf.installer_code)
                .subscribe(installers => {
                    this.installers = installers;
                    this.loading = false;
                    this.searchButtonClicked = true;
                }, error => {
                    this.errorMessage = error.toString().replace('Error: ', '') + '.';
                });
        } else {
            const messageParts = [];
            if (!this.postcode) {
                // Matches the message from the API if postcode is invalid.
                messageParts.push('No valid postcode supplied.');
            }
            if (!this.selectedMeasure) {
                messageParts.push('No measure selected.');
            }
            this.errorMessage = messageParts.join(' ');
        }
    }
}
