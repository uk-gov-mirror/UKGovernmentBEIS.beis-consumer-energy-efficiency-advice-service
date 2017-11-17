import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {EpcApiService} from "../../shared/epc-api-service/epc-api.service";
import {Epc} from "../../shared/epc-api-service/model/epc";
import {EpcParserService} from "../../shared/epc-api-service/epc-parser.service";
import {ResponseData} from "../../shared/response-data/response-data";

@Component({
    selector: 'app-boiler-postcode-lookup',
    templateUrl: './boiler-postcode-lookup.component.html',
    styleUrls: ['./boiler-postcode-lookup.component.scss']
})
export class BoilerPostcodeLookupComponent {

    postcodeInput: string;
    loadingEpcs: boolean = false;
    epcs: Epc[];
    selectedEpc: Epc;

    constructor(private epcApiService: EpcApiService,
                private responseData: ResponseData,
                private router: Router) {
    }

    lookupAllEpcsForPostcode(postcode: string): void {
        this.loadingEpcs = true;
        this.epcApiService.getEpcsForPostcode(postcode.replace(/\s/g, ''))
            .subscribe(
                epcs => this.epcSearchCompleted(epcs),
                err => this.epcSearchCompleted([])
            );
    }

    private epcSearchCompleted(epcs: Epc[]) {
        this.loadingEpcs = false;
        this.epcs = epcs.sort(EpcParserService.sortEpcsByHouseNumberOrAlphabetically);
    }

    onAddressSelected() {
        if (this.selectedEpc !== undefined) {
            this.responseData.postcode = this.postcodeInput.replace(/\s/g, '');
            this.responseData.epc = this.selectedEpc;
        }
        this.router.navigate(['/js/boiler/epc-replace', this.selectedEpc.lmkKey]);
    }
}
