import {Component} from "@angular/core";
import {EpcApiService} from "../../shared/epc-api-service/epc-api.service";
import {Epc} from "../../shared/epc-api-service/model/epc";
import {EpcParserService} from "../../shared/epc-api-service/epc-parser.service";

@Component({
    selector: 'app-boiler-landing-page',
    templateUrl: './boiler-landing-page.component.html',
    styleUrls: ['./boiler-landing-page.component.scss']
})
export class BoilerLandingPageComponent {

    postcodeInput: string;
    loadingEpcs: boolean = false;
    epcs: Epc[];
    selectedEpc: Epc;

    constructor(private epcApiService: EpcApiService) {
    }

    lookupAllEpcsForPostcode(): void {
        this.loadingEpcs = true;
        this.epcApiService.getEpcData(this.postcodeInput.replace(/\s/g, ''))
            .subscribe(
                epcs => this.epcSearchCompleted(epcs),
                err => this.epcSearchCompleted([])
            );
    }

    private epcSearchCompleted(epcs: Epc[]) {
        this.loadingEpcs = false;
        this.epcs = epcs.sort(EpcParserService.sortEpcsByHouseNumberOrAlphabetically);
    }

    onEpcSelected() {
        console.log(this.selectedEpc);
    }
}
