import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, Renderer2, OnInit, ChangeDetectorRef} from '@angular/core';
import {resetResponseDataForNewEpc, ResponseData} from '../response-data/response-data';
import {Epc} from '../postcode-epc-service/model/epc';
import {EpcParserService} from '../postcode-epc-service/epc-api-service/epc-parser.service';
import {PostcodeEpcService} from '../postcode-epc-service/postcode-epc.service';
import {PostcodeDetails} from '../postcode-epc-service/model/postcode-details';
import {Country} from "../../questionnaire/questions/postcode-epc-question/country";

@Component({
    selector: 'app-epc-lookup',
    templateUrl: './epc-lookup.component.html',
    styleUrls: ['./epc-lookup.component.scss']
})
export class EpcLookupComponent implements OnChanges, OnInit {

    public static readonly ENTER_KEY_CODE: number = 13;

    loading: boolean = false;
    epcs: Epc[] | null | undefined;
    selectedEpc: Epc;
    error: boolean = false;
    keyboardUser: boolean;

    @Input() postcode: string;

    @Output() epcSelected: EventEmitter<string> = new EventEmitter<string>();

    private postcodeDetails: PostcodeDetails;

    constructor(private responseData: ResponseData,
                private postcodeEpcService: PostcodeEpcService,
                private renderer: Renderer2,
                private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.renderer.listen('window', 'keydown', event => {
            if (event.keyCode === EpcLookupComponent.ENTER_KEY_CODE && document.activeElement.classList.contains('postcode-input-text')) {
                this.keyboardUser = true;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.handleSubmit();
    }

    handleSubmit() {
        // A null postcode means that we have been unable to get postcode information from the users input
        // They have either entered an invalid postcode, or the lookup has failed. The postcode-lookup
        // component handles the error messages for this.
        // Allow users to continue in this case
        if (this.postcode === null) {
            this.epcs = [];
            return;
        }

        // An undefined postcode means that the user is yet to enter a postcode
        // or the postcode is for Scotland / Northern Ireland.
        // Don't show any EPC info in this case
        if (!this.postcode) {
            this.epcs = undefined;
            return;
        }

        this.postcodeEpcService.fetchPostcodeDetails(this.postcode)
            .subscribe(
                postcodeDetails => {
                    this.handlePostcodeDetails(postcodeDetails);
                    this.ref.detectChanges();
                    if (this.keyboardUser && postcodeDetails.allEpcsForPostcode && postcodeDetails.allEpcsForPostcode.length > 0) {
                        (<HTMLElement>document.querySelector('.address-dropdown')).focus();
                        this.keyboardUser = false;
                    }
                },
                error => this.handlePostcodeSearchError(error)
            );
    }

    onAddressSelected() {
        if (this.selectedEpc) {
            this.setResponseData(this.selectedEpc);
        }
    }

    onAddressNotListed() {
        this.setResponseDataPostcodeOnly(this.postcode);
    }

    private setResponseData(selectedEpc: Epc) {
        resetResponseDataForNewEpc(this.responseData);

        this.responseData.postcode = this.postcodeDetails.postcode;
        this.responseData.country = this.postcodeDetails.country;
        this.responseData.englishProperty = this.postcodeDetails.country === Country.England;
        this.responseData.localAuthorityCode = this.postcodeDetails.localAuthorityCode;
        this.responseData.epc = selectedEpc;

        this.epcSelected.emit(selectedEpc && selectedEpc.lmkKey);
    }

    private setResponseDataPostcodeOnly(selectedPostcode: string) {
        if (this.responseData.epc || selectedPostcode !== this.responseData.postcode) {
            // The postcode has changed so we should clear the existing responses
            resetResponseDataForNewEpc(this.responseData);

            if (!this.postcodeDetails) {
                // In the event postcode lookup failed, this.postcodeDetails won't be set - continue anyway
                this.responseData.postcode = selectedPostcode;
            } else {
                this.responseData.postcode = this.postcodeDetails.postcode;
                this.responseData.country = this.postcodeDetails.country;
                this.responseData.englishProperty = this.postcodeDetails.country === Country.England;
                this.responseData.localAuthorityCode = this.postcodeDetails.localAuthorityCode;
            }
        }

        this.epcSelected.emit();
    }

    private handlePostcodeDetails(postcodeDetails: PostcodeDetails): void {
        this.postcodeDetails = postcodeDetails;
        this.epcs = postcodeDetails.allEpcsForPostcode
            ? postcodeDetails.allEpcsForPostcode.sort(EpcParserService.sortEpcsByHouseNumberOrAlphabetically)
            : null;
        this.loading = false;
    }

    private handlePostcodeSearchError(error: any): void {
        if (error === PostcodeEpcService.POSTCODE_NOT_FOUND) {
            this.displayPostcodeLookupError();
        } else if (error === PostcodeEpcService.POSTCODE_INVALID) {
            this.displayPostcodeValidationError();
        }
    }

    private displayPostcodeValidationError(): void {
        this.resetSearchState();
        this.error = true;
    }

    private displayPostcodeLookupError(): void {
        this.resetSearchState();
        this.epcs = null;
    }

    private resetSearchState(): void {
        this.epcs = undefined;
        this.error = false;
    }
}
