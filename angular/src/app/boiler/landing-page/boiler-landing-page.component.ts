import {Component} from "@angular/core";
import {EpcApiService} from "../../shared/postcode-epc-service/epc-api-service/epc-api.service";
import {Epc} from "../../shared/postcode-epc-service/model/epc";
import {EpcParserService} from "../../shared/postcode-epc-service/epc-api-service/epc-parser.service";
import {PostcodeEpcService} from "../../shared/postcode-epc-service/postcode-epc.service";
import {PostcodeDetails} from "../../shared/postcode-epc-service/model/postcode-details";

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

    constructor(private postcodeEpcService: PostcodeEpcService) {
    }

    lookupAllEpcsForPostcode(): void {
        this.loadingEpcs = true;
        this.postcodeEpcService.fetchPostcodeDetails(this.postcodeInput.replace(/\s/g, ''))
            .subscribe(
                postcodeDetails => this.epcSearchCompleted(postcodeDetails),
                err => this.epcSearchCompleted({
                    postcode: this.postcodeInput,
                    allEpcsForPostcode: [],
                    localAuthorityCode: null
                })
            );
    }

    private epcSearchCompleted(postcodeDetails: PostcodeDetails) {
        this.loadingEpcs = false;
        this.epcs = postcodeDetails.allEpcsForPostcode.sort(EpcParserService.sortEpcsByHouseNumberOrAlphabetically);
    }

    onEpcSelected() {
        console.log(this.selectedEpc);
    }
}
