import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {WordpressMeasure} from '../shared/wordpress-measures-service/wordpress-measure';
import {WordpressMeasuresService} from '../shared/wordpress-measures-service/wordpress-measures.service';
import padStart from 'lodash-es/padStart';
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {PageTitleService} from "../shared/page-title-service/page-title.service";

@Component({
  selector: 'app-measure-page',
  templateUrl: './measure-page.component.html',
  styleUrls: ['./measure-page.component.scss']
})
export class MeasurePageComponent implements OnInit {

    measureData: WordpressMeasure;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string = "Something went wrong and we can't load this page right now. Please try again later.";

    constructor(private router: Router,
                private route: ActivatedRoute,
                private measureService: WordpressMeasuresService,
                private pageTitle: PageTitleService) {
    }

    ngOnInit() {
        this.route.paramMap
            .switchMap(params => {
                this.isLoading = true;
                return this.measureService.getMeasure(params.get('slug'));
            })
            .subscribe(
                (measureData) => this.displayMeasure(measureData),
                (err) => this.displayErrorAndLogMessage(err)
            );
    }

    scrollToStep(index: number): void {
        const element = document.querySelector('#step-' + index);
        if (element) {
            element.scrollIntoView();
        }
    }

    displayMeasure(measureData: WordpressMeasure): void {
        this.measureData = measureData;
        if (measureData) {
            this.pageTitle.set(measureData.title);
        } else {
            this.isError = true;
            this.router.navigate(['/404'], {skipLocationChange: true});
        }
        this.isLoading = false;
    }

    getHeadings(): string[] {
        return this.measureData.steps.map(step => step.headline);
    }

    displayErrorAndLogMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }
}
