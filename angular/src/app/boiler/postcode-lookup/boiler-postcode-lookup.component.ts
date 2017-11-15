import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {EpcApiService} from "../../shared/epc-api-service/epc-api.service";
import {Epc} from "../../shared/epc-api-service/model/epc";
import {EpcParserService} from "../../shared/epc-api-service/epc-parser.service";

@Component({
    selector: 'app-boiler-postcode-lookup',
    templateUrl: './boiler-postcode-lookup.component.html',
    styleUrls: ['./boiler-postcode-lookup.component.scss']
})
export class BoilerPostcodeLookupComponent {

    postcodeInput: string;
    loadingEpcs: boolean = false;
    addresses: {address: string, lmkKey: string}[];
    selectedLmkKey: string;

    constructor(private epcApiService: EpcApiService,
                private router: Router) {
    }

    lookupAllEpcsForPostcode(): void {
        this.loadingEpcs = true;
        this.epcApiService.getEpcsForPostcode(this.postcodeInput.replace(/\s/g, ''))
            .subscribe(
                epcs => this.epcSearchCompleted(epcs),
                err => this.epcSearchCompleted([])
            );
    }

    private epcSearchCompleted(epcs: Epc[]) {
        this.loadingEpcs = false;
        this.addresses = epcs
            .sort(EpcParserService.sortEpcsByHouseNumberOrAlphabetically)
            .map(epc => ({address: epc.address, lmkKey: epc.lmkKey}));
    }

    onAddressSelected() {
        this.router.navigate([`/js/boiler/epc-replace/${this.selectedLmkKey}`]);
    }
}
