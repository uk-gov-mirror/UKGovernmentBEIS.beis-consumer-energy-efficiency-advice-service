import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResponseData} from '../response-data/response-data';
import {Observable} from 'rxjs/Observable';
import {PostcodeApiService} from '../postcode-epc-service/postcode-api-service/postcode-api.service';
import {PostcodeEpcService} from '../postcode-epc-service/postcode-epc.service';
import {PostcodeBasicDetailsResponse} from '../postcode-epc-service/model/response/postcode-basic-details-response';
import {PostcodeDetails} from "../postcode-epc-service/model/postcode-details";
import {Country, parseCountry} from "../../questionnaire/questions/postcode-epc-question/country";

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
    country: Country;

    /**
     * When the postcode has been entered by the user and validated this event will be fired.
     *
     * In the case of an error or an invalid postcode, `PostcodeDetails.postcode`
     * will be set to null. (This is distinct to `undefined`, which
     * means that the user hasn't answered that question yet)
     */
    @Output() postcodeSelected: EventEmitter<PostcodeDetails> = new EventEmitter<PostcodeDetails>();

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
        this.error = false;
        this.fetchPostcodeDetails(this.postcodeInput.replace(/\s/g, ''))
            .subscribe(
                postcodeDetails => {
                    this.country = parseCountry(postcodeDetails.result.country);

                    if (this.isNorthernIrishPostcode() || this.isScottishPostcode()) {
                        this.handleSearchError(null);
                        return;
                    }

                    const postcode = postcodeDetails.result.postcode.replace(/\s/g, '');
                    const localAuthorityCode = postcodeDetails.result.codes.admin_district;
                    const postcodeData = new PostcodeDetails(postcode, null, localAuthorityCode, this.country);
                    this.postcodeSelected.emit(postcodeData);
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

    private isNorthernIrishPostcode(): boolean {
        return this.country === Country.NorthernIreland;
    }

    private isScottishPostcode(): boolean {
        return this.country === Country.Scotland;
    }

    private handleSearchError(error: any): void {
        this.error = true;
        if (error === PostcodeEpcService.POSTCODE_NOT_FOUND) {
            this.errorMessage = "Please enter a valid UK postcode.";
        } else if (this.isNorthernIrishPostcode()) {
            this.errorMessage = "We do not think this service is suitable/accurate for " +
                "you (as your home is in Northern Ireland)";
        } else if (this.isScottishPostcode()) {
            this.errorMessage = "";
        } else {
            this.errorMessage = "Oh no! The postcode lookup has failed. You can proceed without postcode information, though it " +
                "may lead to less applicable suggestions. Alternatively, click '>' to try again";
        }

        let postcode: string;
        if (this.isNorthernIrishPostcode() || this.isScottishPostcode()) {
            // Prevent user from continuing
            postcode = undefined;
        } else {
            // Allow user to continue
            postcode = null;
        }
        this.loading = false;
        this.postcodeSelected.emit(new PostcodeDetails(postcode, null, null, this.country));
    }
}
