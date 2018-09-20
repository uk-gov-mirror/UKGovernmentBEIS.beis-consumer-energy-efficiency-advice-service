import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResponseData} from '../response-data/response-data';
import {Observable} from 'rxjs/Observable';
import {PostcodeApiService} from '../postcode-epc-service/postcode-api-service/postcode-api.service';
import {PostcodeEpcService} from '../postcode-epc-service/postcode-epc.service';
import {PostcodeBasicDetailsResponse} from '../postcode-epc-service/model/response/postcode-basic-details-response';

@Component({
    selector: 'app-postcode-lookup',
    templateUrl: './postcode-lookup.component.html',
    styleUrls: ['./postcode-lookup.component.scss']
})
export class PostcodeLookupComponent implements OnInit {

    postcodeInput: string;
    loading: boolean = false;
    error: boolean = false;
    errorMessage: string;
    northernIrelandPostcode: boolean = false;
    scottishPostcode: boolean = false;

    /**
     * When the postcode has been entered by the user and validated as non-Scottish,
     * this event will be fired.
     * Collaborators who want to see the postcode should then consult `responseData.postcode`
     *
     * In the case of an error or an invalid postcode, `responseData.postcode`
     * will be set to null. (This is distinct to `undefined`, which
     * means that the user hasn't answered that question yet)
     */
    @Output() postcodeSelected: EventEmitter<void> = new EventEmitter<void>();

    constructor(private responseData: ResponseData,
                private postcodeApiService: PostcodeApiService) {
    }

    ngOnInit(): void {
        this.postcodeInput = this.responseData.postcode;
    }

    onPostcodeSubmit() {
        if (!this.postcodeInput) {
            return;
        }

        this.loading = true;
        this.northernIrelandPostcode = false;
        this.scottishPostcode = false;
        this.error = false;
        this.fetchPostcodeDetails(this.postcodeInput.replace(/\s/g, ''))
            .subscribe(
                postcodeDetails => {
                    this.northernIrelandPostcode = postcodeDetails.result.country === 'Northern Ireland';
                    this.scottishPostcode = postcodeDetails.result.country === 'Scotland';

                    if (this.northernIrelandPostcode || this.scottishPostcode) {
                        this.handleSearchError(null);
                        return;
                    }

                    this.responseData.postcode = postcodeDetails.result.postcode.replace(/\s/g, '');
                    this.responseData.localAuthorityCode = postcodeDetails.result.codes.admin_district;
                    this.postcodeSelected.emit();
                    this.loading = false;
                },
                error => this.handleSearchError(error)
            );
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

    private handleSearchError(error: any): void {
        this.error = true;
        if (error === PostcodeEpcService.POSTCODE_NOT_FOUND) {
            this.errorMessage = "Please enter a valid UK postcode";
        } else if (this.northernIrelandPostcode) {
            this.errorMessage = "We do not think this service is suitable/accurate for " +
                "you (as your home is in Northern Ireland)";
        } else if (this.scottishPostcode) {
            this.errorMessage = "";
        } else {
            this.errorMessage = "Oh no! The postcode lookup has failed. You can proceed without postcode information, though it " +
                "may lead to less applicable suggestions. Alternatively, click '>' to try again";
        }
        this.responseData.postcode = null;
        this.responseData.localAuthorityCode = null;

        this.loading = false;
        this.postcodeSelected.emit();
    }
}
