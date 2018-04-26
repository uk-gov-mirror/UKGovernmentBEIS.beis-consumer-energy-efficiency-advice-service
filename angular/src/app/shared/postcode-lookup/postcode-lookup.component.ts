import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {deleteOldResponseData, ResponseData} from '../response-data/response-data';
import {Epc} from '../postcode-epc-service/model/epc';
import {EpcParserService} from '../postcode-epc-service/epc-api-service/epc-parser.service';
import {Observable} from 'rxjs/Observable';
import {PostcodeApiService} from '../postcode-epc-service/postcode-api-service/postcode-api.service';
import {PostcodeEpcService} from '../postcode-epc-service/postcode-epc.service';
import {PostcodeDetails} from '../postcode-epc-service/model/postcode-details';
import {PostcodeBasicDetailsResponse} from '../postcode-epc-service/model/response/postcode-basic-details-response';

@Component({
    selector: 'app-postcode-lookup',
    templateUrl: './postcode-lookup.component.html',
    styleUrls: ['./postcode-lookup.component.scss']
})
export class PostcodeLookupComponent implements OnInit {

    postcodeInput: string;
    loadingEpcs: boolean = false;
    epcs: Epc[];
    selectedLocalAuthorityCode: string;
    selectedPostcode: string;
    selectedEpc: Epc;
    validationError: boolean = false;
    scottishPostcode: boolean = false;
    errorMessage: string = "Please enter a valid UK postcode";

    @Output() addressSelected: EventEmitter<string> = new EventEmitter<string>();

    constructor(private responseData: ResponseData,
                private postcodeApiService: PostcodeApiService,
                private postcodeEpcService: PostcodeEpcService) {
    }

    ngOnInit(): void {
        this.postcodeInput = this.responseData.postcode;
    }

    onPostcodeSubmit() {
        if (this.postcodeInput) {
            this.loadingEpcs = true;
            this.scottishPostcode = false;
            this.resetSearchState();
            this.fetchPostcodeDetails(this.postcodeInput.replace(/\s/g, ''))
                .subscribe(
                    basicPostcodeDetails => {
                        if (!this.isScottishPostcode(basicPostcodeDetails)) {
                            this.scottishPostcode = false;
                            this.postcodeEpcService.fetchPostcodeDetails(this.postcodeInput.replace(/\s/g, ''))
                                .subscribe(
                                    postcodeDetails => this.handlePostcodeDetails(postcodeDetails),
                                    error => this.handlePostcodeSearchError(error)
                                );
                        } else {
                            this.loadingEpcs = false;
                            this.scottishPostcode = true;
                        }
                    },
                    error => this.handlePostcodeSearchError(error)
                );
        }
    }

    onAddressSelected() {
        this.setResponseData(this.selectedEpc);
    }

    onAddressNotListed() {
        this.setResponseData();
    }

    private setResponseData(selectedEpc?: Epc) {
        if (this.selectedPostcode !== this.responseData.postcode
            || this.selectedLocalAuthorityCode !== this.responseData.localAuthorityCode
            || JSON.stringify(selectedEpc) !== JSON.stringify(this.responseData.epc)) {
            // The address has changed so we should clear the existing responses
            deleteOldResponseData(this.responseData);

            this.responseData.postcode = this.selectedPostcode;
            this.responseData.localAuthorityCode = this.selectedLocalAuthorityCode;
            this.responseData.epc = selectedEpc;
        }

        this.addressSelected.emit(selectedEpc && selectedEpc.lmkKey);
    }

    private handlePostcodeDetails(postcodeDetails: PostcodeDetails): void {
        this.selectedPostcode = postcodeDetails.postcode;
        this.selectedLocalAuthorityCode = postcodeDetails.localAuthorityCode;
        this.epcs = postcodeDetails.allEpcsForPostcode
            .sort(EpcParserService.sortEpcsByHouseNumberOrAlphabetically);
        this.loadingEpcs = false;
    }

    private handlePostcodeSearchError(error: any): void {
        if (error === PostcodeEpcService.POSTCODE_NOT_FOUND) {
            return this.displayPostcodeValidationError();
        }
        this.selectedPostcode = this.postcodeInput.replace(/\s/g, '');
        this.selectedLocalAuthorityCode = null;
    }

    private displayPostcodeValidationError(): void {
        this.resetSearchState();
        this.validationError = true;
        this.loadingEpcs = false;
    }

    private resetSearchState(): void {
        this.epcs = undefined;
        this.validationError = false;
    }

    private fetchPostcodeDetails(postcode: string): Observable<PostcodeBasicDetailsResponse> {
        return this.postcodeApiService.fetchBasicPostcodeDetails(postcode)
            .catch(() => {
                if (!PostcodeEpcService.isValidPostcode(postcode)) {
                    return Observable.throw(PostcodeEpcService.POSTCODE_NOT_FOUND);
                }
                return Observable.throw(`Error when fetching details for postcode "${ postcode }"`);
            });
    }

    private isScottishPostcode(postcodeDetails: PostcodeBasicDetailsResponse): boolean {
        if (postcodeDetails.result.country === "Scotland") {
            return true;
        } else {
            return false;
        }
    }
}
