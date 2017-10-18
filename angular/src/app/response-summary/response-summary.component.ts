import {Component} from '@angular/core';
import {ResponseData} from "../questionnaire/questions/response-data";

@Component({
    selector: 'app-response-summary',
    templateUrl: './response-summary.component.html'
})
export class ResponseSummaryComponent {

    constructor(public responseData: ResponseData) {
    }
}
