import {Component} from '@angular/core';
import {DisplayableResponseData, ResponseData} from "../common/response-data/response-data";
import {RdSapInput} from '../common/bre-api-service/model/rdsap-input/rdsap-input';

@Component({
    selector: 'app-response-summary',
    templateUrl: './response-summary.component.html'
})
export class ResponseSummaryComponent {
    displayableResponseData: DisplayableResponseData;
    rdSAP: RdSapInput;

    constructor(responseData: ResponseData) {
        this.displayableResponseData = DisplayableResponseData.fromResponseData(responseData);
        this.rdSAP = new RdSapInput(responseData);
    }
}
