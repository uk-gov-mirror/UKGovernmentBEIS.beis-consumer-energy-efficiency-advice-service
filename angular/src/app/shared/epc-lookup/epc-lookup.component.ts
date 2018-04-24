import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {deleteOldResponseData, ResponseData} from '../response-data/response-data';
import {Epc} from '../postcode-epc-service/model/epc';
import {EpcParserService} from '../postcode-epc-service/epc-api-service/epc-parser.service';
import {Observable} from 'rxjs/Observable';
import {PostcodeApiService} from '../postcode-epc-service/postcode-api-service/postcode-api.service';
import {PostcodeEpcService} from '../postcode-epc-service/postcode-epc.service';
import {PostcodeDetails} from '../postcode-epc-service/model/postcode-details';
import {PostcodeBasicDetailsResponse} from '../postcode-epc-service/model/response/postcode-basic-details-response';

@Component({
    selector: 'app-epc-lookup',
    templateUrl: './epc-lookup.component.html',
    styleUrls: ['./epc-lookup.component.scss']
})
export class EpcLookupComponent implements OnChanges {

    loading: boolean = false;
    epcs: Epc[];
    selectedEpc: Epc;
    error: boolean = false;

    @Input() postcode: string;

    @Output() epcSelected: EventEmitter<string> = new EventEmitter<string>();

    private postcodeDetails: PostcodeDetails;

    constructor(private responseData: ResponseData,
                private postcodeEpcService: PostcodeEpcService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.postcode) {
            this.epcs = undefined;
            return;
        }

        this.postcodeEpcService.fetchPostcodeDetails(this.postcode)
            .subscribe(
                postcodeDetails => this.handlePostcodeDetails(postcodeDetails),
                error => this.handlePostcodeSearchError(error)
            );
    }

    onAddressSelected() {
        this.setResponseData(this.selectedEpc);
    }

    onAddressNotListed() {
        this.setResponseData();
    }

    private setResponseData(selectedEpc?: Epc) {
        if (JSON.stringify(selectedEpc) !== JSON.stringify(this.responseData.epc)) {
            // The EPC has changed so we should clear the existing responses
            deleteOldResponseData(this.responseData);

            this.responseData.postcode = this.postcodeDetails.postcode;
            this.responseData.localAuthorityCode = this.postcodeDetails.localAuthorityCode;
            this.responseData.epc = selectedEpc;
        }

        this.epcSelected.emit(selectedEpc && selectedEpc.lmkKey);
    }

    private handlePostcodeDetails(postcodeDetails: PostcodeDetails): void {
        this.postcodeDetails = postcodeDetails;
        this.epcs = postcodeDetails.allEpcsForPostcode
            .sort(EpcParserService.sortEpcsByHouseNumberOrAlphabetically);
        this.loading = false;
    }

    private handlePostcodeSearchError(error: any): void {
        if (error === PostcodeEpcService.POSTCODE_NOT_FOUND) {
            this.displayPostcodeValidationError();
        }
    }

    private displayPostcodeValidationError(): void {
        this.resetSearchState();
        this.error = true;
    }

    private resetSearchState(): void {
        this.epcs = undefined;
        this.error = false;
    }
}
