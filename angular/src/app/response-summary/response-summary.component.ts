import {Component} from '@angular/core';
import {DisplayableResponseData, ResponseData} from "../common/response-data/response-data";
import {RdSAP} from '../common/bre-api-service/model/rdsap/rdsap';

@Component({
    selector: 'app-response-summary',
    templateUrl: './response-summary.component.html'
})
export class ResponseSummaryComponent {
    displayableResponseData: DisplayableResponseData;
    rdSAP: RdSAP;

    constructor(responseData: ResponseData) {
        this.displayableResponseData = DisplayableResponseData.fromResponseData(responseData);
        this.rdSAP = new RdSAP(responseData);
    }
}
