import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {EnergySavingMeasureContentService} from '../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';
import {MeasureContent} from "../shared/energy-saving-measure-content-service/measure-content";
import * as log from 'loglevel';

@Component({
    selector: 'app-your-home',
    templateUrl: './your-home.component.html',
    styleUrls: ['./your-home.component.scss']
})
export class YourHomeComponent implements OnInit {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string = "Something went wrong and we can't load this page right now. Please try again later.";
    parameterString: string;
    yourHomeContent: YourHomeContent;
    measures: MeasureContent[];

    sectionsByParameterString = {
        'heating-and-hot-water': {
            tag: 'tag_heating&hot-water',
            title: 'Heating & Hotwater',
        },
        'windows-and-doors': {
            tag: 'tag_windows&doors',
            title: 'Windows & Doors',
        },
        'floors-walls-and-roofs': {
            tag: 'tag_floors-walls&roofs',
            title: 'Floors, Walls & Roofs',
        },
        'solar-energy': {
            tag: 'tag_solar-energy',
            title: 'Solar Energy',
        }
    };

    constructor(private route: ActivatedRoute,
                private router: Router,
                private measureService: EnergySavingMeasureContentService) {
        this.isLoading = true;
        this.isError = false;
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.parameterString = params.get('tag');
            this.yourHomeContent = this.sectionsByParameterString[this.parameterString];
            if (!this.yourHomeContent) {
                // TODO:BEISDEAS-201 display a user-visible error here
                this.displayErrorAndLogMessage('Cannot find page content');
                this.router.navigate(['/']);
                return;
            }
            this.measureService.fetchMeasureDetails().subscribe(
                measures => {
                    this.measures = this.filterMeasures(measures);
                    this.isLoading = false;
                },
                () => this.displayErrorAndLogMessage('No measures found for ${this.yourHomeContent.title}')
            );
        });
    }

    getMeasureIcon(measure: MeasureContent) {
        return EnergySavingMeasureContentService.measureIcons[measure.acf.measure_code];
    }

    private filterMeasures(measures: MeasureContent[]) {
        return measures.filter(measure =>
            measure.acf.tags && measure.acf.tags.some((tag) => tag === this.yourHomeContent.tag));
    }

    private displayErrorAndLogMessage(err: any) {
        log.error(err);
        log.warn(err);
        this.isLoading = false;
        this.isError = true;
    }
}

interface YourHomeContent {
    parameterString: string;
    tag: string;
    title: string;
}
