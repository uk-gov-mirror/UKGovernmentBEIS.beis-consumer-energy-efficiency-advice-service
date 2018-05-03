import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {WordpressMeasure} from '../shared/wordpress-measures-service/wordpress-measure';
import {WordpressMeasuresService} from '../shared/wordpress-measures-service/wordpress-measures.service';
import padStart from 'lodash-es/padStart';

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
                private measureService: WordpressMeasuresService) {
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
        if (!measureData) {
            this.isError = true;
            this.router.navigate(['/404'], {skipLocationChange: true});
        }
        this.measureData = measureData;
        this.isLoading = false;
    }

    displayErrorAndLogMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    getFormattedNumberFromIndex(index: number): string {
        const stepNumber = index + 1;
        return padStart(stepNumber.toString(), 2, '0');
    }
}
