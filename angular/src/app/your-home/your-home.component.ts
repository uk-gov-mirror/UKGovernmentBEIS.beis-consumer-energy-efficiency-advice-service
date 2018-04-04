import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {MeasureContent} from '../shared/energy-saving-measure-content-service/measure-content';
import {EnergySavingMeasureContentService} from '../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';

@Component({
    selector: 'app-your-home',
    templateUrl: './your-home.component.html',
    styleUrls: ['./your-home.component.scss']
})
export class YourHomeComponent implements OnInit {

    tag: string;
    isLoading: boolean;
    isError: boolean;
    measures: String[];

    constructor(private route: ActivatedRoute,
                private measureService: EnergySavingMeasureContentService) {
    }

    ngOnInit() {
        this.measureService.fetchMeasureDetails()
            .subscribe(
                measures => this.measures = measures.map(measure => measure.acf.headline)
            );

        this.route.paramMap.subscribe(params => {
            this.tag = params.get('tag');
        });
    }
}
