import {Component} from '@angular/core';
import {DisplayableResponseData, ResponseData} from "../response-data/response-data";

@Component({
    selector: 'app-response-summary',
    templateUrl: './response-summary.component.html'
})
export class ResponseSummaryComponent {
    displayableResponseData: DisplayableResponseData;

    constructor(responseData: ResponseData) {
        this.displayableResponseData = DisplayableResponseData.fromResponseData(responseData);
    }
}
