import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ResponseData} from "../../shared/response-data/response-data";
import {Epc} from "../../shared/postcode-epc-service/model/epc";
import {EpcParserService} from "../../shared/postcode-epc-service/epc-api-service/epc-parser.service";
import {Observable} from "rxjs/Observable";
import {PostcodeApiService} from "../../shared/postcode-epc-service/postcode-api-service/postcode-api.service";
import {PostcodeErrorResponse} from "../../shared/postcode-epc-service/model/response/postcode-error-response";
import {PostcodeEpcService} from "../postcode-epc-service/postcode-epc.service";
import {PostcodeDetails} from "../postcode-epc-service/model/postcode-details";
import {PostcodeBasicDetailsResponse} from "../postcode-epc-service/model/response/postcode-basic-details-response";

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
    scottishPostcode: boolean = false;

    @Output() addressSelected: EventEmitter<string> = new EventEmitter<string>();

    constructor(private responseData: ResponseData,
                private postcodeApiService: PostcodeApiService,
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
            this.scottishPostcode = false;
            this.resetSearchState();
            this.fetchPostcodeDetails(this.postcodeInput.replace(/\s/g, ''))
                .subscribe(
                    postcodeDetails => {
                        if (!this.isScottishPostcode(postcodeDetails)) {
                            this.scottishPostcode = false;
                            this.postcodeEpcService.fetchPostcodeDetails(this.postcodeInput.replace(/\s/g, ''))
                                .subscribe(
                                    postcodeDetails => this.handlePostcodeDetails(postcodeDetails),
                                    error => this.handlePostcodeSearchError(error)
                                );
                        } else {
                            this.scottishPostcode = true;
                        }
                    },
                    error => this.handlePostcodeSearchError(error)
                );
        }
    }

    onAddressSelected() {
        if (this.selectedEpc !== undefined) {
            this.epc = this.selectedEpc;
            this.addressSelected.emit(this.epc.lmkKey);
        } else {
            this.addressSelected.emit();
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

    private fetchPostcodeDetails(postcode: string): Observable<PostcodeBasicDetailsResponse> {
        return this.postcodeApiService.fetchBasicPostcodeDetails(postcode)
            .catch((postcodeApiError) =>
                PostcodeLookupComponent.handlePostcodeApiError(postcodeApiError, postcode));
    }
    private isScottishPostcode(postcodeDetails: PostcodeBasicDetailsResponse): boolean{
        if (postcodeDetails.result.country === "Scotland"){
            return true;
        } else {
            return false;
        }
    }

    private static handlePostcodeApiError(err: PostcodeErrorResponse, postcode: string): Observable<PostcodeBasicDetailsResponse> {
        const isPostcodeNotFoundResponse: boolean = err.status === PostcodeApiService.postcodeNotFoundStatus;
        if (isPostcodeNotFoundResponse) {
            return Observable.throw(PostcodeEpcService.POSTCODE_NOT_FOUND);
        }
        return Observable.throw(`Error when fetching details for postcode "${ postcode }"`);
    }
}
