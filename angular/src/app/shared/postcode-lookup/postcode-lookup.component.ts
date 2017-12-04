import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ResponseData} from "../../shared/response-data/response-data";
import {Epc} from "../../shared/postcode-epc-service/model/epc";
import {EpcParserService} from "../../shared/postcode-epc-service/epc-api-service/epc-parser.service";
import {PostcodeEpcService} from "../postcode-epc-service/postcode-epc.service";
import {PostcodeDetails} from "../postcode-epc-service/model/postcode-details";

@Component({
    selector: 'app-postcode-lookup',
    templateUrl: './postcode-lookup.component.html',
    styleUrls: ['./postcode-lookup.component.scss']
})
export class PostcodeLookupComponent {

    postcodeInput: string;
    loadingEpcs: boolean = false;
    epcs: Epc[];
    selectedEpc: Epc;
    validationError: boolean = false;

    @Output() addressSelected: EventEmitter<string> = new EventEmitter<string>();

    constructor(private responseData: ResponseData,
                private postcodeEpcService: PostcodeEpcService) {
    }

    get postcode(): string {
        return this.responseData.postcode;
    }

    set postcode(val: string) {
        this.responseData.postcode = val;
    }

    get epc(): Epc {
        return this.responseData.epc;
    }

    set epc(val: Epc) {
        this.responseData.epc = val;
    }

    get localAuthorityCode(): string {
        return this.responseData.localAuthorityCode;
    }

    set localAuthorityCode(val: string) {
        this.responseData.localAuthorityCode = val;
    }

    onPostcodeSubmit() {
        if (this.postcodeInput) {
            this.loadingEpcs = true;
            this.resetSearchState();
            this.postcodeEpcService.fetchPostcodeDetails(this.postcodeInput.replace(/\s/g, ''))
                .subscribe(
                    postcodeDetails => this.handlePostcodeDetails(postcodeDetails),
                    error => this.handlePostcodeSearchError(error)
                );
        }
    }

    private handlePostcodeDetails(postcodeDetails: PostcodeDetails): void {
        this.localAuthorityCode = postcodeDetails.localAuthorityCode;
        this.postcode = postcodeDetails.postcode;
        this.epcs = postcodeDetails.allEpcsForPostcode
            .sort(EpcParserService.sortEpcsByHouseNumberOrAlphabetically);
        this.loadingEpcs = false;
    }

    private handlePostcodeSearchError(error: any): void {
        if (error === PostcodeEpcService.POSTCODE_NOT_FOUND) {
            return this.displayPostcodeValidationError();
        }
        this.postcode = this.postcodeInput.replace(/\s/g, '');
        this.localAuthorityCode = null;
    }

    private displayPostcodeValidationError(): void {
        this.resetSearchState();
        this.validationError = true;
    }

    private resetSearchState(): void {
        this.epcs = undefined;
        this.validationError = false;
    }

    onAddressSelected() {
        if (this.selectedEpc !== undefined) {
            this.epc = this.selectedEpc;
            this.addressSelected.emit(this.epc.lmkKey);
        } else {
            this.addressSelected.emit();
        }
    }
}
