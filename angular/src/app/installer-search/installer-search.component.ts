import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseData} from "../shared/response-data/response-data";
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {InstallerSearchService} from "./installer-search-service/installer-search.service";

@Component({
    selector: 'app-installer-search',
    templateUrl: './installer-search.component.html',
    styleUrls: ['./installer-search.component.scss']
})
export class InstallerSearchComponent implements OnInit {

    measures = [];
    selectedMeasure = null;
    postcode = null;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private responseData: ResponseData,
                private measureContentService: EnergySavingMeasureContentService,
                private installerSearchService: InstallerSearchService) {
    }

    ngOnInit() {
        this.postcode = this.responseData.postcode;
        this.route.params.subscribe(params => {

                this.measureContentService.fetchMeasureDetails().subscribe(measures => {
                    this.measures = measures;

                    if (params["measure-code"]) {
                        const chosenMeasure = (measures.filter(measure => params["measure-code"] === measure.acf.measure_code))[0];
                        if (chosenMeasure) {
                            this.selectedMeasure = chosenMeasure;
                        } else {
                            this.router.navigate(['/installer-search']);
                        }
                    }
                });
            }
        );
    }

    submit() {
        if (this.selectedMeasure) {
            console.log("hi");
            this.installerSearchService.fetchInstallerDetails(this.postcode, this.selectedMeasure.acf.measure_code)
                .subscribe(installers => {
                    console.log(installers);
                });
        }
    }
}
