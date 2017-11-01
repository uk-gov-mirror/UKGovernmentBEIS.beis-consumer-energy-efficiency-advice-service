import {Component} from "@angular/core";
import {DisplayableResponseData, ResponseData} from "../shared/response-data/response-data";
import {RdSapInput} from "../shared/energy-calculation-api-service/request/rdsap-input";

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
