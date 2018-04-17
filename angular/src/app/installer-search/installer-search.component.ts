import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResponseData} from "../shared/response-data/response-data";
import {RecommendationsService} from "../shared/recommendations-service/recommendations.service";
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";

@Component({
    selector: 'app-installer-search',
    templateUrl: './installer-search.component.html',
    styleUrls: ['./installer-search.component.scss']
})
export class InstallerSearchComponent implements OnInit {

    measureName = null;
    postcode = null;

    constructor(private route: ActivatedRoute,
                private responseData: ResponseData,
                private measureContentService: EnergySavingMeasureContentService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params["measure-code"]) {
                this.postcode = this.responseData.postcode;
                this.measureContentService.fetchMeasureDetails().subscribe(measures => {
                    const chosenMeasure = (measures.filter(measure => params["measure-code"] === measure.acf.measure_code))[0];
                    this.measureName = chosenMeasure.acf.headline;
                });
            }
        });
    }
}
